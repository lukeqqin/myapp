<template>
  <view class="u-page">
    <u-form labelPosition="left" :model="model" :rules="rules" ref="add">
      <u-form-item label="族谱名称：" prop="genealogyInfo.name" borderBottom required label-width="80">
        <u-input v-model="model.genealogyInfo.name" border="none"></u-input>
      </u-form-item>
      <u-form-item label="家族封面：" borderBottom label-width="80">
        <u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="file" mutiple
                  uploadText="家谱图" :maxCount="1"></u-upload>
      </u-form-item>
    </u-form>
    <u-button @click="submit">提交</u-button>

  </view>
</template>

<script setup>
import {reactive, ref} from "vue";
import {useMainStore} from "@/store/myapp";

const mainStore = useMainStore()
const add = ref(null)

let fileList = ref([])
let model = reactive({
      genealogyInfo: {
        name: '',
      },
    }
)
let url = ''

let rules = reactive({
  'genealogyInfo.name': {
    type: 'string',
    required: true,
    message: '请填写族谱名称',
    trigger: ['blur', 'change']
  },
})

// 删除图片
function deletePic(event) {
  this[`fileList${event.name}`].splice(event.index, 1)
}

// 新增图片
async function afterRead(event) {
  // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
  let lists = [].concat(event.file)
  let fileListLen = fileList.value.length
  lists.map((item) => {
    fileList.value.push({
      ...item,
      status: 'uploading',
      message: '上传中'
    })
  })
  for (let i = 0; i < lists.length; i++) {
    const result = await uploadFilePromise(lists[i].url)
    let cover = JSON.parse(result.data)
    let status = 'success'
    let message = ''
    if (cover.Code !== 200) {
      status = 'failed'
      message = cover.Msg
    } else {
      url = cover.Data.Url
    }
    let item = fileList.value[fileListLen]
    fileList.value.splice(fileListLen, 1, Object.assign(item, {
      status: status,
      message: message,
      url: cover.Data.Url
    }))
    fileListLen++
  }
}

function uploadFilePromise(url) {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: mainStore.host + "/cos/upload",
      filePath: url,
      name: 'file',
      success: (res) => {
        setTimeout(() => {
          resolve(res)
        }, 500)
      }
    });
  })

}

function submit() {
  add.value.validate().then(res => {
    uni.$u.toast('校验通过')
    uni.request({
      url: mainStore.host + "/genealogy/save",
      method: "POST",
      data: {
        "title": model.genealogyInfo.name,
        "cover": url
      },
      complete: function (res) {
        if (res.data.Code === 200) {
          uni.showToast({
            title: "创建成功",
            duration: 2000,
            icon: 'success'
          })
        } else {
          uni.showToast({
            title: res.data.Msg,
            duration: 2000,
            icon: 'error'
          })
        }

      }
    })
  }).catch(errors => {
    uni.$u.toast(errors[0].message)
  })
}

</script>

<style lang="scss">
.u-page {
  width: 90%;
  margin: calc(30vh) auto;

  .combine {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>