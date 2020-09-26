<template>
  <view>
    <!--    用户信息-->
    <view class="user_info">
      <view class="user_icon">
        <image mode="widthFix" :src="imgDetail.user.avatar"></image>
      </view>
      <view class="user_desc">
        <view class="user_name">{{imgDetail.user.name}}</view>
        <view class="user_time">{{imgDetail.cnTime}}</view>
      </view>
    </view>
    <!--    高清大图-->
    <view class="high_img">
      <image mode="widthFix" :src='imgDetail.thumb'></image>
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
    <!--    专辑-->
    <view class="album_wrap" v-if="album.length">
      <view class="album_title"></view>
      <view class="album_list">
        <view class="album_item" v-for="item in album" :key="item.id">
          <view class="album_cover">
            <image :src="item.cover" mode="aspectFill"></image>
          </view>
          <view class="album_info">
            <view class="album_info_text">专辑</view>
            <view class="album_info_name">{{item.name}}</view>
            <text class="iconfont iconiconfontjiantou4"></text>
          </view>
        </view>
      </view>
    </view>
    <!--    最热评论-->
    <view class="comment hot" v-if="hot.length">
      <view class="comment_title">
        <text class="iconfont iconhot1"></text>
        <text class="comment_text">最热评论</text>
      </view>
      <view class="comment_list">
        <view class="comment_item" v-for="item in hot" :key="item.id">
          <view class="comment_user">
            <view class="user_icon">
              <image :src="item.user.avatar" mode="widthFix"></image>
            </view>
            <view class="user_name">
              <view class="user_nickname">
                {{item.user.name}}
              </view>
              <view class="user_time">
                {{item.cnTime }}
              </view>
            </view>
            <view class="user_badge">
              <image
                  v-for="item2 in item.user.title"
                  :key="item2.icon"
                  :src="item2.icon"></image>
            </view>

          </view>
          <view class="comment_desc">
            <view class="comment_content">{{item.content}}</view>
            <view class="comment_like">
              <text class="iconfont icondianzan">{{item.size}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!--    最新评论-->
    <view class="comment new" v-if="comment.length">
      <view class="comment_title">
        <text class="iconfont iconpinglun"></text>
        <text class="comment_text">最新评论</text>
      </view>
      <view class="comment_list">
        <view class="comment_item" v-for="item in comment" :key="item.id">
          <view class="comment_user">
            <view class="user_icon">
              <image :src="item.user.avatar" mode="widthFix"></image>
            </view>
            <view class="user_name">
              <view class="user_nickname">
                {{item.user.name}}
              </view>
              <view class="user_time">
                {{item.cnTime}}
              </view>
            </view>
            <view class="user_badge">
              <image
                  v-for="item2 in item.user.title"
                  :key="item2.icon"
                  :src="item2.icon"></image>
            </view>

          </view>
          <view class="comment_desc">
            <view class="comment_content">{{item.content}}</view>
            <view class="comment_like">
              <text class="iconfont icondianzan">{{item.size}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import moment from "moment";

moment.locale("zh-cn");
export default {
  name: 'index',
  data() {
    return {
      // 图片信息对象
      imgDetail: {},
      // 专辑数据数组
      album: [],
      // 最热评论
      hot: [],
      // 最新评论
      comment: []
    }
  },
  onLoad: function () {
    const {imgList, imgIndex} = getApp().globalData
    this.imgDetail = imgList[imgIndex]
    // XX年前的数据
    this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow()
    // 获取图片评论
    this.getComments(this.imgDetail.id)
    console.log(this.imgDetail.id)
  },
  methods: {
    /**
     * 获取图片评论
     * @param id
     */
    getComments(id) {
      this.request({
        url: `https://service.picasso.adesk.com/v2/wallpaper/wallpaper/5a13d879e7bce743777223e4/comment`
      }).then(result => {

        // 转换时间
        result.res.hot.forEach(v => v.cnTime = moment(v.atime * 1000).fromNow())
        result.res.comment.forEach(v => v.cnTime = moment(v.atime * 1000).fromNow())

        this.album = result.res.album
        this.hot = result.res.hot
        this.comment = result.res.comment
      })
    }
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

.album_wrap {
  padding: 20rpx;

  .album_title {
    padding: 10rpx 0;
  }

  .album_list {

    .album_item {
      display: flex;
      padding: 10rpx 0;
      border-bottom: 10rpx solid #eeeeee;

      .album_cover {
        flex: 1;

        image {
          width: 180rpx;
          height: 180rpx;
        }
      }

      .album_info {
        flex: 3;
        padding-left: 20rpx;
        position: relative;

        .album_info_text {
          width: 100rpx;
          height: 50rpx;
          background-color: $color;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .album_info_name {
          padding: 10rpx 0;
          color: #888888;
        }

        .iconfont {
          font-size: 40rpx;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 10%;
          color: #000000;
        }
      }
    }
  }
}

.comment {
  .comment_title {
    padding: 15rpx;

    .iconhot1 {
      color: red;
      font-size: 40rpx;
    }

    .iconpinglun {
      color: aqua;
      font-size: 40rpx;
    }

    .comment_text {
      font-weight: 600;
      font-size: 28rpx;
      color: #666666;
      margin-left: 10rpx;
    }
  }

  .comment_list {
    .comment_item {
      border-bottom: 15rpx solid #eeeeee;

      .comment_user {
        display: flex;
        padding: 20rpx 0;

        .user_icon {
          width: 15%;
          display: flex;
          justify-content: center;
          align-items: center;

          image {
            width: 90%;
          }
        }

        .user_name {
          flex: 1;

          .user_nickname {
            color: #777777;
          }

          .user_time {
            color: #cccccc;
            font-size: 24rpx;
            padding: 5rpx 0;
          }
        }

        .user_badge {
          image {
            width: 40rpx;
            height: 40rpx;
          }
        }

      }

      .comment_desc {
        display: flex;
        padding: 30rpx 0;

        .comment_content {
          flex: 1;
          padding-left: 15%;
          color: #000000;
        }

        .comment_like {
          text-align: right;

          .iconfont {


          }
        }
      }
    }
  }
}

.high_img {
  image {
    border-bottom: 1px solid #eeeeee;
  }
}
</style>
