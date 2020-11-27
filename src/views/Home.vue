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
          <a href="#" class="guide_link">Single Room</a>
          <a href="#" class="guide_link">Deluxe Single Room</a>
          <a href="#" class="guide_link">Double Room</a>
          <a href="#" class="guide_link">Deluxe Double Room</a>
          <a href="#" class="guide_link">Twin Room</a>
          <a href="#" class="guide_link">Deluxe Twin Room</a>
        </div>
        <div class="contact_information">
          <div class="social_media">
            <a href="#"><i class="fab fa-facebook-square"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
          </div>
          <div class="contact_ways">
            <div class="phone">
              <i class="fas fa-phone-alt"></i>
              <span>02-17264937</span>
            </div>
            <div class="email">
              <i class="fas fa-envelope"></i>
              <span>whitespace@whitespace.com.tw</span>
            </div>
            <div class="address">
              <i class="fas fa-home"></i>
              <span>台北市羅斯福路十段30號</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="now_room">
      <img src="../assets/room_example.jpeg" class="room_background" />
      <div class="now_room_information">
        <div class="room_number">04</div>
        <div class="room_type">Deluxe Double Room</div>
      </div>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  }
}
</script>

<style lang="scss">
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
        font-weight: 600;
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
      a {
        display: block;
        text-decoration: none;
        color: #000;
        font-size: 14px;
        letter-spacing: 1.5px;
        position: relative;
        margin-left: 10px;

        &:hover {
          &::before {
            content: "";
            width: 15px;
            height: 1px;
            background-color: #000;
            position: absolute;
            top: 50%;
            left: -25px;
            transform: translateY(-50%);
          }
        }

        & + a {
          margin-top: 35px;
        }
      }
    }

    .contact_information {
      // margin-top: 100px;
      padding-left: 25px;
      color: #fff;
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

.now_room {
  position: absolute;
  bottom:70px;
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
      font-size: 66px;
      line-height: 66px;
      color: #fff;
      position: relative;
      display: inline-block;
      padding: 0px 5px;
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
      font-size: 24px;
      font-weight: 300;
      font-family: "Noto Sans TC", "Roboto", sans-serif;
      letter-spacing: 2.5px;
      margin-top: 10px;
    }
  }
}
</style>
