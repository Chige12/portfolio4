<template lang="pug">
  .layout
    CinemaScope(@menuShow="menuShow")
    transition(name="NaviMenu")
      NavigationMenu(v-if="state.isMenuShowed")
    .page-wrapper
      nuxt
</template>
<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import CinemaScope from '~/layouts/-cinema-scope.vue'
import NavigationMenu from '~/components/NavigationMenu.vue'

type State = {
  isMenuShowed: boolean
}

export default defineComponent({
  components: {
    CinemaScope,
    NavigationMenu,
  },
  setup() {
    const state = reactive<State>({
      isMenuShowed: false,
    })
    const menuShow = () => {
      state.isMenuShowed = true
    }
    return {
      state,
      menuShow,
    }
  },
})
</script>
<style lang="scss">
@import '~/assets/style/_layout.scss';

.page-wrapper {
  height: 100%;
  padding: 18px 0;
}

// NaviMenu transition
.NaviMenu-enter-active,
.NaviMenu-leave-active {
  transition: all 0.6s $bezier-fast-ease-out;
  transform: translateY(0);
}
.NaviMenu-enter,
.NaviMenu-leave-to {
  transform: translateY(-64px);
}
</style>
