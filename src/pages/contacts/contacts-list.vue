<template>
    <view class="content">
        <z-paging ref="paging" :fixed="false" auto-show-back-to-top="true"
                  style="height:1000rpx;width:100%;"
                  v-model="dataList" @query="queryList">
            <view class="slider" v-for="(item,index) in dataList">
                <view class="item">
                    <view class="item_content">
                        <image class="image" :src="item.icon"></image>
                        <view class="left">
                            <view class="title">
                                <text>{{ item.title }}</text>
                            </view>
                            <view class="tags">
                                <text v-for="(tag,i) in tags" class="tag">
                                    {{ tag.name }}
                                </text>
                            </view>

                            <view class="people">
                                <image class="people_logo" src="/static/images/default_avatar.png"></image>
                                <text class="people_name" :style="{color:item.subColor}">欧阳山峰</text>
                                <image class="people_total_logo" src="@/static/images/hot.png"></image>
                                <view class="people_total"> {{ count }}</view>
                                <image class="join_logo" src="/static/images/join.png"></image>
                                <text class="join_name" :style="{color:item.subColor}">加入</text>
                            </view>
                        </view>


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
const tags = [{
    name: "标题名称a"
}, {
    name: "标题名称b"
}, {
    name: "标题名称c"
}]
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
  width: 96%;
  background-color: snow;
  margin: auto;
  border-radius: 8px;

  .item {
    margin: 15rpx 0rpx 0rpx 15rpx;

    .item_content {
      display: flex;

      .left {
        .title {
          margin-top: 10rpx;
          font-size: 1.2rem;
        }

        .tags {
          font-size: 14px;
          font-weight: 330;
          color: black;
          display: flex;
          margin-top: 20rpx;

          .tag {
            border-radius: 5px;
            color: rgba(79, 103, 101, 1);
            background: #F6F6F6;

            &:not(:first-of-type) {
              margin-left: 20rpx;
            }
          }
        }


      }

      .image {
        width: 260rpx;
        height: 196rpx;
        margin-top: 10rpx;
        margin-bottom: 10rpx;
        margin-right: 20rpx;
      }


      .people {
        display: flex;
        margin-top: 40rpx;

        .people_logo {
          width: 44rpx;
          height: 44rpx;
          border-radius: 50%;
        }

        .people_name {
          width: auto;
          font-size: 14px;
          margin-left: 10rpx;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .people_total_logo {
          width: 44rpx;
          height: 44rpx;
          margin-left: 40rpx;
        }

        .people_total {
          margin-left: 10rpx;
          margin-top: 10rpx;
          font-size: 14px;
          color: rgba(79, 103, 101, 1);
        }

        .join_logo {
          margin-left: 40rpx;
          width: 48rpx;
          height: 48rpx;
        }

        .join_name {
          margin-left: 10rpx;
          margin-top: 8rpx;
          font-size: 14px;
        }

      }

    }
  }
}

</style>

