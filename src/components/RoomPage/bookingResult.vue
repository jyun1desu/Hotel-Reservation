<template>
  <div class="dialogue">
    <p class="message">{{ message }}</p>
    <div class="dividing_line">
      <div class="line"><span></span></div>
      <div class="line"><span></span></div>
      <div class="line"><span></span></div>
    </div>
    <div v-if="isSuccess" class="check_icon">
      <div class="circle"></div>
      <div class="check"></div>
    </div>
    <p v-if="!isSuccess" class="fail_message">預約時間已被人預定</p>
    <button @click="$emit('close-booking')" class="return">回頁面</button>
  </div>
</template>
<script>
export default {
  name: "bookingResultDialogue",
  computed: {
    isSuccess() {
      const result = this.$store.state.bookingResult;
      if (result === "success") {
        return true;
      } else {
        return false;
      }
    },
    message() {
      return this.isSuccess ? "預約成功" : "預約失敗";
    },
  },
};
</script>
<style lang="scss" scoped>
$icon_color: #ade8c6;
$submit_button_color: #484848;
.dialogue {
  display: flex;
  flex-direction: column;
  min-width: 280px;
  box-sizing: border-box;
  background-color: #fff;
  padding: 25px 45px;
  @include RWD($pad) {
    width: 350px;
    box-sizing: content-box;
  }

  .message {
    margin: 0;
    font-size: 24px;
    letter-spacing: 2.5px;
  }

  .dividing_line {
    margin: 15px 0 0;
    .line {
      display: inline-block;
      width: 15px;
      height: 15px;
      & + .line {
        margin-left: 5px;
      }
      span {
        display: block;
        width: 13px;
        height: 1px;
        background-color: #000;
        transform: rotate(45deg);
      }
    }
  }

  .fail_message {
    font-size: 14px;
    letter-spacing: 1.5px;
  }

  .return {
    border: none;
    background-color: $submit_button_color;
    margin-top: 20px;
    align-self: flex-end;
    padding: 10px 20px;
    color: #fff;
    font-size: 14px;
    letter-spacing: 1.5px;
    cursor: pointer;

    &:focus {
      border: none;
      outline: none;
    }
  }
}

.check_icon {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  .circle,
  .check {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .circle {
    top: 50%;
    top: 50%;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    border: 8px solid $icon_color;

    &::after {
      content: "";
      width: 50px;
      height: 38px;
      display: block;
      position: absolute;
      top: -8px;
      left: 50%;
      transform: skew(-20deg);
      background-color: #fff;
    }
  }
  .check {
    top: 40%;
    width: 50px;
    height: 15px;
    transform-origin: left bottom;
    transform: rotate(-45deg);
    border-left: 8px solid $icon_color;
    border-bottom: 8px solid $icon_color;
  }
}
</style>