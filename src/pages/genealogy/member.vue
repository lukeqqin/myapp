<template>
  <view class="u-page">
    <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
    <u-form labelPosition="left" :model="model" :rules="rules">
      <u-form-item label="族谱名称：" prop="genealogyInfo.name" borderBottom required label-width="80">
        <u-input v-model="model.genealogyInfo.name" border="none"></u-input>
      </u-form-item>
      <u-form-item label="性别" prop="userInfo.sex" borderBottom @click="showSex = true; hideKeyboard()" ref="item1">
        <u-input v-model="model.genealogyInfo.sex" disabled disabledColor="#ffffff" placeholder="请选择性别"
                 border="none"></u-input>
        <template #right>
          <u-icon name="arrow-right"></u-icon>
        </template>
      </u-form-item>
    </u-form>
    <u-action-sheet :show="showSex" :actions="actions" title="请选择性别" description="涉及相关隐私请选择保密"
                    @close="showSex = false" @select="sexSelect">
    </u-action-sheet>
  </view>
</template>


<script setup>
import {reactive, ref} from "vue";

let showSex = ref(false)
let model = reactive({
      genealogyInfo: {
        name: '',
        sex: '',
      },
    }
)
let actions = reactive([
  {name: '男',},
  {name: '女',},
  {name: '保密',},],
)

let rules = reactive({
  'genealogyInfo.name': {
    type: 'string',
    required: true,
    message: '请填写族谱名称',
    trigger: ['blur', 'change']
  },
  'genealogyInfo.sex': {
    type: 'string',
    max: 1,
    required: true,
    message: '请选择男或女',
    trigger: ['blur', 'change']
  },
})

let radio = ref("")
let switchVal = ref(false)

function sexSelect(e) {
  model.genealogyInfo.sex = e.name
  this.$refs.form1.validateField('genealogyInfo.sex')
}

</script>

<style lang="scss">
.u-page {
  width: 90%;
  margin: 160rpx auto;

  .combine {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>