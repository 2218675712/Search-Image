<template>
  <scroll-view
      class="album_scroll_view"
      scroll-y
      @scrolltolower="handleToLower">
    <view class="album_swiper">
      <swiper autoplay indicator-dots circular>
        <swiper-item v-for="item in banner" :key="item.id">
          <image :src="item.thumb"></image>
        </swiper-item>
      </swiper>
    </view>
    <view class="album_list">
      <view
          class="album_item"
          v-for="item in album"
          :key="item.id">
        <view class="album_img">
          <image :src="item.cover"></image>
        </view>
        <view class="album_info">
          <view class="album_name">{{item.name}}</view>
          <view class="album_desc">{{item.desc}}</view>
          <view class="album_btn">
            <view class="album_attention"> + 关注</view>
          </view>
        </view>
      </view>
    </view>

  </scroll-view>
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
      album: [],
      // 是否还有下一页
      hasMore: true
    }
  },
  methods: {
    /**
     * 获取列表数据
     */
    getList() {
      this.request({
        url: 'http://157.122.54.189:9088/image/v1/wallpaper/album',
        data: this.params
      }).then(result => {
        if (result.res.album.length === 0) {
          this.hasMore = false
          return
        }
        if (this.banner.length === 0) {
          this.banner = result.res.banner
        }
        this.album = [...this.album, ...result.res.album]
      })
    },
    /**
     *加载更多
     */
    handleToLower() {
      if (this.hasMore) {
        this.params.skip += this.params.limit
        this.getList()
      } else {
        uni.showToast({
          title: '没有数据了',
          icon: 'none'
        })
      }
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style scoped lang="scss">
.album_scroll_view {
  height: calc(100vh - 36px);
}

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

.album_list {
  padding: 10rpx;

  .album_item {
    padding: 10rpx 0;
    display: flex;
    border-bottom: 1rpx solid #cccccc;

    .album_img {
      flex: 1;
      padding: 10rpx;

      image {
        width: 200rpx;
        height: 200rpx;
      }
    }

    .album_info {
      flex: 2;
      overflow: hidden;
      padding: 0 10rpx;

      .album_name {
        font-size: 30rpx;
        color: #000000;
        padding: 10rpx 0;
      }

      .album_desc {
        padding: 10rpx 0;
        font-size: 24rpx;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .album_btn {
        padding: 10rpx;
        display: flex;
        justify-content: flex-end;

        .album_attention {
          color: $color;
          border: 1rpx solid $color;
          padding: 10rpx;
        }
      }
    }
  }
}
</style>
