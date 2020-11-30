<template>
    <div class="calender">
    </div>
</template>

<script>
export default ({
    name:'calenderPicker',
})
</script>

<style lang="scss" scoped>
$calender_color:#F7F7F7;
.calender{
    flex: 1 0 100%;
    height: 400px;
    background-color: $calender_color;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.15);
    margin-top: 20px;
    @include RWD($pad){
        margin-top: 40px;
    }
    @include RWD($pad_horizontal){
        margin-top: 0px;
    }
}
</style>