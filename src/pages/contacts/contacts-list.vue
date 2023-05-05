<template>
    <view class="content">
        <z-paging ref="paging" :fixed="false" auto-show-back-to-top="true"
                  style="height:1000rpx;width:100%;"
                  v-model="dataList" @query="queryList">
            <view class="slider" v-for="(item,index) in dataList">
                <view class="item">
                    <view class="item_content">
                        <image class="image" :src="item.icon"></image>
                        <view class="title">
                            <text>{{ item.title }}</text>
                        </view>
                        <view class="summary">
                            <expandable-text :line="1" expandText="展开" foldText="收起">
                                简介：{{ item.summary }}
                            </expandable-text>
                        </view>
                        <view class="people">
                            <image class="people_logo" src="/static/images/bot.png"></image>
                            <text class="people_name" :style="{color:item.subColor}">姓名</text>
                            <image class="people_total_logo" src="@/static/images/people_total.png"></image>
                            <view class="people_total"> {{ count }}</view>

                        </view>

                        <image class="join" src="/static/images/join.png"></image>
                    </view>
                </view>
            </view>

        </z-paging>
    </view>
</template>

<script setup>
import {ref} from 'vue';
import ExpandableText from "@/components/expandable-text/expandable-text.vue";

const count = 20
const records = [{
    title: '测试数据',
    summary: '小A测试数据测试数据测试数据测试数据测试数据',
    subTitle: '标题名称',
    subColor: '#15639F',
    icon: '/static/images/default.png',
},
    {
        title: '查看详情',
        summary: '小B',
        subTitle: '标题名称',
        subColor: '#07B77B',
        icon: '/static/images/default.png',
    },
    {
        title: '测试数据',
        summary: '小A',
        subTitle: '标题名称',
        subColor: '#15639F',
        icon: '/static/images/default.png',
    },
    {
        title: '测试数据',
        summary: '小A',
        subTitle: '标题名称',
        subColor: '#15639F',
        icon: '/static/images/default.png',
    },
    {
        title: '测试数据',
        summary: '小A',
        subTitle: '标题名称',
        subColor: '#15639F',
        icon: '/static/images/default.png',
    },
    {
        title: '测试数据',
        summary: '小A',
        subTitle: '标题名称',
        subColor: '#15639F',
        icon: '/static/images/default.png',
    },
    {
        title: '测试数据',
        summary: '小A',
        subTitle: '标题名称',
        subColor: '#15639F',
        icon: '/static/images/default.png',
    },
    {
        title: '测试数据',
        summary: '小A',
        subTitle: '标题名称',
        subColor: '#15639F',
        icon: '/static/images/default.png',
    }
]


// v-model绑定的这个变量不要在分页请求结束中自己赋值，直接使用即可

const paging = ref(null)
let dataList = ref([])


// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.reload()即可
const queryList = (pageNo, pageSize) => {
    // // 此处请求仅为演示，请替换为自己项目中的请求
    // request.queryList({pageNo, pageSize}).then(res => {
    //     // 将请求结果通过complete传给z-paging处理，同时也代表请求结束，这一行必须调用
    //     paging.value.complete(res.data.list);
    // })
    console.log(pageNo, pageSize)
    console.log(records)
    setTimeout(() => {

        paging.value.complete(records);
    })
}
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: -20rpx;
  background-color: #F5F5F5;
}


.slider {
  width: 100%;
  background-color: white;

  .item {
    margin: 15rpx 15rpx 15rpx 15rpx;
    height: 125px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;

    .item_content {

      .title {
        width: 300rpx;
        margin: -120px 30rpx 20rpx 300rpx;
        font-size: 1.2rem;
      }

      .summary {
        font-size: 13px;
        color: rgba(79, 103, 101, 1);
        margin: 0 300rpx;
        width: 400rpx;
      }

      .image {
        width: 230rpx;
        height: 196rpx;
        margin: 10rpx 0rpx 22rpx 0rpx;
      }

      .people {
        display: flex;
        margin: 20rpx 0rpx 0rpx 300rpx;

        .people_logo {
          background-color: red;
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
        }

        .people_name {
          width: 40px;
          font-size: 14px;
          margin-left: 4rpx;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .people_total_logo {
          width: 50rpx;
          height: 50rpx;
          margin-left: 40rpx;
        }

        .people_total {
          width: 50rpx;
          height: 50rpx;
          margin-left: 10rpx;
        }
      }

      .join {
        margin: -50rpx 0rpx 0rpx 600rpx;
        width: 40rpx;
        display: flex;
        height: 40rpx;
        font-size: 14px;
      }
    }
  }
}

</style>

