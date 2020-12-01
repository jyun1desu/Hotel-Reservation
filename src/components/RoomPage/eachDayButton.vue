<template>
  <span :class="{ unclickable: beforeToday || moreThan90Days }">
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
      const beforeToday = this.date < this.currentDay.date;
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
</style>