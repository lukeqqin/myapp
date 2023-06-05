<template>
  <view class="service">
    <u-gap height="120" bgColor="#f2f2f3"></u-gap>
    <view class="first">
      <u-row customStyle="margin: 0rpx auto;">
        <u-col span="12">
          <view>
            <u-cell-group>
              <text>金融理财</text>
              <u-grid :border="false" col="4" @click="click">
                <u-grid-item v-for="(listItem,listIndex) in list" :key="listIndex">
                  <u-icon :customStyle="{paddingTop:20+'rpx'}" :name="listItem.name" :size="22"></u-icon>
                  <text class="grid-text">{{ listItem.title }}</text>
                </u-grid-item>
              </u-grid>
            </u-cell-group>
          </view>
        </u-col>
      </u-row>
    </view>

    <view class="second">
      <u-row>
        <u-col span="12">
          <view>
            <u-cell-group>
              <text>生活服务</text>
              <u-grid :border="false" col="4" @click="click">
                <u-grid-item v-for="(listItem,listIndex) in list" :key="listIndex">
                  <u-icon :customStyle="{paddingTop:20+'rpx'}" :name="listItem.name" :size="22"></u-icon>
                  <text class="grid-text">{{ listItem.title }}</text>
                </u-grid-item>
              </u-grid>
            </u-cell-group>
          </view>
        </u-col>
      </u-row>
    </view>

    <view class="three">
      <u-row>
        <u-col span="12">
          <view>
            <u-cell-group>
              <text>其他服务</text>
              <u-grid :border="false" col="4" @click="click">
                <u-grid-item v-for="(listItem,listIndex) in list" :key="listIndex">
                  <u-icon :customStyle="{paddingTop:20+'rpx'}" :name="listItem.name" :size="22"></u-icon>
                  <text class="grid-text">{{ listItem.title }}</text>
                </u-grid-item>
              </u-grid>
            </u-cell-group>
          </view>
        </u-col>
      </u-row>
    </view>

  </view>
</template>

<script setup>

const list = [{
  name: 'photo',
  title: '图片'
},
  {
    name: 'lock',
    title: '锁头'
  },
  {
    name: 'star',
    title: '星星'
  },
  {
    name: 'hourglass',
    title: '沙漏'
  },
  {
    name: 'home',
    title: '首页'
  },
  {
    name: 'star',
    title: '音量'
  },
]

function click(name) {
  console.log(`点击了第${name}个`)

}

</script>

<style lang="scss">
.service {
  background-color: #f2f2f3;
  height: 100vh;
}

.first {
  height: 300rpx;
  width: 96%;
  border-radius: 20rpx;
  background: white;
  margin: 0 auto;
}

.second {
  height: 300rpx;
  width: 96%;
  border-radius: 20rpx;
  background: white;
  margin: 20rpx auto 0;
}

.three {
  height: 300rpx;
  width: 96%;
  border-radius: 20rpx;
  background: white;
  margin: 20rpx auto 0;
}


.grid-text {
  font-size: 14px;
  color: #909399;
  padding: 10rpx 0 20rpx 0rpx;
  /* #ifndef APP-PLUS */
  box-sizing: border-box;
  /* #endif */
}
</style>