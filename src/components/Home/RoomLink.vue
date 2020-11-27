<template>
  <div class="link">
    <a class="guide_link" href="#">{{room.name}}</a>
    <div class="detail_infomation"></div>
  </div>
</template>

<script>
export default {
  name: "RoomLink",
  props: {
    room: Object,
  },
};
</script>

<style scoped lang="scss">
.link {
  margin-left: 10px;
  & + .link {
    margin-top: 35px;
  }

  a {
    display: block;
    text-decoration: none;
    color: #000;
    font-size: 14px;
    letter-spacing: 1.5px;
    position: relative;

    &.hover-active {
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
  }
}
</style>
