<template>
  <view class="home_category">
    <navigator
        class="cate_item"
        v-for="item in category"
        :key="item.id"
        :url="`/pages/imgCategory/index?id=${item.id}`">
      <image mode="aspectFill" :src="item.cover"></image>
      <view class="cate_name">{{item.name}}</view>
    </navigator>
  </view>
</template>

<script>
export default {
  name: "home-category",
  mounted() {
    this.getList()
  },
  data() {
    return {
      category: []
    }

  },
  methods: {
    /**
     * 获取数据
     */
    getList() {
      this.request({
        url: 'http://157.122.54.189:9088/image/v1/vertical/category',

      }).then(result => {
        this.category = result.res.category
      })
    }
  }
}
</script>

<style scoped lang="scss">
.home_category {
  display: flex;
  flex-wrap: wrap;

  .cate_item {
    width: 33.33%;
    position: relative;
    border: 5rpx solid #ffffff;

    image {
      height: 240rpx;

    }

    .cate_name {
      position: absolute;
      width: 100%;
      height: 50rpx;
      left: 0;
      bottom: 0;
      color: #ffffff;
      font-weight: 300;
      //css3渐变
      background-image: linear-gradient(to right top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
      font-size: 40rpx;
      display: flex;
      align-items: center;
      padding-left: 20rpx;
    }
  }
}
</style>
