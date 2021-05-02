<template lang="pug">
  .works#works
    WorkList(:columnPosts="columnPosts")
</template>
<script lang="ts">
import Vue from 'vue'
import WorkList from '~/components/works/workList.vue'

import client from '~/plugins/contentful.js'
export default Vue.extend({
  components: {
    WorkList,
  },
  async asyncData() {
    // 記事一覧を取得
    const entries = await client.getEntries({
      content_type: 'works',
    })
    return {
      posts: entries.items,
    }
  },
  data() {
    return {
      posts: [],
    }
  },
  computed: {
    columnPosts() {
      const posts: Array<any> = this.posts
      const columnPosts: Array<any> = this.getColumnArray(posts, 2)
      return columnPosts
    },
  },
  methods: {
    getColumnArray(array: Array<any>, columnNum: number) {
      // [1,2,3,4] => [[1,2], [3,4]]
      const newArr = []
      for (let row = 0; row < Math.ceil(array.length / columnNum); row++) {
        const newRow = []
        for (let column = 0; column < columnNum; column++) {
          if (array[row * columnNum + column]) {
            newRow.push(array[row * columnNum + column])
          } else {
            newRow.push(null)
          }
        }
        newArr.push(newRow)
      }
      return newArr
    },
  },
})
</script>
<style lang="scss" scoped>
.works {
  padding-top: 80px;
  height: 100%;
}
</style>
