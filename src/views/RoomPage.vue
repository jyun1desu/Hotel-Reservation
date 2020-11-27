<template>
  <div class="room_page">
    <div class="banner">
      <div class="main_image">
        <img src="../assets/room_example.jpeg" alt="" />
      </div>
      <div class="sub_images">
        <img src="../assets/example2.jpeg" alt="" />
        <img src="../assets/example3.jpeg" alt="" />
      </div>
    </div>
    <div class="room_detail">
      <div class="room_info">
        <div class="room_info__description">
          <h2 class="name">{{ room.name }}</h2>
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
          <div class="check_time"></div>
          <div class="service_lisl"></div>
        </div>
        <div class="room_info__price">
          <div class="weekday"></div>
          <div class="weekend"></div>
        </div>
      </div>
      <div class="reservation">
        <div class="calender"></div>
        <div class="reservation__button"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomPage",
  computed: {
    room() {
      return this.$store.state.nowRoom;
    },
    shortDescription() {
      const d = this.room.descriptionShort;
      const guestRange = `${d.GuestMin}～${d.GuestMax}`;
      const bedType = d.Bed[0];
      const bedAmount = d.Bed.length;
      const bedInfo = `${bedType} × ${bedAmount}`;
      const bathAmount = d["Private-Bath"];
      const footage = d.Footage;

      return { guestRange, bedInfo, bathAmount, footage };
    },
  },
};
</script>

<style scoped lang="scss">
.banner {
  width: 100%;
  height: 85vh;
  display: flex;
  box-shadow: 0px 1px 10px 3px rgba(0, 0, 0, 0.2);

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
  display: flex;
  padding: 50px 60px;
  .room_info {
    display: flex;
    flex: 1 1 65%;
    &__description {
      flex: 1 1 65%;
      margin-right: 30px;
      .name {
        font-size: 36px;
        letter-spacing: 4px;
        margin: 0 0 30px;
      }
      .basic_introduction {
        font-size: 14px;
        letter-spacing: 1.5px;
        line-height: 30px;

        .text {
          text-align: justify;
        }
      }
    }
    .dividing_line {
      margin: 30px 0;
      .line {
        display: inline-block;
        width: 15px;
        height: 15px;
        &+.line{
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
    &__price{
      flex: 1 1 35%;
      background-color:grey;
    }
  }
  .reservation{
    flex: 1 1 35%;
    background-color: green;
  }
}
</style>
