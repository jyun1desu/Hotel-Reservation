<template>
  <span
    @click="handleClick"
    class="day"
    :class="{
      unclickable: beforeToday || moreThan90Days || beforeCheckinDay,
      unavailable: date && unavailableDays,
      ischeckin: bookingInfo && isCheckinDay,
    }"
  >
    {{ date }}
  </span>
</template>

<script>
export default {
  name: "eachDayButton",
  props: ["date", "current-day", "today", "booking-info", "picking-status"],
  methods: {
    handleClick() {
      if (this.pickingStatus) {
        const noVacancy =
          this.pickingStatus.isPickingCheckinDay && this.unavailableDays;
        if (noVacancy) return;
      } else {
        if (this.unavailableDays) return;
      }
      if (
        this.beforeToday ||
        this.moreThan90Days ||
        this.beforeCheckinDay ||
        this.isCheckinDay
      )
        return;
      this.$emit("book-this-day");
    },
  },
  computed: {
    beforeToday() {
      const sameMonth = this.today.getMonth() + 1 === this.currentDay.month;
      const beforeToday = this.date <= this.currentDay.date;
      return sameMonth && beforeToday;
    },
    moreThan90Days() {
      const day = new Date(
        this.currentDay.year,
        this.currentDay.month - 1,
        this.date
      );
      const theDayAfter90days = new Date();
      theDayAfter90days.setDate(theDayAfter90days.getDate() + 90);
      if (parseInt(theDayAfter90days - day) > 0) {
        return false;
      } else {
        return true;
      }
    },
    unavailableDays() {
      return !(this.beforeToday || this.moreThan90Days) && this.date%4 === 0;
    },
    beforeCheckinDay() {
      if (this.bookingInfo) {
        const year = Number(this.bookingInfo.checkinDay.split("-")[0]);
        const month = Number(this.bookingInfo.checkinDay.split("-")[1]);
        const day = Number(this.bookingInfo.checkinDay.split("-")[2]);
        const calendarYear = Number(this.currentDay.year);
        const calendarMonth = Number(this.currentDay.month);
        if (calendarYear < year) {
          return true;
        } else if (calendarYear <= year && calendarMonth < month) {
          return true;
        } else if (calendarYear === year && calendarMonth === month) {
          return this.date < day;
        } else{
          return false;
        }
      } else {
        return false;
      }
    },
    isCheckinDay() {
      if (this.bookingInfo) {
        const month = Number(this.bookingInfo.checkinDay.split("-")[1]);
        const sameMonth = this.currentDay.month === month;
        const day = Number(this.bookingInfo.checkinDay.split("-")[2]);
        const sameDay = day === this.date;
        return sameMonth && sameDay;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$day_font_color: #6d7278;
.day {
  padding: 12px 5px;
  box-sizing: border-box;
  flex: 0 0 1/7 * 100%;
  text-align: center;
  font-family: "roboto", serif;
  font-weight: 300;
  position: relative;
  @include RWD($pad) {
    padding: 15px 8px;
  }
  &.ischeckin {
    z-index: 2;
    color: #fff;
    &::before {
      content: "";
      z-index: -1;
      display: block;
      position: absolute;
      width: 30px;
      height: 30px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: $day_font_color;
      border-radius: 100%;
    }
  }
  &.unclickable {
    color: #c9ccd0;
  }
  &.unavailable {
    position: relative;
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-image: repeating-linear-gradient(
        45deg,
        #000 7px,
        #000 3px,
        rgba(255, 255, 255, 0) 8px,
        rgba(255, 255, 255, 0) 10px
      );
      width: 100%;
      height: 50%;
    }
  }
}
</style>