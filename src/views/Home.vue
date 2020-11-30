<template>
  <main>
    <nav class="navbar">
      <div class="logo">
        <div class="shadow"></div>
        <div class="brand_box">
          <h1 class="brand_name">White Space</h1>
        </div>
      </div>
      <toggleIcon @click="toggleList = !toggleList" />
      <transition name="slide-in-out">
        <div class="guide_area" v-if="toggleList">
          <div class="room_guide">
            <RoomLink
              @toRoomPage="toRoomPage"
              v-for="room in rooms"
              :key="room.id"
              :room="room"
            />
          </div>
          <div class="contact_information">
            <div class="social_media">
              <a
                v-for="platform in contact.social_media"
                :key="platform.title"
                href=""
              >
                <i :class="platform.icon"></i>
              </a>
            </div>
            <div class="contact_ways">
              <a
                :href="way.link"
                v-for="way in contact.contact_ways"
                :key="way.title"
                :class="way.title"
              >
                <i :class="way.icon"></i>
                <span>{{ way.content }}</span>
              </a>
            </div>
          </div>
        </div>
      </transition>
    </nav>
    <BackgroundRoom />
  </main>
</template>

<script>
import RoomLink from "../components/Home/RoomLink.vue";
import BackgroundRoom from "../components/Home/BackgroundRoom.vue";
import toggleIcon from "../components/Home/toggleIcon.vue";
export default {
  name: "Home",
  data() {
    return {
      contact: {
        social_media: [
          { title: "facebook", icon: ["fab", "fa-facebook-square"], link: "#" },
          { title: "instagram", icon: ["fab", "fa-instagram"], link: "#" },
        ],
        contact_ways: [
          {
            title: "phone",
            content: "02-17264937",
            icon: ["fas", "fa-phone-alt"],
            link: "tel:02-17264937",
          },
          {
            title: "email",
            content: "whitespace@whitespace.com.tw",
            icon: ["fas", "fa-envelope"],
            link: "mailto:whitespace@whitespace.com.tw",
          },
          {
            title: "address",
            content: "台北市羅斯福路十段30號",
            icon: ["fas", "fa-home"],
          },
        ],
      },
      toggleList: false,
    };
  },
  methods: {
    toRoomPage() {
      this.$router.push({
        name: "RoomPage",
      });
    },
  },
  components: {
    RoomLink,
    BackgroundRoom,
    toggleIcon,
  },
  computed: {
    rooms() {
      return this.$store.state.items;
    },
  },
};
</script>

<style scoped lang="scss">
main {
  display: flex;
  flex-wrap: wrap;
  background: rgba(192, 192, 192, 0.2);
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 35%,
    rgba(0, 0, 0, 0.35) 100%
  );
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  padding: 15px;
  @include RWD($pad) {
    padding: 50px 0 70px 50px;
  }
}

.navbar {
  flex: 0 0 100%;
  display: flex;
  justify-content: space-between;
  .logo {
    flex: 0 0 30%;
    display: inline-block;
    user-select: none;
    position: relative;

    .shadow {
      width: 70px;
      height: 70px;
      @include RWD($pad) {
        width: 150px;
        height: 150px;
      }
      clip-path: polygon(0% 0%, 0% 100%, 10% 100%, 10% 10%, 100% 10%, 100% 0%);
      background-image: repeating-linear-gradient(
        45deg,
        white 10px,
        white 11px,
        rgba(255, 255, 255, 0.3) 11px,
        rgba(255, 255, 255, 0.3) 16px
      );
    }
    .brand_box {
      position: absolute;
      left: 7px;
      top: 7px;
      width: 70px;
      height: 70px;
      @include RWD($pad) {
        left: 14px;
        top: 14px;
        width: 150px;
        height: 150px;
      }
      border: 2px solid white;
      background-color: rgba(255, 255, 255, 0.3);
      display: flex;
      align-items: center;
      .brand_name {
        margin: 0;
        font-size: 17px;
        font-weight: 400;
        color: white;
        letter-spacing: 2px;
        text-align: center;
        @include RWD($pad) {
          font-size: 30px;
          letter-spacing: 3.2px;
        }
      }
    }
  }

  .guide_area {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: absolute;
    right: 0;
    @include RWD($pad) {
      position: relative;
      justify-content: space-between;
    }

    .room_guide {
      display: inline-block;
      background-color: rgba(255, 255, 255, 0.7);
      padding: 25px 25px 0;
      position: relative;

      @include RWD($pad) {
        background-color: #fff;
        padding: 37px 120px 60px 25px;
        &::after {
          content: "";
          display: block;
          position: absolute;
          top: 100%;
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
    }

    .contact_information {
      background-color: rgba(255, 255, 255, 0.7);
      font-weight: 300;
      padding: 0 25px 25px 35px;

      &::before {
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        border-top: 1px solid #888;
        margin: 15px 0;
      }

      @include RWD($pad) {
        padding: 0 0 0 25px;
        color: #fff;
        background-color: transparent;

        &::before {
          display: none;
        }
      }
      .social_media {
        text-align: right;
        font-size: 21px;
        @include RWD($pad) {
          margin-bottom: 45px;
          text-align: left;
        }

        a {
          color: #000;
          @include RWD($pad) {
            color: #fff;
          }
          & + a {
            margin-left: 12px;
          }
        }
      }
      .contact_ways {
        margin-top: 15px;
        @include RWD($pad) {
          display: block;
          margin-top: 0;
        }
        & > a {
          display: block;
          color: #000;
          text-decoration: none;
          @include RWD($pad) {
            color: #fff;
          }
          & + a {
            margin-top: 15px;
          }
        }
        i {
          font-size: 18px;
          margin-right: 12px;
        }
        span {
          font-size: 15px;
        }
      }
    }
  }
}

.slide-in-out-enter-active {
  transform: translateX(100%);
  opacity: 0.3;
  transition: all 0.8s ease;
}

.slide-in-out-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-in-out-leave-active {
  transition: all 0.8s ease;
}

.slide-in-out-leave-to {
  transform: translateX(100%);
  opacity: 0.3;
}
</style>
