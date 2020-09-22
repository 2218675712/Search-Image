<template>
  <scroll-view
      scroll-y
      class="recommend_view"
      v-if="recommends.length>0"
      @scrolltolower="handleToLower">
    <!--    推荐-->
    <view class="recommend_wrap">
      <navigator
          class="recommend_item"
          v-for="item in recommends"
          :key="item.id"
      :url="`/pages/album/index?id=${item.target}`">
        <image mode="widthFix" :src="item.thumb"></image>
      </navigator>
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
        <view class="months_item" v-for="(item,index) in months.items" :key="item._id">
          <go-detail :list="months.items" :index="index">
            <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',375)"></image>
          </go-detail>
        </view>
      </view>
      <view class="months_item">

      </view>
    </view>
    <view class="hots_wrap">
      <view class="hots_title">
        <text>热门</text>
      </view>
      <view class="hots_content">
        <view class="hot_item" v-for="(item,index) in hots" :key="item.id">
          <go-detail :list="hots" :index="index">
          <image mode="widthFix" :src="item.thumb"></image>
          </go-detail>
        </view>
      </view>
    </view>
  </scroll-view>

</template>

<script>

import moment from "moment";
import GoDetail from "@/components/home/goDetail/goDetail";

export default {
  name: "home-recommend",
  components: {GoDetail},
  data() {
    return {
      recommends: [],
      months: [],
      hots: [],
      params: {
        // 获取多少条数据
        limit: 30,
        // 关键字 “hot”
        order: 'hot',
        // 跳过多少条
        skip: 0
      },
      // 是否还有下一页
      hasMore: true
    }
  },
  mounted() {
    /**
     * 获取接口数据
     */
    this.getList()

  },
  methods: {

    getList() {
      /**
       * 获取首页推荐数据
       */
      this.request({
        url: 'http://157.122.54.189:9088/image/v3/homepage/vertical',
        data: this.params
      }).then((result) => {
        if (result.res.vertical.length === 0) {
          this.hasMore = false
          return
        }
        if (this.recommends.length === 0) {
          // 第一次发送请求
          // 推荐模块
          this.recommends = result.res.homepage[1].items
          // 月份模块
          this.months = result.res.homepage[2]
          /*
          * 引入moment.js
          * 将时间戳转换为时间
          * */
          this.months.MM = moment(this.months.stime).format("MM")
          this.months.DD = moment(this.months.stime).format("DD")
        }

        // 热门数据 数组拼接es6
        this.hots = [...this.hots, ...result.res.vertical]
      })
    },
    /**
     * 加载更多推荐数据
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
  }
}
</script>

<style scoped lang="scss">
.recommend_view {
  height: calc(100vh - 36px);
}

.recommend_wrap {
  display: flex;
  flex-wrap: wrap;

  .recommend_item {
    width: 50%;
    border: 5rpx solid #fff;
  }
}

.months_wrap {
  .months_title {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;

    .months_title_info {
      color: $color;
      font-size: 30rpx;
      font-weight: 600;
      display: flex;

      .months_info {
        text {
          font-size: 36rpx;
        }
      }

      .months_text {
        font-size: 34rpx;
        margin-left: 30rpx;
        color: #666;
        font-weight: 600;
      }
    }

    .months_title_more {
      margin-top: 6rpx;
      font-size: 24rpx;
      color: $color;
    }
  }

  .months_content {
    display: flex;
    flex-wrap: wrap;

    .months_item {
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
}

.hots_wrap {
  .hots_title {
    padding: 20rpx;

    text {
      border-left: 15rpx solid $color;
      padding-left: 20rpx;
      font-size: 34rpx;
      font-weight: 600;
    }
  }

  .hots_content {
    display: flex;
    flex-wrap: wrap;

    .hot_item {
      width: 33.33%;
      border: 5rpx solid #fff;

      image {

      }
    }
  }
}


</style>
