<template>
    <view class="page_main">

        <view class="page_main_header">
            <!--            <uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @blur="blur" @focus="focus"-->
            <!--                            @input="input"-->
            <!--                            @cancel="cancel" @clear="clear" placeholder="搜索家谱名称" cancelButton="none">-->
            <!--            </uni-search-bar>-->
            <u-search placeholder="搜索家谱名称" v-model="params.keyword" :show-action="false"
                      customStyle="width:90%;margin:0 auto;" ></u-search>
        </view>
        <view class="more">
            <uni-group mode="card" top="0">
                <u-scroll-list @right="right" @left="left">
                    <view class="scroll-list" style="flex-direction: row;">
                        <view class="scroll-list__goods-item" v-for="(item, index) in list" :key="index">
                            <image class="scroll-list__goods-item__image" :src="item.thumb"></image>
                            <text class="scroll-list__goods-item__text">￥{{ item.price }}</text>
                        </view>
                    </view>
                </u-scroll-list>
            </uni-group>
        </view>

        <genealogy-list :keyword="params.keyword"></genealogy-list>
    </view>


</template>

<script setup>

import {ref, watch} from 'vue';
import UniGroup from "@dcloudio/uni-ui/lib/uni-group/uni-group.vue";
import UniSearchBar from "@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue";
import GenealogyList from "../genealogy/genealogy-list.vue";

const params = ref({
    keyword: ""
})
const queryListRef = ref()
const queryListHandler = () => {
    queryListRef.value.reload(params.value.keyword)
}

const current = 1
const list = [{
    price: '230.5',
    thumb: 'https://cdn.uviewui.com/uview/goods/1.jpg'
}, {
    price: '74.1',
    thumb: 'https://cdn.uviewui.com/uview/goods/2.jpg'
}, {
    price: '8457',
    thumb: 'https://cdn.uviewui.com/uview/goods/6.jpg'
}, {
    price: '1442',
    thumb: 'https://cdn.uviewui.com/uview/goods/5.jpg'
}, {
    price: '541',
    thumb: 'https://cdn.uviewui.com/uview/goods/2.jpg'
}, {
    price: '234',
    thumb: 'https://cdn.uviewui.com/uview/goods/3.jpg'
}, {
    price: '562',
    thumb: 'https://cdn.uviewui.com/uview/goods/4.jpg'
}, {
    price: '251.5',
    thumb: 'https://cdn.uviewui.com/uview/goods/1.jpg'
}]

function left() {
    console.log('left');
}

function right() {
    console.log('right');
}

const styles = {
    color: '#999',
    backgroundColor: '#FFFFFF',
    disableColor: '#e5e5e5',
    borderColor: '#e5e5e5',
}

</script>

<style lang="scss">

@function realSize($args) {
  @return calc($args / 1.5);
}

.uni-easyinput__content {
  border-radius: 40px !important;
}

.uni-easyinput__content-input {
  font-size: 18px !important;
}

.page_main {
  width: 100%;
}

.page_main_header {
  padding-top: realSize(120px);
  //background-color: #37C2BC;
  width: 100%;
  height: realSize(165rpx);
  background: #33b3ad;

  .search {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: realSize(30px);

  }
}

.more {
  background-image: linear-gradient(to bottom, rgba(51, 179, 173, 1), rgba(51, 179, 173, 0));
}

.scroll-list {
  @include flex(column);

  &__goods-item {
    &:not(:last-of-type) {
      margin-right: 20px;
    }

    &__image {
      width: 60px;
      height: 60px;
      border-radius: 4px;
    }

    &__text {
      color: #f56c6c;
      text-align: center;
      font-size: 12px;
      margin-top: 5px;
    }
  }

}

</style>
