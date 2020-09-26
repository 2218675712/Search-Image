<template>
<view @touchstart="handleTouchstart" @touchend="handleTouchend">
  <slot></slot>
</view>
</template>

<script>
export default {
name: "swiperAction",
  data() {
    return {
      startTime: 0,
      startX: 0,
      startY: 0
    }
  },
  methods: {
    handleTouchstart(event) {
      this.startTime = Date.now()
      this.startX = event.changedTouches[0].clientX
      this.startY = event.changedTouches[0].clientY
    },
    handleTouchend(event) {
      const endTime = Date.now()
      const endX = event.changedTouches[0].clientX
      const endY = event.changedTouches[0].clientY
      // 判断按下的时常
      if (endTime - this.startTime > 2000) {
        return
      }
      // 滑动的方向
      let direction = "";
      //先判断用户滑动的距离是否合法合法：判断滑动的方向
      if (Math.abs(endX - this.startX) > 10) {
        direction = endX - this.startX > 0 ? "right" : "left";
      }else {
        return
      }
      this.$emit("swiperAction",{
        direction
      })
    }
  }
}
</script>

<style scoped>

</style>
