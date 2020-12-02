  <template>
  <div @click="$emit('close')" class="lightbox">
    <div class="content">
      <div
        @click.stop="handlePrevious"
        class="indicator indicator__previous"
      ></div>
      <div class="showing">
        <img
          class="now_image"
          @click.stop="handleNext"
          :src="images[0]"
          v-if="nowImageIndex === 0"
          alt=""
        />
        <img
          class="now_image"
          @click.stop="handleNext"
          :src="images[1]"
          v-if="nowImageIndex === 1"
          alt=""
        />
        <img
          class="now_image"
          @click.stop="handleNext"
          :src="images[2]"
          v-if="nowImageIndex === 2"
          alt=""
        />
        <div class="info">
          <div class="room_name">Single Room</div>
          <div class="order">{{ nowImageIndex + 1 }}/{{ images.length }}</div>
        </div>
      </div>
      <div @click.stop="handleNext" class="indicator indicator__next"></div>
    </div>
  </div>
</template>

  <script>
export default {
  name: "lightbox",
  components: {},
  data() {
    return {
      nowImageIndex: 0,
      images: [
        require("../../assets/room_example.jpeg"),
        require("../../assets/example2.jpeg"),
        require("../../assets/example3.jpeg"),
      ],
    };
  },
  methods: {
    handlePrevious() {
      this.nowImageIndex -= 1;
      if (this.nowImageIndex === -1) {
        this.nowImageIndex = 2;
      }
    },
    handleNext() {
      this.nowImageIndex += 1;
      if (this.nowImageIndex === 3) {
        this.nowImageIndex = 0;
      }
    },
  },
  computed: {},
};
</script>

  <style lang="scss" scoped>
.lightbox {
  user-select: none;
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  @include RWD($pad) {
    align-items: center;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20%;
    @include RWD($pad) {
      margin-top: 0;
    }
  }

  .showing {
    flex: 0 0 45%;
    margin: 0 15px;
    @include RWD($pad) {
      margin: 0 70px;
    }
    .now_image {
      max-width: 40vh;
      max-height: 60vh;
      object-fit: contain;
      @include RWD($pad) {
        max-width: 60vh;
      }
    }
    .info {
      display: flex;
      justify-content: space-between;
      font-weight: 300;
      font-family: "Noto Sans TC";
      font-size: 16px;
      letter-spacing: 2px;
      color: #fff;
      @include RWD($pad) {
        margin-top: 20px;
      }
    }
  }

  %icon {
    display: block;
    color: #fff;
    font-size: 20px;
    font-family: "Noto Serif TC", serif;
    transform: scaleY(1.5);
    @include RWD($pad) {
      font-size: 40px;
    }
  }
  .indicator {
    &__previous {
      &::before {
        content: "<";
        @extend %icon;
      }
    }
    &__next {
      &::before {
        content: ">";
        @extend %icon;
      }
    }
  }
}
</style>