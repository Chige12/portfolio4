<template lang="pug">
.index
  IndexTopVisual
  ClickMe(
    :isClickMeChanged="state.isClickMeChanged"
  )
  .about-wrapper
    AboutTop
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  onBeforeUnmount,
} from '@nuxtjs/composition-api'
import IndexTopVisual from '~/components/index/IndexTopVisual.vue'
import ClickMe from '~/components/atoms/ClickMe.vue'
import AboutTop from '~/components/about/AboutTop.vue'

type State = {
  isClickMeChanged: boolean
  position: number
}

export default defineComponent({
  components: {
    IndexTopVisual,
    ClickMe,
    AboutTop,
  },
  setup() {
    const state = reactive<State>({
      isClickMeChanged: false,
      position: 0,
    })
    onMounted(() => {
      // const indexPage: Element = this.$el
      window.addEventListener('scroll', scrollEvent)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', scrollEvent)
    })
    const scrollEvent = () => {
      clickMeTextChange()
    }
    const clickMeTextChange = () => {
      state.position =
        document.documentElement.scrollTop || document.body.scrollTop
      if (state.position >= 288 && !state.isClickMeChanged) {
        state.isClickMeChanged = true
      } else if (state.position < 288 && state.isClickMeChanged) {
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
.index {
  height: 100%;
}
.about-wrapper {
  padding-bottom: 2000px;
}
</style>
