<template>
    <div class="now_room">
        <img :src="displayImage" class="room_background">
        <div class="now_room_information">
        <div class="room_number">{{roomNumber}}</div>
        <div class="room_type">{{nowRoom.name}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BackgroundRoom",  
    computed:{
        nowRoom(){
            return this.$store.state.nowRoom;
        },
        roomNumber(){
            const roomList=this.$store.state.items
            const roomIndex = roomList.findIndex(room=>room.id===this.nowRoom.id) +1
            return `${roomIndex>9?"":"0"}${roomIndex}`
        },
        displayImage(){
            const imageUrl=this.nowRoom.imageUrl[1]
            return imageUrl
        }
    },
};
</script>

<style scoped lang="scss">
.now_room {
    position: absolute;
    bottom: 70px;
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
