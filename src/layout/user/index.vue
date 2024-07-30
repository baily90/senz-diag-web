<template>
  <div class="container-layout-user">
    <div class="content">
      <RouterView v-slot="{ Component }">
      <Suspense>
        <!-- 主要内容 -->
        <component :is="Component"></component>
        <!-- 加载中状态 -->
        <template #fallback>
          <el-skeleton animated />
        </template>
      </Suspense>
    </RouterView>
    </div>
    <div class="copyright">Copyright @ 深至科技诊断医师平台</div>
  </div>
</template>

<script setup>

</script>

<style lang='less' scoped>
.container-layout-user {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: url(./../../assets/image/bg_login.png) no-repeat center center;
  background-size: cover;
  .content {
    width: 374px;
    padding: 40px 20px;
    background-color: #fff;
    border-radius: 8px;
  }
  .copyright {
    position: absolute;
    font-size: 12px;
    left: 0;
    bottom: 24px;
    width: 100%;
    text-align: center;
    color: #999;
  }
}
</style>
