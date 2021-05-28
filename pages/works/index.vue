<template lang="pug">
  .works#works
    WorkList(:columnPosts="columnPosts")
</template>
<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  useAsync,
} from '@nuxtjs/composition-api'
import client from '~/plugins/contentful.js'

import WorkList from '~/components/works/workList.vue'

type State = {
  posts: Array<any>
}

export default defineComponent({
  components: {
    WorkList,
  },
  setup() {
    // 記事一覧を取得
    useAsync(async () => {
      const entries = await client.getEntries({
        content_type: 'works',
        order: '-fields.date',
      })
      state.posts = entries.items
    })

    const state = reactive<State>({
      posts: [],
    })

    const columnPosts = computed(() => {
      if (state.posts) {
        // 2カラムにする
        return getColumnArray(state.posts, 2)
      } else {
        return []
      }
    })

    // カラム配列(多次元配列)にする ex.[1,2,3,4,5] => [[1,2], [3,4], [5, null]]
    const getColumnArray = (array: Array<any>, columnNum: number) => {
      const newArr = []
      for (let row = 0; row < Math.ceil(array.length / columnNum); row++) {
        const newRow = []
        for (let column = 0; column < columnNum; column++) {
          if (array[row * columnNum + column]) {
            newRow.push(array[row * columnNum + column])
          } else {
            // 奇数の場合は横埋めのためにnull追加 => 空div生成
            newRow.push(null)
          }
        }
        newArr.push(newRow)
      }
      return newArr
    }
    return {
      columnPosts,
    }
  },
})
</script>
<style lang="scss" scoped>
.works {
  padding-top: 80px;
  height: 100%;
}

.page-enter {
  transform: translateX(100%);
}
.page-enter-to {
  transform: translateX(0);
  transition: 0.4s $ease-out;
}
.page-leave {
  transform: translateX(0);
}
.page-leave-to {
  transform: translateX(100%);
  transition: 0.4s $ease-out;
}
</style>
