<template>
  <div class="calender">
    <div class="head">
      <span class="indicator indicator__previous"></span>
      <span class="year_month">2020/11</span>
      <span class="indicator indicator__next"></span>
    </div>
    <div class="week">
      <span
        class="weekdays"
        v-for="(day, index) in weekdays"
        :key="'week' + index"
        >{{ day }}</span
      >
    </div>
    <div class="dates"></div>
  </div>
</template>

<script>
export default {
  name: "calenderPicker",
  data() {
    return {
      weekdays: ["日", "一", "二", "三", "四", "五", "六"],
    };
  },
  computed: {
    month() {
      const currentDate = new Date();
      const month = currentDate.getMonth();
      return month + 1;
    },
    day() {
      const currentDate = new Date();
      const day = currentDate.getDay();
      return "日一二三四五六".charAt(day);
    },
    date() {
      const currentDate = new Date();
      const date = currentDate.getDate();
      return date;
    },
  },
};
</script>

<style lang="scss" scoped>
$calender_color: #f7f7f7;
$day_font_color: #6d7278;
.calender {
  flex: 1 0 100%;
  padding: 15px;
  background-color: $calender_color;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
  margin-top: 20px;
  @include RWD($pad) {
    margin-top: 40px;
  }
  @include RWD($pad_horizontal) {
    margin-top: 0px;
  }
}

.head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
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
  font-size: 18px;
  .weekdays {
    flex: 1 1 100%;
    text-align: center;
  }
}
</style>