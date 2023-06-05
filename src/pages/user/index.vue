<template>
  <view class="user">
    <view class="user-header">
      <view class="user-info">
        <view class="user-avatar">
          <u-avatar :src="'https://cdn.uviewui.com/uview/album/1.jpg'"
                    size="80" shape="square"></u-avatar>
        </view>
        <view class="user-right">
          <u-text mode="text" :lines="1"
                  customStyle="font-size:22px"
                  text="十年青春"></u-text>
          <view class="user-avatar-right">
            <view>
              <u-text type="info" mode="text" :lines="1"
                      customStyle="font-size:18px"
                      text="微信号："></u-text>
            </view>
            <view>
              <u-text type="info" mode="text" :lines="1"
                      customStyle="font-size:18px"
                      text="lukeqqin"></u-text>
            </view>

          </view>

        </view>
      </view>
    </view>
    <u-gap height="20" bgColor="#f2f2f3"></u-gap>
    <view>
      <u-cell-group>
        <u-cell icon="moments-circel-fill" title="服务" isLink size="large"></u-cell>
        <u-gap height="20" bgColor="#f2f2f3"></u-gap>
        <u-cell icon="heart-fill" title="收藏" isLink size="large"></u-cell>
        <u-cell icon="integral-fill" title="会员" isLink size="large"></u-cell>
        <u-cell icon="chat-fill" title="客服" isLink size="large"></u-cell>
        <u-gap height="20" bgColor="#f2f2f3"></u-gap>
        <u-cell icon="setting-fill" title="设置" isLink size="large"></u-cell>
      </u-cell-group>
    </view>
    <view class="gap"></view>
  </view>
</template>

<script setup>
import UniGroup from "@dcloudio/uni-ui/lib/uni-group/uni-group.vue"
</script>


<style lang="scss">
.user {
  .user-header {
    background-color: white;
    height: 200px;

    .user-info {
      display: flex;
      flex-direction: row;

      .user-avatar {
        margin: 160rpx 80rpx;
      }

      .user-right {
        margin: 160rpx -60rpx;

        .user-avatar-right {
          display: flex;
          flex-direction: row;
          text-align: center;
          margin-top: 20rpx;
        }
      }
    }
  }

  .gap {
    height: calc(100vh - 506px);
    background-color: #f2f2f3;
  }
}

</style>