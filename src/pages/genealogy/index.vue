<template>

  <view class="main">
    <view v-show="empty && columns.length===0">
      <u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png"
               customStyle="margin:auto;top:0;left:0;right:0;bottom:0;position:absolute;">
        <u-button size="small" type="primary" :style="{marginTop:10+'px'}" text="创建族谱"></u-button>
      </u-empty>
    </view>
    <view v-show="empty===false && columns.length!==0">
      <view class="header">
        <view class="picker">
          <view>
            <u-cell @click="show = true" center isLink size="normal" arrowDirection="down" :icon="genealogy"></u-cell>
          </view>
          <u-picker :show="show" :columns="columns" keyName="Title" closeOnClickOverlay @cancel="cancel"
                    @confirm="confirm" @close="cancel"></u-picker>
        </view>
      </view>
      <view class="content">
        <z-paging ref="paging" :auto-show-back-to-top="true" height="100%" refresher-threshold="0"
                  v-model="indexList" @query="queryList" :default-page-size="8" :fixed="false"
                  :show-console-error="true"
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
              <u-cell icon="setting-fill" size="large" title="家族图谱"></u-cell>
              <u-cell icon="setting-fill" size="large" title="家谱制作"></u-cell>
              <u-cell icon="setting-fill" size="large" title="家族活动"></u-cell>
            </u-cell-group>
          </view>
          <view v-for="(item, index) in indexList" :key="index">
            <u-cell :title="item.Name">
              <template #icon>
                <u-avatar shape="square" size="35" :src="item.Avatar"
                          customStyle="margin: -3px 5px -3px 0"></u-avatar>
              </template>
            </u-cell>
          </view>
        </z-paging>
      </view>
    </view>


  </view>

</template>

<script setup>

import {onLoad, onShow} from "@dcloudio/uni-app";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useMainStore} from "@/store/myapp";
import {debounce} from "@/static/js/debounce";

const indexList = ref([])
let show = ref(false)
let empty = ref(false)
const columns = reactive([])
const genealogy = ref("")
const my = ref("")
const genealogyId = ref(0)
const keyword = ref("")
const searchVal = ref("")
const mainStore = useMainStore()

// v-model绑定的这个变量不要在分页请求结束中自己赋值，直接使用即可
const paging = ref(null)

// // 给搜索事件 绑定 防抖
// 因为 ⭐❗⭐❗防抖函数定义 返回的是一个回调函数, 我们可以用一个变量来接收
const searchInput = debounce(searchEvent, 1200)


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

// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.reload()即可
const queryList = (pageNo, pageSize) => {
  let offset = pageNo * pageSize - pageSize
  uni.request({
    url: mainStore.host + "/genealogy/members",
    method: "POST",
    data: {
      "limit": pageSize,
      "offset": offset,
      "genealogyId": genealogyId.value,
      "name": keyword.value,
    },
    complete: function (res) {
      console.log(res)
      if (res.data.Code === 200) {
        paging.value.complete(res.data.Data.GenealogyMembers);
      } else {
        paging.value.complete(false);
        uni.showToast({
          title: res.data.Msg,
          duration: 2000,
          icon: 'error'
        })

      }

    }
  })

}
onLoad(
    () => {
      uni.request({
        url: mainStore.host + "/genealogy/my",
        method: "POST",
        data: {
          "userId": 1,
        },
        complete: function (res) {
          if (res.data.Code === 200) {
            if (res.data.Data.length > 0) {
              genealogyId.value = res.data.Data[0].ID
              genealogy.value = res.data.Data[0].Title
              columns.push(res.data.Data)
            } else {
              empty.value = true
            }
          } else {
            uni.showToast({
              title: res.data.Msg,
              duration: 2000,
              icon: 'error'
            })
          }

        }
      })

    }
)

function cancel() {
  show.value = false
}

function confirm(e) {
  //console.log('confirm', e);
  show.value = false
}


</script>

<style lang="scss">

.main {
  .header {
    background-color: #f2f2f3;
    display: flex;
    height: 200rpx;

    .picker {
      margin: 100rpx auto;
    }
  }

  .content {
    height: calc(100vh - 114px);

    .wrap {
      background-color: #f2f2f3;
      height: 80rpx;

      .search {
        width: 96%;
        background-color: #f2f2f3;
        margin: auto;
      }
    }

  }
}


</style>
