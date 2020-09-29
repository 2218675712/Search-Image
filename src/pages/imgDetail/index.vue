<template>
  <view>
    <!--    用户信息-->
    <view class="user_info">
      <view class="user_icon">
        <image mode="widthFix" :src="imgDetail.user.avatar?imgDetail.user.avatar:'http://img0.adesk.com/download/5dee04f804220801b33bebf7'"></image>
      </view>
      <view class="user_desc">
        <view class="user_name">{{imgDetail.user.name||'未找到用户名'}}</view>
        <view class="user_time">{{imgDetail.cnTime}}</view>
      </view>
    </view>
    <!--    高清大图-->
    <view class="high_img">
      <swiper-action @swiperAction="handleSwiperAction">
        <image mode="widthFix" :src='imgDetail.thumb'></image>
      </swiper-action>
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
    <!--    下载图片-->
    <view class="download">
      <view class="download_btn" @click="handleDownload">下载图片</view>
    </view>
  </view>
</template>

<script>
import moment from "moment";
import SwiperAction from "@/components/swiperAction/swiperAction";

moment.locale("zh-cn");
export default {
  name: 'index',
  components: {SwiperAction},
  data() {
    return {
      // 图片信息对象
      imgDetail: {},
      // 专辑数据数组
      album: [],
      // 最热评论
      hot: [],
      // 最新评论
      comment: [],
      // 图片索引
      imgIndex: 0
    }
  },
  onLoad: function () {
    const {imgIndex} = getApp().globalData
    this.imgIndex = imgIndex
    // 获取资源
    this.getData()

  },
  methods: {
    /*
    * 获取图片列表
    * */
    getData() {
      const {imgList} = getApp().globalData
      this.imgDetail = imgList[this.imgIndex]
      console.log(this.imgDetail)
      // XX年前的数据
      this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow()
      // 获取图片评论
      this.getComments(this.imgDetail.id)
    },
    /**
     * 获取图片评论
     * @param id
     */
    getComments(id) {
      this.request({
        url: `https://service.picasso.adesk.com/v2/wallpaper/wallpaper/${id}/comment`
      }).then(result => {

        // 转换时间
        result.res.hot.forEach(v => v.cnTime = moment(v.atime * 1000).fromNow())
        result.res.comment.forEach(v => v.cnTime = moment(v.atime * 1000).fromNow())

        this.album = result.res.album
        this.hot = result.res.hot
        this.comment = result.res.comment
      })
    },
    /**
     * 滑动事件
     * @param e 判断左滑还是右滑
     */
    handleSwiperAction(e) {
      /*
      * 1用户左滑imgIndex++
      * 2用户右滑imgIndex--
      * 3判断数组是否越界问题！！
      * */
      const {imgList} = getApp().globalData
      if (e.direction === "left" && this.imgIndex < imgList.length - 1) {
        // 可以进行  左滑  加载下一页
        this.imgIndex++
        this.getData()

      } else if (e.direction === "right" && this.imgIndex > 0) {
        // 可以进行  右滑  加载下一页
        this.imgIndex--
        this.getData()
      } else {
        uni.showToast({
          title: "没有数据了",
          icon: "none"
        })
      }
    },
    async handleDownload() {
      uni.showLoading({
        title: "下载中"
      })
      // 将远程文件下载到小程序的内存里面
      const result1 = await uni.downloadFile({
        url: this.imgDetail.img
      })
      const {tempFilePath} = result1[1]
      // 将小程序的临时文件下载到本地上
      const result2 = await uni.saveImageToPhotosAlbum({
        filePath: tempFilePath
      })
      // 提示用户下载成功
      uni.showToast({
        title: "下载成功",
        icon: "none"
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
            display: inline-block;
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

.download {
  height: 120rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  .download_btn {
    width: 90%;
    height: 80%;
    background-color: $color;
    color: #ffffff;
    font-size: 50rpx;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
