<template lang="pug">
  ul.worklist
    li.worklist-one-wrapper(
      v-for="(post,postKey) in posts" :key="`work-list-${post.fields.slug}`"
      :id="`work-list-${post.fields.slug}`"
    )
      workListOne(
        :post="post"
        :position="position"
        :viewHeight="viewHeight"
      )
</template>
<script lang="ts">
import Vue from 'vue'
import workListOne from '~/components/works/workListOne.vue'
export default Vue.extend({
  components: {
    workListOne,
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      position: 0,
      viewHeight: 0,
    }
  },
  mounted() {
    console.log(this.posts)
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
.worklist {
  list-style: none;
  position: relative;
  padding-bottom: 1000px;
}
.worklist-one-wrapper {
  position: relative;
  width: 100%;
  height: $culumnHeightMax;
  margin-bottom: 32px;
}
</style>
