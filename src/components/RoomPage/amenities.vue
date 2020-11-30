<template>
  <div class="amenities">
    <div
      v-for="(item, index) in listArray"
      :key="index"
      class="services"
      :class="{ no_offer: !item.isOffer }"
    >
      <span class="icon"><i :class="item.classes"></i></span>
      <span class="services__name">{{ item.chinese }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "amenities",
  props: {
    list: Object,
  },
  computed: {
    listArray() {
      const keys = Object.keys(this.list);
      const value = Object.values(this.list);
      const amenitieList = [
        { english: "Wi-Fi", chinese: "Wi-Fi", class: ["fas", "fa-wifi"] },
        {
          english: "Breakfast",
          chinese: "早餐",
          class: ["fas", "fa-utensils"],
        },
        {
          english: "Mini-Bar",
          chinese: "Mini-Bar",
          class: ["fas", "fa-cocktail"],
        },
        {
          english: "Room-Service",
          chinese: "客房服務",
          class: ["fas", "fa-concierge-bell"],
        },
        { english: "Television", chinese: "電視", class: ["fas", "fa-tv"] },
        {
          english: "Air-Conditioner",
          chinese: "空調",
          class: ["fas", "fa-wind"],
        },
        {
          english: "Refrigerator",
          chinese: "冰箱",
          class: ["fas", "fa-ice-cream"],
        },
        { english: "Sofa", chinese: "沙發", class: ["fas", "fa-couch"] },
        {
          english: "Great-View",
          chinese: "漂亮的視野",
          class: ["fas", "fa-mountain"],
        },
        {
          english: "Smoke-Free",
          chinese: "禁止吸菸",
          class: ["fas", "fa-smoking-ban"],
        },
        {
          english: "Child-Friendly",
          chinese: "適合兒童",
          class: ["fas", "fa-baby"],
        },
        {
          english: "Pet-Friendly",
          chinese: "寵物攜帶",
          class: ["fas", "fa-dog"],
        },
      ];
      const list = keys.map((name, index) => {
        const isOffer = value[index];
        const chinese = amenitieList.find((item) => item.english === name)
          .chinese;
        const classes = amenitieList.find((item) => item.english === name)
          .class;
        return { isOffer, chinese, classes };
      });
      return list;
    },
  },
};
</script>

<style lang="scss" scoped>
$board_color: #f0f0f0;
$no_offer_color: #6d7278;
.amenities {
  margin-top: 20px;
  padding: 20px 15px;
  background-color: $board_color;
  display: flex;
  flex-wrap: wrap;

  @include RWD($pad) {
    margin-top: 40px;
    padding: 25px;
  }

  .services {
    font-weight: 300;
    flex: 1 1 50%;
    letter-spacing: 1.5px;
    margin-bottom: 30px;
    &:nth-last-child(1),&:nth-last-child(2){
        margin-bottom: 0;
    }
    @include RWD($pad) {
      flex: 1 1 30%;
          &:nth-last-child(1),&:nth-last-child(2),&:nth-last-child(3){
        margin-bottom: 0;
    }
    }
    .icon {
      text-align: center;
      display: inline-block;
      width: 16px;
      margin-right: 20px;
    }
    &__name,
    .icon {
      font-size: 12px;
      line-height: 15px;
      vertical-align: middle;
    }

    &.no_offer {
      color: $no_offer_color;
    }
  }
}
</style>