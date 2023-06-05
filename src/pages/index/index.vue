<template>
  <view class="main">
    <view class="header"></view>
    <view class="content">
      <z-paging ref="paging" auto-show-back-to-top="true" height="100%" refresher-threshold="0"
                v-model="dataList" @query="queryList" :default-page-size="6" :fixed="false" :show-console-error="true"
                :auto-clean-list-when-reload="false">
        <view class="wrap">
          <view class="search">
            <u-search placeholder="搜索" v-model.trim="keyword"
                      :show-action="false" shape="square"
                      color="#515151"
                      bgColor="white"
            ></u-search>
          </view>
        </view>
        <view class="slider" v-for="(item,index) in dataList">
          <u-cell-group>

            <view class="item">
              <view class="left">
                <u-image :showLoading="true" :src="item.Cover" width="108px"
                         height="130px"></u-image>
              </view>
              <view class="right">
                <view class="wrap-title">
                  <view class="title">
                    <u-text :text="`${item.Title}`" size="18"></u-text>
                  </view>
                  <view class="join">
                    <u-button text="申请加入"
                              color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
                              size="mini"></u-button>
                  </view>
                </view>

                <view class="tags">
                  <view v-for="(tag,i) in item.Tags" class="tag-item" :key="i">
                    <u-tag v-if="i===0" :text="`${textSigh(tag)}`" size="mini"></u-tag>
                    <u-tag v-if="i===1" :text="`${textSigh(tag)}`" type="warning"
                           size="mini"></u-tag>
                    <u-tag v-if="i===2" :text="`${textSigh(tag)}`" type="success"
                           size="mini"></u-tag>
                    <u-tag v-if="i===3" :text="`${textSigh(tag)}`" type="error"
                           size="mini"></u-tag>
                  </view>
                </view>


                <view class="show">

                  <u-icon name="account-fill" color="#2979ff" size="24"></u-icon>
                  <u-badge numberType="limit" :inverted="true" :value="`${count}`"
                           customStyle="font-size:16px;margin-right:16rpx"></u-badge>
                  <u-icon name="star-fill" color="#2979ff" size="20"></u-icon>
                  <u-badge numberType="limit" :inverted="true" :value="`${count}`"
                           customStyle="font-size:16px;margin-right:16rpx"
                           type="primary"></u-badge>
                  <u-icon name="heart-fill" color="#2979ff" size="20"></u-icon>
                  <u-badge numberType="limit" :inverted="true" :value="`${count}`"
                           customStyle="font-size:16px;margin-right:16rpx"
                           type="primary"></u-badge>

                </view>
                <view class="avatar">
                  <u-avatar :src="'https://cdn.uviewui.com/uview/album/1.jpg'"
                            size="20"></u-avatar>
                  <u-text type="primary" mode="name" format="encrypt" :lines="1"
                          customStyle="font-size:14px;margin-left:12rpx"
                          text="十年青春"></u-text>
                </view>
              </view>
            </view>
          </u-cell-group>

        </view>

      </z-paging>


    </view>

  </view>


</template>

<script setup>

import {computed, ref, watch} from "vue";
import {useMainStore} from "@/store/myapp";

const keyword = ref("")
const search = ref("")
const mainStore = useMainStore()

const count = 21345

// v-model绑定的这个变量不要在分页请求结束中自己赋值，直接使用即可
const paging = ref(null)
let dataList = ref([])

// // 给搜索事件 绑定 防抖
// 因为 ⭐❗⭐❗防抖函数定义 返回的是一个回调函数, 我们可以用一个变量来接收
const searchInput = debounce(searchEvent, 1200)

const searchVal = ref("")
watch(keyword, () => {
  let len = keyword.value.length
  if (len === 0 || len > 1) {
    if (searchVal.value === keyword.value) {
      return
    }
    searchInput()
  }

})

//搜索事件
function searchEvent() {
  paging.value.reload(true)
  searchVal.value = keyword.value
}

// 防抖函数
function debounce(foo, delay) {
  let timer;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      // 暂时理解不了（this，arguments）指向改变的问题
      foo.call(this, arguments)
      // 不输入延迟 则默认 1000 ms
    }, delay || 1000)
  }
}

// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.reload()即可
const queryList = (pageNo, pageSize) => {
  let offset = pageNo * pageSize - pageSize
  uni.request({
    url: mainStore.host + "/genealogy/assemble",
    method: "POST",
    data: {
      "limit": pageSize,
      "offset": offset,
      "title": keyword.value
    },
    complete: function (res) {
      console.log(res)
      if (res.data.Code === 200) {

        paging.value.complete(res.data.Data.Genealogies);
      } else {
        paging.value.complete(false);
      }

    }
  })

}
const reload = (searchVal) => {
  search.value = searchVal
  setTimeout(() => {
    paging.value.reload(true)
  }, 300)

}


const textSigh = computed(() => {
  // value是计算属性执行后，再次执行return里面的函数时传的参数
  return (value) => {
    if (!value) return '';
    if (value.length > 5) {
      return value.slice(0, 5) + '...'
    }
    return value
  }
})

</script>

<style lang="scss">

.main {
  .header {
    background-color: #f2f2f3;
    height: 200rpx;
  }

  .wrap {
    background-color: #f2f2f3;
    height: 80rpx;

    .search {
      // display: flex;
      width: 96%;
      background-color: #f2f2f3;
      margin: auto;
    }
  }

}

.content {
  height: calc(100vh - 150px)
}


.slider {

  .item {
    margin: 10rpx 10rpx;
    display: flex;

    .left {

    }

    .right {
      display: flex;
      flex-direction: column;
      margin-left: 20rpx;
      width: 100%;

      .wrap-title {
        display: flex;
        flex-direction: row;
      }

      .join {

        margin-left: auto;
      }

      .title {
        margin-top: 10rpx;
        font-size: 1.2rem;
      }

      .tags {
        display: flex;
        flex-direction: row;
        margin-top: 14rpx;

        .tag-item {
          margin-right: 10px;
          width: auto;

        }

      }

      .show {
        display: flex;
        flex-direction: row;
        margin-top: 14rpx;
        align-items: center;
      }

      .avatar {
        display: flex;
        flex-direction: row;
        margin-top: 14rpx;
      }
    }
  }
}

</style>
