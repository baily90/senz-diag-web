<template>
  <div class="container-report-media">
    <div class="media-list">
      <!-- act -->
      <div class="media-item" v-for="source in report?.sources" :key="source.id">
        <el-image style="width: 100%; height: 100%" :src="source.source_url_snapshot" fit="cover"></el-image>
        <el-icon v-if="source.source_type === 2" class="video" color="#fff" :size="24"><VideoPlay /></el-icon>
        <div v-if="source.source_type === 2" class="position" >{{source.position_desc}}</div>
        <el-image v-if="source.source_type === 1" class="select" style="width: 24px; height: 22px" :src="source.selected ? IconSelected : IconUnSelected"></el-image>
      </div>
    </div>
    <div class="media-content">
      <div class="media-tools">
        <el-button-group>
          <el-button :type="test ? 'primary' : ''" :icon="EditPen" @click="() => test = !test">{{test ? '取消' : ''}}测量</el-button>
          <el-button plain :icon="Crop">截图</el-button>
          <el-button plain :icon="Delete">清除</el-button>
        </el-button-group>

        <!-- 报告模板 - 肠系膜淋巴结且不为报告详情页才展示 getTemplateMenu -->
        <!-- !disabled && body_region_id === 7 -->
        <el-button>报告模板</el-button>
        <!-- 报告模板 - 可配置报告模板且不为报告详情页才展示 getStructTemplateMenu -->
        <!-- !disabled && isStruct === 1 && confTemplate && confTemplate?.length -->

      </div>
      <el-button @click="play()">播放</el-button>
      <el-button @click="pause()">暂停</el-button>
      <div class="media-area">
        <div class="media">
          <div class="media-video" id="cornerstone"></div>
          <div class="media-scalebar">
            <el-slider v-model="test1" vertical height="100%" :min=10 :max=300 />
          </div>
        </div>
        <div class="media-schedule">
          <el-icon style="margin-right: 15px;" :size="24" color="#007BFE"><VideoPlay /></el-icon>
          00:00
          <el-slider style="margin: 0 15px;" v-model="curTime" :max="maxTime" @input="onTimeChange" />
          <!-- 01:00 -->
        {{remaining}}
        <!-- frames: {{frame}} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import API from '@/api/report'
import { useRoute, useRouter } from 'vue-router'
import { useReportStore } from '@/store/report'
import IconSelected from '@/assets/image/icon_selected.png'
import IconUnSelected from '@/assets/image/icon_unselected.png'
import { EditPen, Crop, Delete } from '@element-plus/icons-vue'
import {
  RenderingEngine,
  Enums,
  init
} from '@cornerstonejs/core'

const route = useRoute()

const reportStore = useReportStore()
const {
  loading,
  report
} = storeToRefs(reportStore)

const test = ref(false)
const test1 = ref(0)

const viewport = ref(null)

const curTime = ref(0)
const maxTime = ref(0)
const remaining = ref(0)
const cruFrames = ref(0)

const play = () => {
  viewport.value.play()
}
const pause = () => {
  viewport.value.pause()
}

const onTimeChange = time => {
  viewport.value.setTime(time)
}

const initVideo = async () => {
  await init()

  const element = document.getElementById('cornerstone')
  const viewportId = 'CT_AXIAL_STACK'
  const renderingEngineId = 'myRenderingEngine'
  const renderingEngine = new RenderingEngine(renderingEngineId)

  const { ViewportType } = Enums
  const viewportInput = {
    viewportId,
    type: ViewportType.VIDEO,
    element
  }
  renderingEngine.enableElement(viewportInput)

  viewport.value = renderingEngine.getViewport(viewportId)
  await viewport.value.setVideoURL(report.value?.sources?.[0]?.source_url)
  viewport.value.render()

  element.addEventListener(Enums.Events.IMAGE_RENDERED, (evt) => {
    const { time, duration } = evt.detail
    curTime.value = parseInt(time)
    maxTime.value = parseInt(duration)
    remaining.value = maxTime.value - curTime.value
    cruFrames.value = viewport.value.getCurrentImageIdIndex()
  })
}

watch(() => report.value, () => {
  initVideo()
})

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
    .media-item {
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
  .media-content {
    flex: 1;
    display: flex;
    align-items: stretch;
    flex-flow: column nowrap;
    width: 100%;
    padding: 10px 0;

    .media-tools {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-right: 45px;
    }
    .media-area {
      margin-top: 10px;
      .media {
        display: flex;
        .media-video {
          width: var(--media-width);
          height: var(--media-height);
          // background-color: black;
        }
        .media-scalebar {
          width: 45px;
        }
      }
      .media-schedule {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 10px 55px 0 10px;
        font-size: 12px;
      }
    }
  }
}
</style>
