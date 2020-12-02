<template>
  <div class="now_room">
    <transition>
      <img
        :src="nowRoom.imageUrl[0]"
        v-if="index == 0"
        class="room_background"
      />
    </transition>
    <transition>
      <img
        :src="nowRoom.imageUrl[1]"
        v-if="index == 1"
        class="room_background"
      />
    </transition>
    <transition>
      <img
        :src="nowRoom.imageUrl[2]"
        v-if="index == 2"
        class="room_background"
      />
    </transition>
    <div class="now_room_information">
      <div class="room_number">{{ roomNumber }}</div>
      <div class="room_type">{{ nowRoom.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BackgroundRoom",
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    autoCarousel() {
      setInterval(() => {
        this.index++;
        if (this.index === 3) {
          this.index = 0;
        }
      }, 8000);
    },
  },
  computed: {
    nowRoom() {
      return this.$store.state.nowRoom;
    },
    roomNumber() {
      const roomList = this.$store.state.items;
      const roomIndex =
        roomList.findIndex((room) => room.id === this.nowRoom.id) + 1;
      return `${roomIndex > 9 ? "" : "0"}${roomIndex}`;
    },
    // displayImage() {
    //   const imageUrl = this.nowRoom.imageUrl[this.index];
    //   return imageUrl;
    // },
  },
  mounted() {
    this.autoCarousel();
  },
};
</script>

<style scoped lang="scss">
.now_room {
  position: absolute;
  bottom: 20px;
  @include RWD($pad) {
    bottom: 70px;
  }
  .room_background {
    object-fit: cover;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }

  &_information {
    .room_number {
      font-size: 50px;
      line-height: 50px;
      font-weight: 300;
      color: #fff;
      position: relative;
      display: inline-block;
      padding: 0px 5px;
      @include RWD($pad) {
        font-size: 66px;
        line-height: 66px;
      }
      &::after {
        content: "";
        display: block;
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 20px;
        background-image: repeating-linear-gradient(
          45deg,
          white 16px,
          white 17px,
          rgba(255, 255, 255, 0.3) 17px,
          rgba(255, 255, 255, 0.3) 23px
        );
      }
    }
    .room_type {
      color: white;
      font-size: 20px;
      font-weight: 300;
      font-family: "Noto Sans TC", "Roboto", sans-serif;
      letter-spacing: 2.5px;
      margin-top: 5px;
      @include RWD($pad) {
        font-size: 24px;
        margin-top: 10px;
      }
    }
  }
}

.v-leave {
  // opacity: 1;
}
.v-leave-active {
  opacity: 0.5;
  transition: opacity 2.5s;
}
.v-leave-to {
  opacity: 0;
}
.v-enter {
  opacity: 0.5;
}
.v-enter-active {
  opacity: 0;
  transition: opacity 2s;
}
.v-enter-to {
  opacity: 1;
}
</style>
