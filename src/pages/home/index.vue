<template>
  <view>
    <view class="home_tab">
      <view class="home_tab_title">
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
    <view class="home_tab_content">
      <view v-show="current === 0">
        <home-recommend></home-recommend>
      </view>
      <view v-show="current === 1">
        <home-category></home-category>
      </view>
      <view v-show="current === 2">
        <home-new></home-new>
      </view>
      <view v-show="current === 3">
        <home-album></home-album>
      </view>
    </view>
  </view>
</template>

<script>
import {uniSegmentedControl} from '@dcloudio/uni-ui';
import HomeRecommend from "@/components/home/home-recommend/home-recommend";
import HomeCategory from "@/components/home/home-category/home-category";
import HomeNew from "@/components/home/home-new/home-new";
import HomeAlbum from "@/components/home/home-album/home-album";

export default {
  name: "index",
  components: {
    HomeAlbum,
    HomeNew,
    HomeCategory,
    HomeRecommend,
    uniSegmentedControl
  },
  data() {
    return {
      items: [
        {title: '推荐'},
        {title: '分类'},
        {title: '最新'},
        {title: '专辑'}
      ],
      current: 0
    }
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
      // 设置页面标题
      uni.setNavigationBarTitle({
        title:this.items[this.current].title
      })
    }
  }
}
</script>

<style scoped lang="scss">
.home_tab {
  .home_tab_title {
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

  .home_tab_content {

  }
}
</style>
