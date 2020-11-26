<template>
    <img src="./assets/room_example.jpeg" class="room_background">
    <div class="logo">
      <div class="shadow"></div>
      <div class="brand_box">
        <h1 class="brand_name">White Space</h1>
      </div>
    </div>
</template>

<style lang="scss">
html,body,#app{
  width: 100%;
  height: 100%;
  margin: 0;
  font-family: 'Open Sans', sans-serif;
}
.room_background{
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.logo{
  user-select: none;
  display: inline-block;
  position: relative;
  margin-top: 50px;
  margin-left: 50px;

  .shadow{
    width: 150px;
    height: 150px;
    clip-path: polygon(0% 0%, 0% 100%, 10% 100%, 10% 10%, 100% 10%, 100% 0%);
    background-image: repeating-linear-gradient(45deg, 
    white 10px,
    white 11px,
    rgba(255, 255, 255, 0.3) 11px,
    rgba(255, 255, 255, 0.3) 16px);
  }
  .brand_box{
    position: absolute;
    left: 14px;
    top: 14px;
    width: 150px;
    height: 150px;
    border: 2px solid white;
    background-color: rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
      .brand_name{
      margin: 0;
      font-size: 30px;
      font-weight: 400;
      color: white;
      letter-spacing: 2px;
      text-align: center;
      }
  }
}


</style>
