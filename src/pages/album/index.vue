<template>
  <view>
    <view class="album_bg">
      <image :src="album.cover"></image>
      <view class="album_info">
        <view class="album_name">{{album.name}}</view>
        <view class="album_btn">关注专辑</view>
      </view>
    </view>
    <view class="album_author">
      <view class="album_author_info">
        <image mode="widthFix" :src="album.user.avatar"></image>
        <view class="author_name">{{album.user.name}}</view>
      </view>
      <view class="album_author_desc">
        <text>{{album.desc}}</text>
      </view>
    </view>
    <view class="album_list">
      <view class="album_item" v-for="item in wallpaper" :key="item.id">
        <image mode="widthFix" :src="item.thumb+item.rule.replace('$<Height>',375)"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      params: {
        limit: 30,
        order: 'new',
        skip: 0,
        first: 1
      },
      id: -1,
      album: {},
      wallpaper: [],
      hasMore: true
    }
  },
  onLoad(options) {
    this.id = options.id
    this.getList()
  },
  onReachBottom() {
    if (this.hasMore) {
      this.params.first = 0
      this.params.skip += this.params.limit
      this.getList()
    } else {
      uni.showToast({
        title: '没有更多数据了',
        icon: 'none'
      })
    }
  },
  methods: {
    /**
     * 获取数据
     */
    getList() {
      this.request({
        url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
        data: this.params
      }).then(result => {
        if (JSON.stringify(this.album) === '{}') {
          this.album = result.res.album
        }
        if (result.res.wallpaper.length === 0) {
          this.hasMore = false
          return
        }
        this.wallpaper = [...this.wallpaper, ...result.res.wallpaper]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.album_bg {
  position: relative;

  image {
  }

  .album_info {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    height: 80rpx;
    align-items: center;
    color: #fff;
    padding: 0 20rpx;

    .album_name {
      font-size: 40rpx;
    }

    .album_btn {
      background-color: $color;
      width: 152rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10rpx;
    }
  }
}

.album_author {
  padding: 10rpx;

  .album_author_info {
    display: flex;
    padding: 10rpx 0;

    image {
      width: 50rpx;
    }

    .author_name {
      color: #000000;
      margin-left: 15rpx;
    }
  }

  .album_author_desc {

  }
}

.album_list {
  display: flex;
  flex-wrap: wrap;

  .album_item {
    width: 33.33%;
    border: 3rpx solid #fff;

    image {

    }
  }
}
</style>
