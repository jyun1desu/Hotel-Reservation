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
  </div>
</template>

<style lang="scss">
.banner {
  width: 100%;
  height: 80vh;
  display: flex;

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
</style>
