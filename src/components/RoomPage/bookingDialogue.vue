<template>
  <div class="booking">
    <div class="dialogue">
      <p class="title">預約時段</p>
      <div class="dividing_line">
        <div class="line"><span></span></div>
        <div class="line"><span></span></div>
        <div class="line"><span></span></div>
      </div>
      <form @submit.prevent="submitBooking" class="booking_form">
        <div class="name">
          <span class="input_title">姓名</span>
          <input class="input_space" type="text" />
        </div>
        <div class="telephone">
          <span class="input_title">電話</span>
          <input class="input_space" type="text" />
        </div>
        <div class="wantdays">
          <span class="input_title">
            <span>預約</span>
            <span>起訖</span>
          </span>
          <div class="pickday_inputs">
            <div class="input_blocks">
              <div
                @click="openCalendar('checkin')"
                class="startday input_space"
              >
                {{ "" || bookingInfo.checkinDay }}
              </div>
              <div class="dash">～</div>
              <div @click="openCalendar('checkout')" class="endday input_space">
                {{ "" || bookingInfo.checkoutDay }}
              </div>
            </div>

            <calenderPicker
              @book-this-day="handleDayPicking"
              :booking-info="bookingInfo"
              :picking-status="pickingStatus"
              class="picker"
              v-if="
                pickingStatus.isPickingCheckinDay ||
                pickingStatus.isPickingCheckoutDay
              "
            />
          </div>
        </div>
        <div class="total_price">
          <div class="calculation">
            <div class="weekday">
              <span>平日時段</span>
              <span>1夜</span>
            </div>
            <div class="weekend">
              <span>假日時段</span>
              <span>1夜</span>
            </div>
          </div>
          <div class="result">NT.2580</div>
        </div>
        <div class="buttons">
          <button
            type="reset"
            @click.prevent="$emit('cancel-booking')"
            class="buttons__cancel"
          >
            取消
          </button>
          <button type="submit" class="buttons__submit">確定預約</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import calenderPicker from "./calenderPicker";
export default {
  name: "bookingDialogue",
  components: {
    calenderPicker,
  },
  props: ["start-day"],
  data() {
    return {
      showCalenderPicker: false,
      bookingInfo: {
        client: null,
        phone: null,
        checkinDay: this.startDay,
        checkoutDay: null,
      },
      pickingStatus: {
        isPickingCheckinDay: false,
        isPickingCheckoutDay: false,
      },
    };
  },
  methods: {
    openCalendar(day) {
      if (day === "checkin") {
        this.pickingStatus = {
          isPickingCheckinDay: !this.pickingStatus.isPickingCheckinDay,
          isPickingCheckoutDay: false,
        };
        this.bookingInfo = {
          ...this.bookingInfo,
          checkinDay: '',
          checkoutDay: '',
        };
      } else {
        if (!this.bookingInfo.checkinDay || this.isPickingCheckinDay) return;
        this.pickingStatus = {
          isPickingCheckinDay: false,
          isPickingCheckoutDay: !this.pickingStatus.isPickingCheckoutDay,
        };
        this.bookingInfo = {
          ...this.bookingInfo,
          checkinDay: this.bookingInfo.checkinDay || this.startDay,
          checkoutDay: null,
        };
      }
    },
    handleDayPicking(day) {
      const openFromCheckinInput = this.pickingStatus.isPickingCheckinDay;
      const checkinDay = this.bookingInfo.checkinDay;
      if (openFromCheckinInput || !checkinDay) {
        this.bookingInfo = {
          ...this.bookingInfo,
          checkinDay: day,
          checkoutDay: "",
        };
        this.pickingStatus = {
          isPickingCheckinDay: false,
          isPickingCheckoutDay: true,
        };
      } else {
        this.bookingInfo = {
          ...this.bookingInfo,
          checkoutDay: day,
        };
        this.pickingStatus = {
          isPickingCheckinDay: false,
          isPickingCheckoutDay: false,
        };
      }
    },
    submitBooking() {
      this.$emit("submit-booking", this.bookingInfo);
      this.bookingInfo = {
        client: null,
        phone: null,
        checkinDay: this.startDay,
        checkoutDay: null,
      };
    },
    cancelBooking() {
      this.$emit("cancel-booking");
      this.bookingInfo = {
        client: null,
        phone: null,
        checkinDay: this.startDay,
        checkoutDay: null,
      };
    },
    isBefore(day, anotherDay) {
      const year = day.year > anotherDay.year ? 1 : 0;
      const month = day.month > anotherDay.month ? 1 : 0;
      const date = day.date > anotherDay.date ? 1 : 0;
      if (year + month + date > 0) {
        console.log(year + month + date);
        return "ya";
      } else {
        console.log(year + month + date);
        return "no";
      }
    },
  },
};
</script>

<style lang="scss">
$input_border_color: #c9c9c9;
$input_border_radius: 4px;
$input_height: 25px;
$form_paddingY: 40px;
$submit_button_color: #484848;
$cancel_button_color: #d8d8d8;
$cancel_button_font_color: #6d7278;

.booking {
  padding: 15px;
  box-sizing: border-box;
  user-select: none;
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialogue {
  min-width: 280px;
  box-sizing: border-box;
  background-color: #fff;
  padding: $form_paddingY/2;
  @include RWD($pad) {
    width: 350px;
    padding: 30px $form_paddingY;
    box-sizing: content-box;
  }

  .title {
    font-size: 24px;
    letter-spacing: 2.5px;
    margin: 0;
  }

  .dividing_line {
    margin: 15px 0 15px 0;
    @include RWD($pad) {
      margin-bottom: 25px;
    }
    .line {
      display: inline-block;
      width: 15px;
      height: 15px;
      & + .line {
        margin-left: 2px;
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

  .booking_form {
    .name,
    .telephone,
    .wantdays {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & + div {
        margin-top: 15px;
      }
    }

    .wantdays .input_title {
      span {
        display: block;
        @include RWD($pad) {
          display: inline;
        }
      }
    }
    .input_title {
      flex: 0 0 25%;
      font-size: 14px;
      letter-spacing: 2px;
      font-weight: 500;
    }

    .input_space {
      flex: 0 1 70%;
      @include RWD($pad) {
        flex: 0 1 70%;
      }
      padding: 0 10px;
      box-sizing: border-box;
      border: 1px solid $input_border_color;
      border-radius: $input_border_radius;
      height: $input_height;
      font-family: "Roboto", sans-serif;
      font-weight: 300;
      font-size: 12px;
      letter-spacing: 1px;
      &:focus {
        outline: none;
      }
    }

    .pickday_inputs {
      position: relative;
      flex: 0 1 70%;
      display: flex;
      flex-direction: column;
      @include RWD($pad) {
        flex-direction: row;
        justify-content: space-between;
      }

      .input_blocks {
        flex: 1 1 100%;
        text-align: center;
        @include RWD($pad) {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
      }

      .dash {
        display: inline-block;
        align-self: center;
        transform: rotate(90deg);
        @include RWD($pad) {
          transform: rotate(0);
          margin: 0 20px;
        }
      }

      .input_space {
        flex: 0 1 100%;
        line-height: 25px;
        text-align: center;
      }
    }

    .total_price {
      .calculation {
        background-color: #ededed;
        margin: 0 0-$form_paddingY/2;
        padding: 10px $form_paddingY/2;
        @include RWD($pad) {
          margin: 0 0-$form_paddingY;
          padding: 10px $form_paddingY;
        }

        & > div {
          display: flex;
          justify-content: space-between;
          span {
            font-size: 12px;
            letter-spacing: 1px;
            color: #6d7278;
          }
        }
      }
      .result {
        margin-top: 15px;
        font-size: 26px;
        font-weight: 300;
        text-align: right;
        letter-spacing: 3px;
        color: #ff5c5c;

        &::before {
          content: "=";
          margin-right: 20px;
        }
      }
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      & > button {
        border: none;
        padding: 10px 25px;
        cursor: pointer;

        &:focus {
          border: none;
          outline: none;
        }
      }

      &__submit {
        background-color: $submit_button_color;
        color: #fff;
      }
      &__cancel {
        background-color: $cancel_button_color;
        color: $cancel_button_font_color;
      }
    }
  }
}

.picker {
  position: absolute;
  width: 180%;
  top: 20px;
  left: -60%;
  margin-top: 0;
  @include RWD($pad) {
    width: 150%;
    top: 15px;
    left: 0;
  }

  .day {
    padding: 10px;
  }
}
</style>