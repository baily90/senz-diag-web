<template>
  <div class="container-report-rule">
    <div style="cursor: pointer;" @click="visible = true">

      <slot></slot>
    </div>

    <el-dialog
      v-model="visible"
      :width="700"
      destroy-on-close
      center
      :append-to-body="true"
      :show-close="false"
    >
      <el-tabs>
        <el-tab-pane
          :label="rule.name"
          v-for="rule in reportRules"
          :key="rule.key" >
          <div class="standards-content" v-if="rule.standards?.length">
            <div class="title">报告标准</div>
            <div
              class="standards-item"
              v-for="standard in rule.standards"
              :key="standard.key">
              <div
                class="standards-item-value"
                v-for="val in standard.values"
                :key="val">{{ val }}</div>
            </div>
          </div>
          <div class="templates-content" v-if="rule.templates?.length">
            <div class="title">模板参考</div>
            <el-tabs tab-position="left">
              <el-tab-pane
                :label="template.name"
                v-for="template in rule.templates"
                :key="template.key" >
                <el-image style="width: 100%" :src="template.img" />
              </el-tab-pane>

            </el-tabs>
          </div>
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">我知道了</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import reportRules from '@/constants/reportRules'

const visible = ref(false)

</script>

<style lang='less' scoped>
.title {
  font-size: 16px;
  font-weight: bold;
}
.standards-item {
  display: flex;
  .standards-item-value {
    flex: 1;
    margin-top: 10px;
  }
}
.templates-content {
  margin-top: 40px;
  .title {
    margin-bottom: 20px;
  }
}
</style>
