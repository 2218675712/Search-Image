<template>
  <view>
    <!--    用户信息-->
    <view class="user_info">
      <view class="user_icon">
        <image mode="widthFix" :src="imgDetail.user.avatar"></image>
      </view>
      <view class="user_desc">
        <view class="user_name">{{imgDetail.user.name}}</view>
        <view class="user_time">{{imgDetail.atime}}</view>
      </view>
    </view>
    <!--    高清大图-->
    <view class="high_img">
      <image mode="widthFix" :src='imgDetail.newThumb'></image>
    </view>
    <!--    点赞-->
    <view class="user_rank">
      <view class="rank">
        <text class="iconfont icondianzan">{{imgDetail.rank}}</text>
      </view>
      <view class="user_collect">
        <text class="iconfont iconshoucang">收藏</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      // 图片信息对象
      imgDetail: {}
    }
  },
  onLoad: function () {
    const {imgList, imgIndex} = getApp().globalData
    this.imgDetail = imgList[imgIndex]
    this.imgDetail.newThumb = this.imgDetail.thumb + this.imgDetail.rule.replace('$<Height>', 375)

  }
}
</script>

<style scoped lang="scss">
.user_info {
  display: flex;
  padding: 20rpx;

  .user_icon {
    padding: 0 20rpx;

    image {
      width: 88rpx;
      border-radius: 50%;
    }
  }

  .user_desc {
    .user_name {
      color: #000000;
      font-weight: 600;
    }

    .user_time {
      color: #cccccc;
      font-size: 24rpx;
      padding: 10rpx 0;
    }
  }
}

.user_rank {
  display: flex;
  height: 80rpx;
  border-bottom: 5rpx solid #eeeeee;
  .rank {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    .iconfont {

    }
  }

  .user_collect {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    .iconfont {

    }
  }
}
</style>
