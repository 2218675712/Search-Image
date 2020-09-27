<template>
    <view>
      <view class="category_tab">
        <view class="category_tab_title">
          <view class="title_inner">
            <uni-segmented-control
                :current="current"
                :values="items.map(v=>v.title)"
                @clickItem="onClickItem"
                style-type="text"
                active-color="#d4237a"></uni-segmented-control>
          </view>
          <view class="iconfont iconsearch"></view>
        </view>
      </view>
      <view class="category_tab_content">
        <view class="cate_item" v-for="item in vertical" :key="item.id">
          <image :src="item.thumb" mode="widthFix"></image>
        </view>
      </view>
    </view>
</template>

<script>
import {uniSegmentedControl} from '@dcloudio/uni-ui';

export default {
  name: "index",
  components: {
    uniSegmentedControl
  },
  data() {
    return {
      items: [
        {
          title: '最新',
          order: 'new'
        },
        {
          title: '热门',
          order: 'hot'
        }
      ],
      current: 0,
      params: {
        limit: 30,
        skip: 0,
        order: 'new'
      },
      id: 0,
      // 页面显示的数组
      vertical: []
    }
  },
  onLoad(options) {
    this.id = options.id
    this.getList()
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
      // 设置页面标题
      uni.setNavigationBarTitle({
        title: this.items[this.current].title
      })

      this.params.order = this.items[this.current].order

      this.getList()
    },
    getList() {
      this.request({
        url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
        data: this.params
      }).then((result) => {
        this.vertical = result.res.vertical
      })
    }
  }
}
</script>

<style scoped lang="scss">
.category_tab {
  .category_tab_title {
    position: relative;

    .title_inner {
      width: 60%;
      margin: 0 auto;
    }

    .iconsearch {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 5%;
    }

  }

}
.category_tab_content {
  display: flex;
  flex-wrap: wrap;

  .cate_item {
    width: 33.33%;
    border: 5rpx solid #ffffff;
    image {
    }
  }
}
</style>
