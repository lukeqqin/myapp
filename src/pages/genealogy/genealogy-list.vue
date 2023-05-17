<template>
    <view class="content">
        <z-paging ref="paging" :fixed="false" auto-show-back-to-top="true"
                  style="height:1000rpx;width:100%;"
                  v-model="dataList" @query="queryList" :default-page-size="5">
            <view class="slider" v-for="(item,index) in dataList">
                <view class="item">
                    <view class="left">
                        <u-image :custom-style="styles" :showLoading="true" :src="item.Cover" width="80px"
                                 height="100px"></u-image>
                    </view>
                    <view class="right">
                        <view class="title">
                            <text>{{ item.Title }}</text>
                        </view>

                        <view class="tags">
                            <view v-for="(tag,i) in item.Tags" class="tag-item" :key="i">
                                <u-tag v-if="i===0" :text="`${textSigh(tag)}`" size="mini"></u-tag>
                                <u-tag v-if="i===1" :text="`${textSigh(tag)}`" type="warning" size="mini"></u-tag>
                                <u-tag v-if="i===2" :text="`${textSigh(tag)}`" type="success" size="mini"></u-tag>
                                <u-tag v-if="i===3" :text="`${textSigh(tag)}`" type="error" size="mini"></u-tag>
                            </view>
                        </view>


                        <view class="show">

                            <u-text type="info" mode="name" :prefixIcon="`${item.Avatar}`" :lines="1"
                                    iconStyle="width:24px;height:24px;margin-right:4px"
                                    text="我用十年青春"></u-text>
                            <u-text type="error" model="price" prefixIcon="/static/images/hot.png"
                                    iconStyle="width:24px;height:24px" customStyle="font-size:16px"
                                    :text="`${count}`"></u-text>
                            <u-text type="primary" model="text" prefixIcon="/static/images/join.png"
                                    iconStyle="width:24px;height:24px"
                                    text="加入"></u-text>
                        </view>
                    </view>


                </view>
            </view>

        </z-paging>


    </view>
</template>

<script setup>
import {computed, ref, toRefs, watch} from 'vue';
import {useMainStore} from "@/store/myapp";

const props = defineProps({
    //子组件接收父组件传递过来的值
    keyword: String,
})


const {keyword} = toRefs(props)
const search = ref("")
const mainStore = useMainStore()

const count = 20
const styles = {
    marginTop: '5px',
    marginBottom: '5px',
    marginRight: '10px'
}

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
            console.log("searchVal equals keyword")
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
    console.log(keyword)
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

            if (res.data.Code === 200) {
                paging.value.complete(res.data.Data.Genealogies);
            } else {
                paging.value.complete(false);
            }

        }
    })

}
const reload = (searchVal) => {
    console.log("长度" + searchVal.length)
    // if (searchVal.length === 1) {
    //     return
    // }
    search.value = searchVal
    setTimeout(() => {
        paging.value.reload(true)
    }, 300)

}
defineExpose({
    reload,
})

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
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: -20rpx;
  background-color: #f2f2f3;

}


.slider {
  width: 96%;
  background-color: white;
  margin: auto;
  border-radius: 8px;


  .item {
    margin: 15rpx 0rpx 0rpx 15rpx;
    display: flex;

    .left {
    }

    .right {
      display: flex;
      flex-direction: column;

      .title {
        margin-top: 10rpx;
        font-size: 1.2rem;
      }

      .tags {
        display: flex;
        flex-direction: row;
        margin-top: 20rpx;

        .tag-item {
          margin-right: 10px;
          display: flex;
          flex-direction: row;
          width: auto;

        }

      }

      .show {
        display: flex;
        margin-top: 16rpx;
      }
    }


  }
}

</style>

