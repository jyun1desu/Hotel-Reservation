<template>
  <div class="calender">
    <div class="head">
      <span
        @click="toPreviousMonth"
        :class="{
          unclickable:
            today.getFullYear() === currentDay.year &&
            today.getMonth() + 1 === currentDay.month,
        }"
        class="indicator indicator__previous"
      ></span>
      <span class="year_month"
        >{{ currentDay.year }}/{{ currentDay.month }}</span
      >
      <span
        @click="toNextMonth"
        :class="{
          unclickable:
            currentDay.year === availableMonth.year &&
            currentDay.month === availableMonth.month,
        }"
        class="indicator indicator__next"
      >
      </span>
    </div>
    <div class="week">
      <span
        class="weekdays"
        v-for="(day, index) in weekdays"
        :key="'week' + index"
        >{{ day }}</span
      >
    </div>
    <div class="dates">
      <eachDayButton
        @book-this-day="
          $emit(
            'book-this-day',
            `${currentDay.year}-${
              currentDay.month < 10
                ? `0${currentDay.month}`
                : `${currentDay.month}`
            }-${day < 10 ? `0${day}` : `${day}`}`
          )
        "
        :booking-info="bookingInfo"
        :picking-status="pickingStatus"
        :date="day"
        :today="today"
        :current-day="currentDay"
        v-for="(day, index) in daysOfthisMonth"
        :key="'day' + index"
      ></eachDayButton>
    </div>
  </div>
</template>

<script>
import eachDayButton from "./eachDayButton.vue";
export default {
  name: "calenderPicker",
  components: {
    eachDayButton,
  },
  props: ["booking-info", "picking-status"],
  created() {
    const today = new Date();
    this.today = today;
    this.currentDay = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      date: today.getDate(),
      day: today.getDay(),
    };
  },
  data() {
    return {
      today: "",
      currentDay: {
        year: null,
        month: null,
        date: null,
        day: null,
      },
      weekdays: ["日", "一", "二", "三", "四", "五", "六"],
    };
  },
  methods: {
    toPreviousMonth() {
      const previousMonth = this.currentDay.month - 1;
      const thisYear = this.today.getFullYear() === this.currentDay.year;
      const previousMonthes = previousMonth < this.today.getMonth() + 1;
      if (thisYear && previousMonthes) return;
      if (previousMonth === 0) {
        this.currentDay = {
          ...this.currentDay,
          year: this.currentDay.year - 1,
          month: 12,
        };
      } else {
        this.currentDay = {
          ...this.currentDay,
          month: previousMonth,
        };
      }
    },
    toNextMonth() {
      const nextMonth = this.currentDay.month + 1;
      const edgeYear = this.currentDay.year === this.availableMonth.year;
      const edgeMonth = this.currentDay.month === this.availableMonth.month;
      if (edgeYear && edgeMonth) return;
      if (nextMonth === 13) {
        this.currentDay = {
          ...this.currentDay,
          year: this.currentDay.year + 1,
          month: 1,
        };
      } else {
        this.currentDay = {
          ...this.currentDay,
          month: nextMonth,
        };
      }
    },
  },
  computed: {
    dayAmountOfMonth() {
      return new Date(this.currentDay.year, this.currentDay.month, 0).getDate();
    },
    firstDayOfThisMonth() {
      const firstDay = new Date(
        `${this.currentDay.year}/${this.currentDay.month}/1`
      ).getDay();
      return firstDay;
    },
    daysOfthisMonth() {
      const days = [];
      for (let i = 0; i < this.firstDayOfThisMonth; i++) {
        days.push("");
      }
      for (let i = 1; i <= this.dayAmountOfMonth; i++) {
        days.push(i);
      }
      return days;
    },
    availableMonth() {
      const theDayAfter90days = new Date();
      theDayAfter90days.setDate(theDayAfter90days.getDate() + 90);
      return {
        year: theDayAfter90days.getFullYear(),
        month: theDayAfter90days.getMonth() + 1,
      };
    },
    bookingList() {
      return this.$store.state.nowRoomBookingDays;
    },
  },
};
</script>

<style lang="scss" scoped>
$calender_color: #f7f7f7;
$day_font_color: #6d7278;
.calender {
  flex: 0 0 100%;
  padding: 5px;
  user-select: none;
  @include RWD($pad) {
    padding: 15px;
  }
  box-sizing: border-box;
  background-color: $calender_color;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
  margin-top: 20px;
  @include RWD($pad_horizontal) {
    margin-top: 20px;
  }
}

.head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  @include RWD($pad) {
    margin-bottom: 20px;
  }
  .year_month {
    flex: 1 1 5/7;
    font-size: 18px;
    letter-spacing: 2px;
    line-height: 40px;
  }
  .indicator {
    flex: 0 0 1/7 * 100%;
    text-align: center;
    line-height: 40px;

    &.unclickable {
      color: #c9ccd0;
    }

    &__previous {
      &::before {
        content: "<";
        display: block;
        font-size: 15px;
        font-family: "Noto Serif TC", serif;
        transform: scaleY(1.5);
      }
    }
    &__next {
      &::before {
        content: ">";
        display: block;
        font-size: 15px;
        font-family: "Noto Serif TC", serif;
        transform: scaleY(1.5);
      }
    }
  }
}

.week {
  display: flex;
  color: $day_font_color;
  font-size: 13px;
  @include RWD($pad) {
    font-size: 16px;
  }
  .weekdays {
    flex: 1 1 100%;
    text-align: center;
  }
}

.dates {
  display: flex;
  flex-wrap: wrap;
  color: $day_font_color;
  margin-top: 15px;
  font-size: 12px;
  @include RWD($pad) {
    font-size: 14px;
  }
}
</style>