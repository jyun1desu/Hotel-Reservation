<template>
  <bookingDialogue
    v-if="showBookingDialogue"
    :start-day="pickedDay"
    @close-booking="closeBooking"
    @cancel-booking="closeBooking"
  />
  <div class="room_page">
    <div v-if="showLightbox || showBookingDialogue" class="mask"></div>
    <lightbox 
    :show-index="showImageIndex"
    :images="roomImages"
    @close="showLightbox = false"
    v-if="showLightbox"></lightbox>
    <div class="banner">
      <div @click="toHomePage" class="logo">
        <div class="shadow"></div>
        <h1 class="brand_name">WhiteSpace</h1>
      </div>
      <div class="main_image">
        <img
          @click="showLightbox = true;showImageIndex=0"
          :src="roomImages[0]"
          alt=""
        />
      </div>
      <div class="sub_images">
        <img
          @click="showLightbox = true;showImageIndex=1"
          :src="roomImages[1]"
          alt=""
        />
        <img
          @click="showLightbox = true;showImageIndex=2"
          :src="roomImages[2]"
          alt=""
        />
      </div>
    </div>
    <div class="room_detail">
      <div class="room_info">
        <h2 class="name">{{ room.name }}</h2>
        <div class="room_price small">
          <div class="weekday">
            <p class="price">NT.{{ room.normalDayPrice }}</p>
            <p class="period">平日(一～四)</p>
          </div>
          <div class="weekend">
            <p class="price">NT.{{ room.holidayPrice }}</p>
            <p class="period">假日(五～日)</p>
          </div>
        </div>
        <div class="room_info__description">
          <div class="basic_introduction">
            <p>房客人數限制：{{ shortDescription.guestRange }}人</p>
            <p>床型：{{ shortDescription.bedInfo }}</p>
            <p>衛浴數量：{{ shortDescription.bathAmount }}間</p>
            <p>房間大小：{{ shortDescription.footage }}平方公尺</p>
            <p class="text">{{ room.description }}</p>
          </div>
          <div class="dividing_line">
            <div class="line"><span></span></div>
            <div class="line"><span></span></div>
            <div class="line"><span></span></div>
          </div>
          <div class="check_time">
            <div class="check_in">
              <p>Check In</p>
              <p class="time">{{ checkTime.checkInTime }}</p>
            </div>
            <div class="check_out">
              <p>Check Out</p>
              <p class="time">{{ checkTime.checkOutTime }}</p>
            </div>
          </div>
          <amenities :list="room.amenities" />
        </div>
      </div>
      <div class="room_price big">
        <div class="weekday">
          <p class="price">NT.{{ room.normalDayPrice }}</p>
          <p class="period">平日(一～四)</p>
        </div>
        <div class="weekend">
          <p class="price">NT.{{ room.holidayPrice }}</p>
          <p class="period">假日(五～日)</p>
        </div>
      </div>
      <div class="reservation">
        <p>顯示近 90 日的房間預訂狀態，劃線代表已被預訂</p>
        <calenderPicker @book-this-day="bookCertainDay" />
        <button @click="showBookingDialogue = true" class="reservation__button">
          預約時段
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import amenities from "../components/RoomPage/amenities.vue";
import calenderPicker from "../components/RoomPage/calenderPicker.vue";
import lightbox from "../components/RoomPage/lightbox.vue";
import bookingDialogue from "../components/RoomPage/bookingDialogue.vue";
export default {
  name: "RoomPage",
  data() {
    return {
      showImageIndex:null,
      showLightbox: false,
      showBookingDialogue: false,
      pickedDay: "",
    };
  },
  components: {
    amenities,
    calenderPicker,
    lightbox,
    bookingDialogue,
  },
  methods: {
    toHomePage() {
      this.$router.push({
        name: "Home",
      });
    },
    bookCertainDay(date) {
      this.showBookingDialogue = true;
      this.pickedDay = date;
    },
    closeBooking() {
      this.showBookingDialogue = false;
      this.pickedDay = "";
    },
  },
  computed: {
    room() {
      return this.$store.state.nowRoom;
    },
    shortDescription() {
      const d = this.room.descriptionShort;
      const guestRange = d.GuestMin==d.GuestMax?d.GuestMin:`${d.GuestMin}～${d.GuestMax}`;
      const bedType = d.Bed[0];
      const bedAmount = d.Bed.length;
      const bedInfo = `${bedType} × ${bedAmount}`;
      const bathAmount = d["Private-Bath"];
      const footage = d.Footage;

      return { guestRange, bedInfo, bathAmount, footage };
    },
    checkTime() {
      const checkTimeData = this.room.checkInAndOut;
      const checkInTime = `${checkTimeData.checkInEarly} — ${checkTimeData.checkInLate}`;
      const checkOutTime = checkTimeData.checkOut;

      return { checkInTime, checkOutTime };
    },
    roomImages(){
      const newArray = [this.room.imageUrl[1],this.room.imageUrl[0],this.room.imageUrl[2]]
      return newArray
    },
  },
};
</script>

<style scoped lang="scss">
$grey_font_color: #6d7278;
$button_color: #575757;

.room_page {
  position: relative;
}

.mask {
  position: absolute;
  z-index: 9;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.banner {
  width: 100%;
  height: 40vh;
  @include RWD($pad) {
    height: 60vh;
  }
  @include RWD($pad_horizontal) {
    height: 85vh;
  }
  display: flex;
  box-shadow: 0px 1px 10px 3px rgba(0, 0, 0, 0.2);
  position: relative;
  .logo {
    position: absolute;
    top: 15px;
    left: 20px;
    cursor: pointer;
    user-select: none;
    @include RWD($pad) {
      top: 35px;
      left: 50px;
    }
    .shadow {
      width: 100px;
      height: 25px;
      clip-path: polygon(0% 0%, 0% 100%, 10% 100%, 10% 20%, 100% 20%, 100% 0%);
      background-image: repeating-linear-gradient(
        45deg,
        #000 10px,
        #000 11px,
        rgba(255, 255, 255, 0.3) 11px,
        rgba(255, 255, 255, 0.3) 15px
      );
      @include RWD($pad) {
        width: 150px;
        height: 45px;
      }
    }
    .brand_name {
      position: absolute;
      left: 10px;
      top: 5px;
      font-size: 12px;
      letter-spacing: 2px;
      font-weight: 400;
      margin: 0;
      padding: 5px 8px;
      border: 1px solid #000;
      @include RWD($pad) {
        font-size: 18px;
        padding: 10px 16px;
        left: 15px;
        top: 8px;
      }
    }
  }
  .main_image {
    flex-basis: 65%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .sub_images {
    flex-basis: 35%;
    display: flex;
    flex-direction: column;
    img {
      display: block;
      width: 100%;
      height: 50%;
      object-fit: cover;
    }
  }
}

.room_detail {
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  @include RWD($pad) {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 50px 60px;
  }
  box-sizing: border-box;
  .room_info {
    flex: 1 0 100%;
    justify-content: space-between;
    @include RWD($pad) {
      flex: 1 1 40%;
    }
    @include RWD($pad_horizontal) {
      margin-right: 40px;
    }
    p {
      font-size: 14px;
      letter-spacing: 1.5px;
      line-height: 30px;
      font-weight: 300;
    }
    .name {
      font-size: 30px;
      font-weight: 400;
      letter-spacing: 3px;
      margin: 0;
      line-height: 40px;
      @include RWD($phone_horizontal) {
        font-size: 36px;
        letter-spacing: 5px;
        margin: 0 0 20px;
      }
    }
    &__description {
      @include RWD($pad_horizontal) {
        margin-right: 20px;
      }
      .basic_introduction {
        & > p {
          margin: 10px 0;
        }
        .text {
          text-align: justify;
          font-size: 12px;
          font-weight: 300;
          line-height: 20px;
          letter-spacing: 1.3px;
        }
      }
      .dividing_line {
        margin: 30px 0 15px;
        .line {
          display: inline-block;
          width: 15px;
          height: 15px;
          & + .line {
            margin-left: 10px;
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
      .check_time {
        display: flex;
        & > div {
          flex: 1 1 50%;
          p {
            margin: 0;
          }
          .time {
            font-size: 22px;
            letter-spacing: 2.2px;
          }
        }
      }
    }
  }
  .room_price {
    &.big {
      display: none;
      @include RWD($pad) {
        display: block;
        text-align: right;
        margin: 0 0 0 30px;
      }
      @include RWD($pad_horizontal) {
        margin-left: 0;
        margin-right: 40px;
      }
    }
    &.small {
      display: flex;
      align-items: flex-end;
      margin-top: 10px;

      .weekday {
        .price {
          font-size: 20px;
          letter-spacing: 2px;
          line-height: 20px;
          vertical-align: bottom;
          margin: 0;
        }
      }

      .weekend {
        .price {
          line-height: 12px;
          font-size: 12px;
          letter-spacing: 2px;
          margin: 0;
        }
      }

      .period {
        margin: 0;
        font-size: 12px;
        letter-spacing: 1.5px;
        color: $grey_font_color;
      }

      @include RWD($pad) {
        display: none;
      }
    }
    font-weight: 300;
    .weekday {
      .price {
        font-size: 30px;
        letter-spacing: 3px;
        line-height: 40px;
        vertical-align: bottom;
        margin: 0;
      }
    }
    .weekend {
      margin-top: 15px;
      margin-left: 15px;
      .price {
        font-size: 16px;
        letter-spacing: 2px;
        margin: 0;
      }
    }
    .period {
      margin: 0;
      font-size: 14px;
      letter-spacing: 1.5px;
      color: $grey_font_color;
    }
  }
  .reservation {
    flex: 1 1 20%;
    display: flex;
    flex-wrap: wrap;
    @include RWD($pad) {
      flex: 1 0 100%;
    }
    @include RWD($pad_horizontal) {
      display: block;
      flex: 1 1 20%;
    }
    p {
      font-family: "roboto", sans-serif;
      margin: 25px 0 0;
      font-size: 14px;
      letter-spacing: 1.5px;
      color: $grey_font_color;
      @include RWD($pad_horizontal) {
        margin-top: 0;
      }
    }
    &__button {
      cursor: pointer;
      user-select: none;
      color: #fff;
      padding: 10px 15px;
      @include RWD($pad_horizontal) {
        padding: 15px 25px;
      }
      margin-top: 25px;
      margin-left: auto;
      background-color: $button_color;
      border: none;
      outline: none;
      font-size: 16px;
      letter-spacing: 2px;
      position: relative;

      &::after {
        content: "";
        display: block;
        position: absolute;
        z-index: -1;
        top: 9px;
        left: 8px;
        width: 100px;
        height: 40px;
        background-image: repeating-linear-gradient(
          45deg,
          $button_color 11px,
          $button_color 11px,
          rgba(255, 255, 255, 0.3) 12px,
          rgba(255, 255, 255, 0.3) 15px
        );

        @include RWD($pad_horizontal) {
          width: 120px;
          height: 50px;
        }
      }
    }
  }
}
</style>
