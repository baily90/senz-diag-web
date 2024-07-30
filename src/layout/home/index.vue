<template>
  <div class="container-layout-home">
    <ComNav />
    <div class="container-main">
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
      <div class="copyright">Copyright @ 深至科技诊断医师平台</div>
    </div>
  </div>
</template>

<script setup>
import ComNav from '@/components/ComNav/index.vue'
</script>

<style lang='less' scoped>
  .container-layout-home {
    display: flex;
    width: 100%;
    height: 100vh;
    .container-main {
      position: relative;
      width: 100%;
      margin: 56px 24px;
      .copyright {
        position: absolute;
        left: 50%;
        bottom: -36px;
        transform: translateX(-50%);
        font-size: 12px;
        color: #999;
      }
    }

  }
</style>
