<template>
    <view class="page_main">

        <view class="page_main_header">
            <view class="header">
                <UniEasyinput :styles="styles" v-model="value" trim="true" primaryColor="#FFFFFF"
                               prefixIcon="search" placeholder="搜索家谱、个人"
                               placeholder-style="color:#cdcdcd;font-size:30rpx;font-weight:300;"></UniEasyinput>

            </view>
            <view class="page_content">
                <view class="menu">
                    <mxio-scroll-x :dataSource="dataSource" :barWidth="barWidth" :colList="11" :column="0"
                                   :barShow="barShow"
                                   @scrollItemEmitsClick="scrollItemEmitsClick">
                    </mxio-scroll-x>
                </view>
            </view>
        </view>
        <ContactsList></ContactsList>
    </view>


</template>

<script lang="ts" setup>

import {ref} from 'vue';
import MxioScrollX from "@/components/mxio-scroll-x/mxio-scroll-x.vue";
import ContactsList from "@/pages/contacts/contacts-list.vue";
import UniEasyinput from "@/components/uni-easyinput/uni-easyinput.vue";


const barWidth = ref(40);
const barShow = ref(true)
const dataSource = [{
    label: '超市',
    icon: '/static/images/tab/more.png',
    color: '',
}, {
    label: '水果蔬菜',
    icon: '/static/images/tab/more.png',
    color: '',
}, {
    label: '家用商船',
    icon: '/static/images/tab/more.png',
    color: '',
}, {
    label: '酒水',
    icon: '/static/images/tab/more.png',
    color: '',
}, {
    label: '瓜果蔬菜',
    icon: '/static/images/tab/more.png',
    color: '',
}, {
    label: '天天转特比',
    icon: '/static/images/tab/more.png',
    color: '',
}, {
    label: '小鸡送好礼',
    icon: '/static/images/tab/more.png',
    color: '',
}, {
    label: '消除应现金',
    icon: '/static/images/tab/more.png',
    color: '',
}, {
    label: '砍价0元拿',
    icon: '/static/images/tab/more.png',
    color: '',
}, {
    label: '中关村中关村',
    icon: '/static/images/tab/more.png',
    color: '',
}, {
    label: '江山明月',
    icon: '/static/images/tab/more.png',
    color: '',
}]

const scrollItemEmitsClick = (item: object, index: number, arr: object[]) => {
    console.log(item, index, arr, 1)
}

const styles = {
    color: '#999',
    backgroundColor: '#FFFFFF',
    disableColor: '#e5e5e5',
    borderColor: '#e5e5e5',
}

</script>

<style lang="scss" scoped>
@function realSize($args) {
  @return calc($args / 1.5);
}

.page_main {
  width: 100%;
}

.page_main_header {
  padding-top: realSize(120px);
  //background-color: #37C2BC;
  width: 100%;
  height: realSize(535rpx);
  background-image: linear-gradient(to bottom, rgba(51, 179, 174, 1), rgba(76, 204, 199, 0));

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: realSize(30px);
  }
}


.page_content {
  width: 100%;
  margin-top: -10px;

  .menu {
    margin-left: 10px;
    margin-right: 10px;
    padding-left: 10px;
    padding-right: 10px;
    height: realSize(176px);
    background: white;
    box-shadow: 0 10px 10px 0 rgba(0, 161, 124, 0.1);
    border-radius: 10px;
    overflow: hidden;
    white-space: nowrap;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;

    .item {
      display: inline-block;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      padding-top: 20rpx;

      .img_view {
        border-radius: 30px;
        align-items: center;
        justify-content: center;

        .image {
          width: 30px;
          height: 30px;
          padding-left: 30rpx;
        }
      }
    }
  }
}

</style>
