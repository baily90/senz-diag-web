<template>
  <div>
    <div ref="cornerstoneElement" class="cornerstone-element"></div>
    <div class="controls">
      <button @click="togglePlayPause">{{ isPlaying ? '暂停' : '播放' }}</button>
      <input type="range" min="0" :max="duration" step="0.1" v-model="currentTime" @input="seekVideo" />
      <button @click="zoomIn">放大{{scale}}</button>
      <button @click="zoomOut">缩小{{scale}}</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { init, RenderingEngine, Enums, imageLoader } from '@cornerstonejs/core'
import { Enums as ToolsEnums, LengthTool, ToolGroupManager } from '@cornerstonejs/tools'
import * as cornerstone from '@cornerstonejs/core'

export default {
  setup () {
    const cornerstoneElement = ref(null)
    const videoElement = ref(null)
    const isPlaying = ref(false)
    const currentTime = ref(0)
    const duration = ref(0)
    const scale = ref(1)
    const renderingEngine = ref(null)
    const renderingEngineId = 'myRenderingEngine'
    const viewportId = 'myViewport'
    const imageId = 'videoFrame'

    const loadVideo = () => {
      videoElement.value = document.createElement('video')
      videoElement.value.src = '/test1.mp4'
      videoElement.value.load()
      videoElement.value.onloadedmetadata = () => {
        duration.value = videoElement.value.duration
      }
      videoElement.value.onplay = () => {
        isPlaying.value = true
        renderFrame()
      }
      videoElement.value.onpause = () => {
        isPlaying.value = false
      }
      videoElement.value.ontimeupdate = () => {
        currentTime.value = videoElement.value.currentTime
      }
    }

    const togglePlayPause = () => {
      if (isPlaying.value) {
        videoElement.value.pause()
      } else {
        videoElement.value.play()
      }
    }

    const seekVideo = () => {
      videoElement.value.currentTime = currentTime.value
    }

    const zoomIn = () => {
      scale.value = Math.min(Number(scale.value + 0.1).toFixed(1), 3)
      const viewport = renderingEngine.value.getViewport(viewportId)
      viewport.setZoom(scale.value)
      renderingEngine.value.renderViewports([viewport])
    }

    const zoomOut = () => {
      scale.value = Math.max(Number(scale.value - 0.1).toFixed(1), 0.1)
      const viewport = renderingEngine.value.getViewport(viewportId)
      viewport.setZoom(scale.value)
      renderingEngine.value.renderViewports([viewport])
    }

    const initCornerstone = async () => {
      await init()
      const element = cornerstoneElement.value
      renderingEngine.value = new RenderingEngine(renderingEngineId)

      const viewportInput = {
        viewportId,
        element,
        type: Enums.ViewportType.STACK
      }
      renderingEngine.value.enableElement(viewportInput)
      // const toolGroupId = 'myToolGroup'
      // const toolGroup = ToolGroupManager.createToolGroup(toolGroupId)
      // toolGroup.addTool(LengthTool.toolName)
      // toolGroup.setToolActive(LengthTool.toolName, {
      //   bindings: [{ mouseButton: ToolsEnums.MouseBindings.Primary }]
      // })

      renderFrame()
    }

    const renderFrame = async () => {
      if (!isPlaying.value) return

      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.width = videoElement.value.videoWidth
      canvas.height = videoElement.value.videoHeight
      context.drawImage(videoElement.value, 0, 0, canvas.width, canvas.height)

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

      const image = {
        imageId: 'canvas:videoFrame',
        minPixelValue: 0,
        maxPixelValue: 255,
        slope: 1,
        intercept: 0,
        windowCenter: 128,
        windowWidth: 256,
        rows: canvas.height,
        columns: canvas.width,
        getPixelData: () => imageData.data,
        getCanvas: () => canvas,
        sizeInBytes: imageData.data.byteLength
      }

      imageLoader.registerImageLoader('canvas', () => ({promise: Promise.resolve(image)}))

      const loadedImage = await imageLoader.loadImage('canvas:videoFrame')
      console.log(loadedImage);

      const viewport = renderingEngine.value.getViewport(viewportId)
      viewport.setStack([loadedImage], 0)

      renderingEngine.value.render()

      requestAnimationFrame(renderFrame)
    }

    onMounted(() => {
      loadVideo()
      initCornerstone()
    })

    onUnmounted(() => {
      renderingEngine.value.destroy()
    })

    return {
      cornerstoneElement,
      isPlaying,
      currentTime,
      duration,
      scale,
      togglePlayPause,
      seekVideo,
      zoomIn,
      zoomOut
    }
  }
}
</script>

<style>
.cornerstone-element {
  width: 300px;
  height: 300px;
  border: 1px solid red;
}

.controls {
  margin-top: 10px;
}

.controls button,
.controls input {
  margin-right: 10px;
}
</style>
