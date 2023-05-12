<template>
    <view class="page_main">

        <view class="page_main_header">
            <uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @blur="blur" @focus="focus"
                            @input="input"
                            @cancel="cancel" @clear="clear" placeholder="搜索家谱名称" cancelButton="none">
            </uni-search-bar>

        </view>
        <view class="more">
            <uni-group mode="card" top="0">
                <!--                <mxio-scroll-x :dataSource="dataSource" :barWidth="barWidth" :colList="11" :column="0"-->
                <!--                               :barShow="barShow"-->
                <!--                               @scrollItemEmitsClick="scrollItemEmitsClick">-->
                <!--                </mxio-scroll-x>-->
                <u-scroll-list @right="right" @left="left">
                    <view class="scroll-list" style="flex-direction: row;">
                        <view class="scroll-list__goods-item" v-for="(item, index) in list" :key="index">
                            <image class="scroll-list__goods-item__image" :src="item.thumb"></image>
                            <text class="scroll-list__goods-item__text">￥{{ item.price }}</text>
                        </view>
                        <!--                        <view class="scroll-list__show-more">-->
                        <!--                            <text class="scroll-list__show-more__text">查看更多</text>-->
                        <!--                            <u-icon name="arrow-leftward" color="#f56c6c" size="12"></u-icon>-->
                        <!--                        </view>-->
                    </view>
                </u-scroll-list>
            </uni-group>
        </view>
        <view>
            <u-image :showLoading="true" :src="src" width="80px" height="80px" @click="click"></u-image>
        </view>


        <!--        <genealogy-list></genealogy-list>-->
    </view>


</template>

<script setup>

import {ref} from 'vue';
//import MxioScrollX from "@/components/mxio-scroll-x/mxio-scroll-x.vue";
import GenealogyList from "../genealogy/genealogy-list.vue";

const searchValue = ""
const barWidth = ref(40);
const barShow = ref(true)

const src = 'https://cdn.uviewui.com/uview/album/1.jpg'

const info = [{
    colorClass: 'uni-bg-red',
    url: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
    content: '内容 A'
},
    {
        colorClass: 'uni-bg-green',
        url: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
        content: '内容 B'
    },
    {
        colorClass: 'uni-bg-blue',
        url: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
        content: '内容 C'
    }
]
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


const scrollItemEmitsClick = (item, index, arr) => {
    console.log(item, index, arr, 1)
}

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
