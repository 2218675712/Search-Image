<template>
  <scroll-view scroll-y enable-flex class="video_main" @scrolltolower="handleScrolltolower">
    <view class="video_item" v-for="item in videowp" :key="item.id" @click="handleGoVideo(item)">
      <image mode="widthFix" :src="item.img"></image>
    </view>
  </scroll-view>
</template>

<script>
export default {
  name: "video-main",
  props: {
    urlobj: Object
  },
  mounted() {
    this.getList()
  },
  watch: {
    urlobj() {
      this.videowp=[]

      this.getList()
    }
  },
  data() {
    return {
      videowp: [],
      hasMore: true
    }
  },
  methods: {
    getList() {
      this.request({
        url: this.urlobj.url,
        data: this.urlobj.params
      }).then(result => {
        if (result.res.videowp.length === 0) {
          this.hasMore = false
          uni.showToast({
            title: '没有更多数据了',
            icon: 'none'
          })
          return
        }
        this.videowp = [...this.videowp, ...result.res.videowp]
      })
    },
    /**
     * 下拉加载更多
     */
    handleScrolltolower() {
      if (this.hasMore) {
        this.urlobj.params.skip += this.urlobj.params.limit
        this.getList()
      } else {
        uni.showToast({
          title: '没有更多数据了',
          icon: 'none'
        })
      }
    },
    handleGoVideo(item){
      getApp().globalData.video=item
      uni.navigateTo({
        url:'/pages/videoPlay/index'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.video_main {
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 36px);

  .video_item {
    width: 33.33%;
    border: 5rpx solid #ffffff;

    image {

    }

  }
}
</style>
