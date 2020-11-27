<template>
    <div class="amenities">
        <div
        v-for="(item,index) in listArray"
        :key="index"
        class="services"
        :class="{no_offer:!item.isOffer}"
        >
        <span class="icon"><i class="fas fa-wifi"></i></span>
        <span class="item_name">{{item.name}}</span>
        
        </div>
    </div>
</template>

<script>
export default ({
    name:'amenities',
    props:{
        list:Object,
    },
    computed:{
        listArray(){
            const keys = Object.keys(this.list);
            const value = Object.values(this.list);
            const list = keys.map((name,index)=>{
                const isOffer = value[index]
                return {name,isOffer}
            })
            return list
        }
    }
})
</script>

<style lang="scss" scoped>
$board_color:#F0F0F0;
$no_offer_color:#6D7278;
.amenities{
    margin-top: 40px;
    padding: 30px 0 0 25px;
    background-color: $board_color;
    display: flex;
    flex-wrap: wrap;

    .services{
        flex: 1 1 30%;
        font-size: 12px;
        margin-bottom: 30px;
        .icon{
            margin-right:20px;
        }
        &.no_offer{
            color: $no_offer_color;
        }

    }
}
</style>