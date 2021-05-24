<template lang="pug">
  .cinema-scope(
    :class="{'is-finish':state.isLoadFinished}"
  )
    .cinema-scope-top
    .cinema-scope-bottom
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  SetupContext,
  onMounted,
  onBeforeUnmount,
} from '@nuxtjs/composition-api'

type State = {
  isLoadFinished: boolean
}

export default defineComponent({
  setup(_, context: SetupContext) {
    // const route = useRoute()
    const state = reactive<State>({
      isLoadFinished: false,
    })
    onMounted(() => {
      window.addEventListener('load', loadFinish)
      if (location.hostname === 'localhost') {
        setTimeout(loadFinish, 100)
      }
    })
    onBeforeUnmount(() => {
      window.removeEventListener('load', loadFinish)
    })
    const loadFinish = () => {
      state.isLoadFinished = true
      context.emit('menuShow')
    }
    return {
      state,
    }
  },
})
</script>
<style lang="scss" scoped>
.cinema-scope {
  .cinema-scope-top {
    @include absolute($top: 0, $left: 0, $z: $z-cinema-scope);
    position: fixed;
    width: 100%;
    height: 50%;
    background: $theme-navy;
    transition: 0.3s $bezier-fast-ease-out;
  }
  .cinema-scope-bottom {
    @include absolute($bottom: 0, $left: 0, $z: $z-cinema-scope);
    position: fixed;
    width: 100%;
    height: 50%;
    background: $theme-navy;
    transition: 0.3s $bezier-fast-ease-out;
  }
  &.is-finish {
    .cinema-scope-top {
      height: 18px;
    }
    .cinema-scope-bottom {
      height: 18px;
    }
  }
}
</style>
