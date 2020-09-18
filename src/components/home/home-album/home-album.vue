<template>
  <view>
    <view class="album_swiper">
      <swiper autoplay indicator-dots circular>
        <swiper-item v-for="item in banner" :key="item.id">
          <image :src="item.thumb"></image>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
export default {
  name: "home-album",
  data() {
    return {
      params: {
        // 获取多少条数据
        limit: 30,
        // 关键字 “hot”
        order: 'hot',
        // 跳过多少条
        skip: 0
      },
      // 轮播图数组
      banner: [],
      // 列表数组
      album: []
    }
  },
  methods: {
    getList() {
      this.request({
        url: 'http://157.122.54.189:9088/image/v1/wallpaper/album',
        data: this.params
      }).then(result => {
        this.banner = result.res.banner
        this.album = result.res.album
      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style scoped lang="scss">
.album_swiper {
  swiper {
    height: 325rpx;

    swiper-item {
      height: 100%;

      image {
        height: 100%;
      }
    }
  }
}
</style>
