<template>
  <div
    @click="toggleMenu"
    class="toggle_icon"
    :class="{ 'none-animation': !animation }"
  >
    <span class="icon_line" :class="{ 'click-active': toggleActive }"></span>
    <span class="icon_line" :class="{ 'click-active': toggleActive }"></span>
    <span class="icon_line" :class="{ 'click-active': toggleActive }"></span>
  </div>
</template>

<script>
export default {
  name: "toggleIcon",
  data() {
    return {
      toggleActive: false,
      animation: false,
    };
  },
  methods: {
    toggleMenu() {
      this.animation = true;
      this.toggleActive = !this.toggleActive;
    },
  },
};
</script>

<style scoped lang="scss">
.toggle_icon {
  @include RWD($pad) {
    display: none;
  }
  z-index: 10;
  margin-top: 15px;
  width: 25px;
  cursor: pointer;
  position: relative;

  &.none-animation {
    .icon_line {
      animation: none !important;
    }
  }

  .icon_line {
    display: block;
    width: 100%;
    height: 2px;
    border-radius: 5px;
    background-color: #fff;

    &:not(:last-child) {
      margin-bottom: 7px;
    }

    &:nth-child(1) {
      animation: icon_line_one_rev 0.5s forwards;
    }

    &:nth-child(2) {
      animation: icon_line_two_rev 0.5s forwards;
    }

    &:nth-child(3) {
      animation: icon_line_three_rev 0.5s forwards;
    }

    &.click-active {
      &:nth-child(1) {
        animation: icon_line_one 0.5s forwards;
      }

      &:nth-child(2) {
        animation: icon_line_two 0.5s forwards;
      }

      &:nth-child(3) {
        animation: icon_line_three 0.5s forwards;
      }
    }
  }
}
@keyframes icon_line_one {
  0% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }

  50% {
    transform: translate3d(0, 9px, 0) rotate(0);
  }

  100% {
    transform: translate3d(0, 9px, 0) rotate(45deg);
  }
}

@keyframes icon_line_two {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  30%,
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

@keyframes icon_line_three {
  0% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }

  50% {
    transform: translate3d(0, -9px, 0) rotate(0);
  }

  100% {
    transform: translate3d(0, -9px, 0) rotate(-45deg);
  }
}

@keyframes icon_line_one_rev {
  0% {
    transform: translate3d(0, 9px, 0) rotate(45deg);
  }

  50% {
    transform: translate3d(0, 9px, 0) rotate(0);
  }

  100% {
    transform: translate3d(0, 0, 0) rotate(0);
  }
}

@keyframes icon_line_two_rev {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  70%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes icon_line_three_rev {
  0% {
    transform: translate3d(0, -9px, 0) rotate(-45deg);
  }

  50% {
    transform: translate3d(0, -9px, 0) rotate(0);
  }

  100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
}
</style>
