<template>
  <div class="link">
    <a 
    class="guide_link"
    @click="$emit('to-room-page')">{{room.name}}</a>
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
    margin-top: 25px;
  }

  a {
    display: block;
    text-decoration: none;
    color: #000;
    font-size: 14px;
    letter-spacing: 1.5px;
    font-weight: 300;
    position: relative;
    cursor: pointer;

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
  }
}
</style>
