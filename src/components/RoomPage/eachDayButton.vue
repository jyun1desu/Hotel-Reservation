<template>
  <span
    class="day"
    :class="{ unclickable: beforeToday || moreThan90Days, unavailable: date%2===0 }"
  >
    {{ date }}
  </span>
</template>

<script>
export default {
  name: "eachDayButton",
  props: ["date", "current-day", "today"],
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
  },
};
</script>

<style lang="scss" scoped>
.day {
  padding: 12px 5px;
  box-sizing: border-box;
  flex: 0 0 1/7 * 100%;
  text-align: center;
  font-family: "roboto", serif;
  font-weight: 300;
  @include RWD($pad) {
    padding: 15px 8px;
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
      transform: translate(-50%,-50%);
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