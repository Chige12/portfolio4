<template lang="pug">
  ul.worklist
    li.worklist-one-wrapper(
      v-for="(columnPost,postsRow) in columnPosts" :key="`work-row-${postsRow}`"
      :id="`work-row-${postsRow+1}`"
    )
      workListColumn(
        :postsRow="postsRow"
        :columnPost="columnPost"
        :position="state.position"
        :viewHeight="state.viewHeight"
      )
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  onBeforeUnmount,
} from '@nuxtjs/composition-api'

import workListColumn from '~/components/works/workListColumn.vue'

type Props = {
  columnPosts: Array<any>
}
type State = {
  position: number
  viewHeight: number
}

export default defineComponent({
  components: {
    workListColumn,
  },
  props: {
    columnPosts: {
      type: Array,
      default: () => [],
    },
  },
  setup(props: Props) {
    const state = reactive<State>({
      position: 0,
      viewHeight: 0,
    })

    // スクロール量とwindowサイズを取得
    onMounted(() => {
      scrollEvent()
      handleResize()
      window.addEventListener('scroll', scrollEvent)
      window.addEventListener('resize', handleResize)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', scrollEvent)
      window.removeEventListener('resize', handleResize)
    })
    const scrollEvent = () => {
      state.position =
        document.documentElement.scrollTop || document.body.scrollTop
    }
    const handleResize = () => {
      state.viewHeight = window.innerHeight
    }

    return {
      state,
      props,
    }
  },
})
</script>
<style lang="scss" scoped>
.worklist {
  list-style: none;
  padding-bottom: 1000px;
}
.worklist-one-wrapper {
  position: relative;
  width: 100%;
  height: $culumnHeightMax;
  margin-bottom: 80px;
}
</style>
