<template>
  <div class="container-report-media">
    <div class="media-list">
      <!-- act -->
      <div class="media" v-for="source in report?.sources" :key="source.id">
        <el-image style="width: 100%; height: 100%" :src="source.source_url_snapshot" fit="cover"></el-image>
        <el-icon v-if="source.source_type === 2" class="video" color="#fff" :size="24"><VideoPlay /></el-icon>
        <div v-if="source.source_type === 2" class="position" >{{source.position_desc}}</div>
        <el-image v-if="source.source_type === 1" class="select" style="width: 24px; height: 22px" :src="source.selected ? IconSelected : IconUnSelected"></el-image>
      </div>
    </div>
    <div class="media-check">
      <el-button-group>
        <el-button :icon="EditPen">测量</el-button>
        <el-button :icon="Crop">截图</el-button>
        <el-button :icon="Delete">清除</el-button>
      </el-button-group>
      <div class="media">
        media
      </div>
    </div>

  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import API from '@/api/report'
import { useRoute, useRouter } from 'vue-router'
import { useReportStore } from '@/store/report'
import IconSelected from '@/assets/image/icon_selected.png'
import IconUnSelected from '@/assets/image/icon_unselected.png'
import { EditPen, Crop, Delete } from '@element-plus/icons-vue'

const route = useRoute()

const reportStore = useReportStore()
const {
  loading,
  report
} = storeToRefs(reportStore)

// 报告 sources
// 历史报告 其他扫查影像ai_source、已选择图片source

</script>

<style lang="less" scoped>
.container-report-media {
  display: flex;
  width: 100%;
  height: 100%;
  .media-list {
    width: 200px;
    height: 100%;
    padding: 0 10px 10px 10px;
    overflow-y: auto;
    overflow-x: hidden;
    .media {
      position: relative;
      display: inline-flex;
      margin-top: 10px;
      width: 85px;
      height: 100px;
      border-radius: 5px;
      overflow: hidden;
      transition: all 0.2s ease;
      border: 2px solid #fff;
      background-color: #fff;

      &:nth-child(2n) {
        margin-left: 10px;
      }
      &.act {
        border: 2px solid #097AFF;
      }
      .position {
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 19px;
        background-color: #097AFF;
        font-size: 11px;
        color: #FFFFFF;
      }
      .video {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -12px;
        margin-left: -12px;
      }
      .select {
        position: absolute;
        top: -2px;
        right: -2px;
      }
    }
  }
  .media-check {
    flex: 1;
    width: 100%;
    padding: 10px 0;

  }
}
</style>
