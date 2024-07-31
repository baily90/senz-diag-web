<template>
   <div class="container-dataTable">
      <el-table :data="listData" stripe v-loading="loading" :max-height="tabelHeight" :ref="(el) => (tableRef = el)">
         <!-- 遍历所有列 -->
         <template v-for="item in propList" :key="item.prop" fixed="right">
            <el-table-column v-bind="item" >
               <!-- 传有slotName时展示的插槽列 -->
               <template #default="scope" v-if="item.slotName">
                  <slot :name="item.slotName" :row="scope.row"></slot>
               </template>
            </el-table-column>
         </template>

         <!-- 空数据时占位图 -->
         <template #empty>
            <el-empty :image-size="100" />
         </template>
      </el-table>

      <div class="pagination-container" v-if="listData?.length">
         <el-pagination
            :current-page="currentPage"
            :page-size="15"
            :small="false"
            layout="total, prev, pager, next"
            @current-change="(val) => emit('current-change', val)"
            :total="total" />
      </div>
   </div>
 </template>

<script setup>
import { ref, onMounted } from 'vue'
import { useWindowSize, useElementBounding } from '@vueuse/core'

const tableRef = ref()
const tabelHeight = ref(0)
const windowSize = useWindowSize()
const tableBounding = useElementBounding(tableRef)

defineProps({
  listData: {
    type: Array,
    default: () => []
  },
  loading: Boolean,
  propList: {
    type: Array,
    default: () => []
  },
  currentPage: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['current-change'])

onMounted(() => {
  tabelHeight.value = windowSize.height.value - (tableBounding.top.value + 56 + 60)
})

</script>

<style scoped lang="less">
.container-dataTable {
   .pagination-container {
      display: flex;
      justify-content: flex-end;
      margin-top: 12px;
      width: 100%;
   }
}
</style>
