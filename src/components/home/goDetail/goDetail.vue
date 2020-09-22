<template>
  <view @click="handleClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: "goDetail",
  props: {
    list: Array,
    index: Number
  },
  methods: {
    handleClick() {
      // 将数据缓存下拉
      getApp().globalData.imgList = this.list
      getApp().globalData.imgIndex = this.index
      // 在实现跳转页面
      uni.navigateTo({
        url:'/pages/imgDetail/index'
      })
    }
  }
}
</script>

<style scoped>

</style>
