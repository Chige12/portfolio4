<template lang="pug">
  .work-one
    workListColumn(
      :postsRow="0"
      :columnPost="new Array(post)"
      :position="position"
      :viewHeight="viewHeight"
      )
</template>
<script lang="ts">
import Vue from 'vue'
import workListColumn from '~/components/works/workListColumn.vue'

import client from '~/plugins/contentful.js'
export default Vue.extend({
  components: {
    workListColumn,
  },
  async asyncData({ params }) {
    // 記事一覧を取得
    const entries = await client.getEntries({
      content_type: 'works',
      'fields.slug': params.slug,
    })
    return {
      post: entries.items[0],
    }
  },
  data() {
    return {
      position: 0,
      viewHeight: 0,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollEvent)
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollEvent)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    scrollEvent() {
      this.position =
        document.documentElement.scrollTop || document.body.scrollTop
    },
    handleResize() {
      this.viewHeight = window.innerHeight
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
