<template lang="pug">
.index
  header.header
    IndexTopVisual
    ClickMe(
      :isClickMeChanged="state.isClickMeChanged"
    )
  main
    section#About.about-wrapper
      AboutTop
    section#Works.wide-work-links
      WideWorkLinks(
        :posts="state.posts"
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
  useAsync,
} from '@nuxtjs/composition-api'
import client from '~/plugins/contentful.js'

import IndexTopVisual from '~/components/index/IndexTopVisual.vue'
import ClickMe from '~/components/atoms/ClickMe.vue'
import AboutTop from '~/components/about/AboutTop.vue'
import WideWorkLinks from '~/components/index/WideWorkLinks.vue'

type Entries = {
  items: Array<{
    fields: {
      links: Array<any>
    }
  }>
}

type State = {
  posts: Array<any>
  isClickMeChanged: boolean
  position: number
  viewHeight: number
}

export default defineComponent({
  components: {
    IndexTopVisual,
    ClickMe,
    AboutTop,
    WideWorkLinks,
  },
  setup() {
    // 記事一覧を取得
    useAsync(async () => {
      const entries: Entries = await client.getEntries({
        content_type: 'wideWorkLinks',
      })
      state.posts = entries.items[0].fields.links
    })

    const state = reactive<State>({
      posts: [],
      isClickMeChanged: false,
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
      clickMeTextChange()
    }
    const handleResize = () => {
      state.viewHeight = window.innerHeight
    }
    const clickMeTextChange = () => {
      if (state.position >= 100 && !state.isClickMeChanged) {
        state.isClickMeChanged = true
      } else if (state.position < 100 && state.isClickMeChanged) {
        state.isClickMeChanged = false
      }
    }
    return {
      state,
    }
  },
})
</script>

<style lang="scss" scoped>
.index,
.header {
  height: 100%;
}
.about-wrapper {
  padding-bottom: 112px;
}
</style>
