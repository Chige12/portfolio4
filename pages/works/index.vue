<template lang="pug">
  .works#works
    WorkList(:posts="posts")
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
})
</script>
<style lang="scss" scoped>
.works {
  padding-top: 80px;
  height: 100%;
}
</style>
