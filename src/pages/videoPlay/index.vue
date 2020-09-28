<template>
  <view class="video_play">
    <image :src="videoObj.img"></image>
    <view class="video_tool">
      <view @click="handleMuted" :class="['iconfont',muted?'iconjingyin':'iconshengyin']"></view>
      <view class="iconfont iconzhuanfa">
        <button open-type="share"></button>
      </view>
    </view>
    <view class="video_wrap">
      <video :src="videoObj.video" objectFit="fill" :muted="muted"></video>
    </view>
    <view class="download">
      <view class="download_btn" @click="handleDownload">下载高清</view>
    </view>
  </view>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      videoObj: {},
      // 是否静音
      muted: false
    }
  },
  onLoad() {
    this.videoObj = getApp().globalData.video
    console.log(this.videoObj)
  },
  methods: {
    /**
     * 开关声音
     */
    handleMuted() {
      this.muted = !this.muted
    },
    async handleDownload() {
      await uni.showLoading({
        title: '下载中'
      })
      // 将远程文件下载到小程序内存中
      const {tempFilePath} = (await uni.downloadFile({url: this.videoObj.video}))[1]
      // 将内存中的文件下载到本地上
      await uni.saveVideoToPhotosAlbum({
        filePath: tempFilePath
      })
      uni.hideLoading()
      uni.showToast({
        title: '下载成功'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.video_play {
  position: relative;

  image {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    //css3滤镜
    filter: blur(20px);
  }

  .video_tool {
    height: 80rpx;
    display: flex;
    justify-content: flex-end;

    .iconfont {
      width: 80rpx;
      //height: 80rpx;
      color: #ffffff;
      font-size: 50rpx;
      border-radius: 40rpx;
      background-color: rgba(0, 0, 0, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20rpx;
    }

    .iconzhuanfa {
      position: relative;

      button {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }

  }

  .video_wrap {
    display: flex;
    justify-content: center;

    video {
      width: 360rpx;
      height: 600rpx;

    }
  }

  .download {
    display: flex;
    justify-content: center;
    margin-top: 30rpx;

    .download_btn {
      width: 360rpx;
      height: 80rpx;
      border-radius: 40rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      border: 2rpx solid #ffffff;
      background-color: rgba(0, 0, 0, .2);
    }
  }
}
</style>
