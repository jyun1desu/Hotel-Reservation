<template>
  <main>
    <nav>
      <div class="logo">
        <div class="shadow"></div>
        <div class="brand_box">
          <h1 class="brand_name">White Space</h1>
        </div>
      </div>
      <div class="room_guide">
        <a href="#" class="guide_link">Single Room</a>
        <a href="#" class="guide_link">Deluxe Single Room</a>
        <a href="#" class="guide_link">Double Room</a>
        <a href="#" class="guide_link">Deluxe Double Room</a>
        <a href="#" class="guide_link">Twin Room</a>
        <a href="#" class="guide_link">Deluxe Twin Room</a>
      </div>
    </nav>
    <div class="now_room">
      <img src="./assets/room_example.jpeg" class="room_background" />
      <div class="now_room_information">
        <div class="room_number">04</div>
        <div class="room_type">Deluxe Double Room</div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  font-family: "Roboto", sans-serif;
}

main {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 50px 0 70px 50px;
  position: relative;
  overflow: hidden;
}

nav {
  display: flex;
  justify-content: space-between;
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

  .room_guide {
    background-color: #fff;
    padding: 40px 120px 60px 35px;
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
}

.now_room {
  .room_background {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
    z-index: -1;
  }

  &_information{
    background-color: pink;
  }
}
</style>
