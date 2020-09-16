<template>
<view class="recommend_wrap">
  <view class="recommend_item" v-for="item in recommends" :key="item.id">
  <image mode="widthFix" :src="item.thumb"></image>
  </view>
</view>
</template>

<script>
export default {
  name: "home-recommend",
  data() {
    return {
      recommends: []
    }
  },
  mounted() {
    /**
     * 获取首页推荐数据
     */
    this.request({
      url: 'http://157.122.54.189:9088/image/v3/homepage/vertical',
      data: {
        // 获取多少条数据
        limit: 30,
        // 关键字 “hot”
        order: 'hot',
        // 跳过多少条
        skip: 0
      }
    }).then((result) => {
          this.recommends = result.res.homepage[1].items
        })
  }
}
</script>

<style scoped lang="scss">
.recommend_wrap{
  display: flex;
  flex-wrap: wrap;
  .recommend_item{
    width: 50%;
    border: 5rpx solid #fff;
  }
}
</style>
