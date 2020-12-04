<template>
  <div class="booking">
    <div v-if="!isLoading && !gotBookingResult" class="booking__dialogue">
      <p class="title">預約時段</p>
      <div class="dividing_line">
        <div class="line"><span></span></div>
        <div class="line"><span></span></div>
        <div class="line"><span></span></div>
      </div>
      <form @submit.prevent="submitBooking" class="booking_form">
        <div class="name">
          <span class="input_title">姓名</span>
          <input
            placeholder="請輸入中文或英文姓名"
            v-model="bookingInfo.client"
            class="input_space"
            type="text"
          />
        </div>
        <div class="telephone">
          <span class="input_title">電話</span>
          <input
            v-model="bookingInfo.phone"
            class="input_space"
            :class="{ warning: inVaildInput.phone }"
            placeholder="09......."
            type="text"
          />
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
              :checkout-calendar="checkoutCalendar"
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
              <span>{{ holidayAndNormal.normalDay }}夜</span>
            </div>
            <div class="weekend">
              <span>假日時段</span>
              <span>{{ holidayAndNormal.holiday }}夜</span>
            </div>
          </div>
          <div class="result">NT.{{ countPrice }}</div>
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
    <div v-if="isLoading" class="loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <bookingResult
      @close-booking="
        $emit('close-booking');
        bookingInfoIsSend = false;
      "
      v-if="gotBookingResult"
    />
  </div>
</template>

<script>
import calenderPicker from "./calenderPicker";
import bookingResult from "./bookingResult";
export default {
  name: "bookingDialogue",
  components: {
    calenderPicker,
    bookingResult,
  },
  props: ["start-day"],
  data() {
    return {
      checkoutCalendar: null,
      bookingInfoIsSend: false,
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
      inVaildInput: {
        phone: false,
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
          checkinDay: "",
          checkoutDay: "",
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
      const clientName = this.bookingInfo.client;
      const phone = this.bookingInfo.phone;
      const checkinDay = this.bookingInfo.checkinDay;
      const checkoutDay = this.bookingInfo.checkoutDay;
      const validPhoneNumber = /^09\d{8}$/.test(phone);
      if (!clientName || !validPhoneNumber || !checkinDay || !checkoutDay)
        return;
      this.bookingInfoIsSend = true;
      this.$store.dispatch("postNewBooking", {
        roomID: this.nowRoom.id,
        bookingInfo: this.bookingInfoSend,
      });
      this.bookingInfo = {
        client: "",
        phone: "",
        checkinDay: this.startDay,
        checkoutDay: "",
      };
    },
    cancelBooking() {
      this.$emit("cancel-booking");
      this.bookingInfo = {
        client: "",
        phone: "",
        checkinDay: this.startDay,
        checkoutDay: "",
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
  watch: {
    "bookingInfo.phone": function (value) {
      const hasVulue = value.length !== 0;
      const valid = /^09\d{8}$/.test(value);
      if (hasVulue && !valid) {
        this.inVaildInput.phone = true;
      } else {
        this.inVaildInput.phone = false;
      }
    },
    "pickingStatus.isPickingCheckoutDay": function (isPickCheckout) {
      if (isPickCheckout) {
        const day = this.bookingInfo.checkinDay;
        const year = Number(day.split("-")[0]);
        const month = Number(day.split("-")[1]);
        this.checkoutCalendar = {
          year,
          month,
          date: 1,
          day: new Date(`${year}/${month}/1`).getDay(),
        };
      }else{
        this.checkoutCalendar=null
      }
    },
  },
  computed: {
    isLoading() {
      const bookingInfoIsSend = this.bookingInfoIsSend;
      const gotResult = this.$store.state.bookingResult !== null;
      return bookingInfoIsSend && !gotResult;
    },
    livingDates() {
      const checkinDay = new Date(this.bookingInfo.checkinDay);
      const checkoutDay = new Date(this.bookingInfo.checkoutDay);
      const dayAmount = parseInt(
        Math.abs(checkinDay - checkoutDay) / 1000 / 60 / 60 / 24
      );
      const livingDaysArray = [];
      for (let i = 0; i < dayAmount; i++) {
        const checkinDay = new Date(this.bookingInfo.checkinDay);
        const time = checkinDay.setDate(checkinDay.getDate() + i);
        const day = new Date(time);
        const year = day.getFullYear();
        const month =
          day.getMonth() + 1 < 10
            ? `0${day.getMonth() + 1}`
            : `${day.getMonth() + 1}`;
        const date =
          day.getDate() < 10 ? `0${day.getDate()}` : `${day.getDate()}`;
        const dayInFormat = `${year}-${month}-${date}`;
        livingDaysArray.push(dayInFormat);
      }
      return livingDaysArray;
    },
    countWeekDay() {
      if (!this.bookingInfo.checkoutDay) return;
      const weekArray = this.livingDates.map((day) => {
        const year = day.split("-")[0];
        const month = day.split("-")[1];
        const date = day.split("-")[2];
        const weekday = new Date(`${year}/${month}/${date}`).getDay();
        return weekday;
      });
      return weekArray;
    },
    holidayAndNormal() {
      if (!this.bookingInfo.checkinDay || !this.bookingInfo.checkoutDay)
        return 0;
      const holiday = this.countWeekDay.filter((day) => day === 0 || day === 6)
        .length;
      const normalDay = this.countWeekDay.filter(
        (day) => day !== 0 && day !== 6
      ).length;
      return { holiday, normalDay };
    },
    countPrice() {
      if (!this.bookingInfo.checkoutDay) return 0;
      const holidayPrice = 2000;
      const normalPrice = 1000;
      const totalPrice = this.countWeekDay.reduce((a, b) => {
        if (b == 0 || b == 6) {
          b = holidayPrice;
        } else {
          b = normalPrice;
        }
        return a + b;
      }, 0);
      return totalPrice;
    },
    bookingInfoSend() {
      const info = {
        name: this.bookingInfo.client,
        tel: this.bookingInfo.phone,
        date: this.livingDates,
      };
      return JSON.stringify(info);
    },
    nowRoom() {
      return this.$store.state.nowRoom;
    },
    gotBookingResult() {
      const result = this.$store.state.bookingResult;
      if (result !== null) {
        return true;
      } else {
        return false;
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

  &__dialogue {
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

      .telephone {
        &.warning {
          &::before {
            content: "請輸入正確格式";
            display: block;
            background-color: pink;
            width: 100px;
            height: 100px;
          }
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
        &.warning {
          border: 1px solid red;
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

.loading {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  & > div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>