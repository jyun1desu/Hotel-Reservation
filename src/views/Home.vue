<template>
  <main>
    <nav class="navbar">
      <div class="logo">
        <div class="shadow"></div>
        <div class="brand_box">
          <h1 class="brand_name">White Space</h1>
        </div>
      </div>
      <div class="guide_area">
        <div class="room_guide">
          <RoomLink 
          @toRoomPage="toRoomPage"
          v-for="room in rooms"
          :key="room.id"
          :room="room"/>
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
            <div
              v-for="way in contact.contact_ways"
              :key="way.title"
              :class="way.title"
            >
              <i :class="way.icon"></i>
              <span>{{ way.content }}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <BackgroundRoom />
  </main>
</template>

<script>
import RoomLink from '../components/Home/RoomLink.vue'
import BackgroundRoom from '../components/Home/BackgroundRoom.vue'
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
          },
          {
            title: "email",
            content: "whitespace@whitespace.com.tw",
            icon: ["fas", "fa-envelope"],
          },
          {
            title: "address",
            content: "台北市羅斯福路十段30號",
            icon: ["fas", "fa-home"],
          },
        ],
      },
    };
  },
  methods:{
    toRoomPage(){
      this.$router.push({
        name:'RoomPage'
      });
    }
  },
  components:{
    RoomLink,
    BackgroundRoom,
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
  background: rgba(192, 192, 192, 0.2);
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 35%,
    rgba(0, 0, 0, 0.35) 100%
  );
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 50px 0 70px 50px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}

.navbar {
  flex: 0 0 100%;
  display: flex;
  justify-content: space-between;
  // align-self: start;
  .logo {
    user-select: none;
    display: inline-block;
    position: relative;

    .shadow {
      width: 150px;
      height: 150px;
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
      left: 14px;
      top: 14px;
      width: 150px;
      height: 150px;
      border: 2px solid white;
      background-color: rgba(255, 255, 255, 0.3);
      display: flex;
      align-items: center;
      .brand_name {
        margin: 0;
        font-size: 30px;
        font-weight: 400;
        color: white;
        letter-spacing: 3.2px;
        text-align: center;
      }
    }
  }

  .guide_area {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .room_guide {
      background-color: #fff;
      padding: 37px 120px 60px 25px;
      position: relative;

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

    .contact_information {
      padding-left: 25px;
      color: #fff;
      font-weight: 300;
      .social_media {
        font-size: 21px;
        margin-bottom: 45px;
        a {
          color: #fff;
          & + a {
            margin-left: 12px;
          }
        }
      }
      .contact_ways {
        & > div + div {
          margin-top: 15px;
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
</style>
