<template lang="pug">
  ul.wide-work-links#wide-work-links
    li.wide-work-link(
      v-for="(post,postKey) in props.posts"
      :key="`wide-work-${postKey}`"
      )
      WideWorkLink(
        :postKey="postKey"
        :post="post"
        :position="state.getPosition"
        :viewHeight="state.getViewHeight"
      )
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from '@nuxtjs/composition-api'

import WideWorkLink from '@/components/index/WideWorkLink.vue'

type State = {
  getPosition: number
  getViewHeight: number
}

export default defineComponent({
  components: {
    WideWorkLink,
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
    position: {
      type: Number,
      default: 0,
    },
    viewHeight: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const state = reactive<State>({
      getPosition: props.position,
      getViewHeight: props.viewHeight,
    })

    watch(
      () => props.position,
      (newValue: number) => {
        state.getPosition = newValue
      }
    )
    watch(
      () => props.viewHeight,
      (newValue: number) => {
        state.getViewHeight = newValue
      }
    )

    return {
      state,
      props,
    }
  },
})
</script>

<style lang="scss" scoped>
ul.wide-work-links {
  list-style: none;
}
.wide-work-link {
  width: 100%;
  height: 640px;
  margin: 0 0;
}
</style>
