<template>
  <view class="main">
    <view class="header"></view>
    <view class="content">
      <z-paging ref="paging" auto-show-back-to-top="true" height="100%" refresher-threshold="0"
                v-model="indexList" @query="queryList" :default-page-size="6" :fixed="false" :show-console-error="true"
                :auto-clean-list-when-reload="false">
        <view class="wrap">
          <view class="search">
            <u-search slot="top" placeholder="搜索" v-model.trim="keyword"
                      :show-action="false" shape="square"
                      color="#515151"
                      bgColor="white"
            ></u-search>
          </view>
        </view>
        <view>
          <u-cell-group>
            <u-cell icon="setting-fill" size="large" title="新的成员"></u-cell>
            <u-cell icon="setting-fill" size="large" title="家族管理"></u-cell>
            <u-cell icon="setting-fill" size="large" title="人脉分布"></u-cell>
            <u-cell icon="setting-fill" size="large" title="家谱图"></u-cell>
            <u-cell icon="setting-fill" size="large" title="家谱制作"></u-cell>
            <u-cell icon="setting-fill" size="large" title="历史档案"></u-cell>
            <u-cell icon="setting-fill" size="large" title="文化传承"></u-cell>
            <u-cell icon="setting-fill" size="large" title="论坛"></u-cell>
            <u-cell icon="setting-fill" size="large" title="活动"></u-cell>
          </u-cell-group>
        </view>
        <view class="u-page">
          <u-list>
            <u-list-item v-for="(item, index) in indexList" :key="index">
              <u-cell :title="item.Name">
                <template #icon>
                  <u-avatar shape="square" size="35" :src="item.Avatar"
                            customStyle="margin: -3px 5px -3px 0"></u-avatar>
                </template>
              </u-cell>
            </u-list-item>
          </u-list>
        </view>
      </z-paging>
    </view>


  </view>


</template>

<script setup>

const indexList = ref([])

import {computed, ref, watch} from "vue";
import {useMainStore} from "@/store/myapp";

const keyword = ref("")
const search = ref("")
const mainStore = useMainStore()


// v-model绑定的这个变量不要在分页请求结束中自己赋值，直接使用即可
const paging = ref(null)

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
    url: mainStore.host + "/genealogy/members",
    method: "POST",
    data: {
      "limit": pageSize,
      "offset": offset,
      "genealogyId": 0
    },
    complete: function (res) {
      console.log(res)
      if (res.data.Code === 200) {

        paging.value.complete(res.data.Data.GenealogyMembers);
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

  .content {
    height: calc(100vh - 150px)
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


</style>
