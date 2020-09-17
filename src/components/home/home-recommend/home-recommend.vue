<template>
  <view v-if="recommends.length>0">
    <!--    推荐-->
    <view class="recommend_wrap">
      <view class="recommend_item" v-for="item in recommends" :key="item.id">
        <image mode="widthFix" :src="item.thumb"></image>
      </view>
    </view>
    <!--    月份-->
    <view class="months_wrap">
      <view class="months_title">
        <view class="months_title_info">
          <view class="months_info">
            <text> {{months.DD}} /</text>
            {{months.MM}}月
          </view>
          <view class="months_text">
            {{months.title}}
          </view>
        </view>
        <view class="months_title_more">
          更多>
        </view>
      </view>
      <view class="months_content">
        <view class="months_item" v-for="item in months.items">
          <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',375)"></image>
        </view>
      </view>
      <view class="months_item">

      </view>
    </view>
  </view>

</template>

<script>

import moment from "moment";

export default {
  name: "home-recommend",
  data() {
    return {
      recommends: [],
      months: []
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
      // 推荐模块
      this.recommends = result.res.homepage[1].items
      // 月份模块
      this.months = result.res.homepage[2]
      console.log(this.months)
      /*
      * 引入moment.js
      * 将时间戳转换为时间
      * */
      this.months.MM = moment(this.months.stime).format("MM")
      this.months.DD = moment(this.months.stime).format("DD")
    })
  }
}
</script>

<style scoped lang="scss">
.recommend_wrap {
  display: flex;
  flex-wrap: wrap;

  .recommend_item {
    width: 50%;
    border: 5 rpx solid #fff;
  }
}

.months_wrap {
  .months_title {
    display: flex;
    justify-content: space-between;
    padding: 20 rpx;

    .months_title_info {
      color: $color;
      font-size: 30 rpx;
      font-weight: 600;
      display: flex;

      .months_info {
        text {
          font-size: 36 rpx;
        }
      }

      .months_text {
        font-size: 34 rpx;
        margin-left: 30 rpx;
        color: #666;
        font-weight: 600;
      }
    }

    .months_title_more {
      margin-top: 6 rpx;
      font-size: 24 rpx;
      color: $color;
    }
  }

  .months_content {
    display: flex;
    flex-wrap: wrap;

    .months_item {
      width: 33.33%;
      border: 5 rpx solid #fff;
    }
  }

  .months_item {

  }
}
</style>
