<template lang="pug">
  .back-link-wrapper
    nuxt-link(:to="props.to").back-link
      LeftArrow.back-link-svg
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
// @ts-ignore
import LeftArrow from '~/assets/svgs/left_arrow.svg?inline'

export default defineComponent({
  components: {
    LeftArrow,
  },
  props: {
    to: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return {
      props,
    }
  },
})
</script>
<style lang="scss" scoped>
.back-link-wrapper {
  @include fixed($top: 52px, $left: 48px, $z: $z-back-button);
}
.back-link {
  display: block;
  padding: 12px;
  background: $white;
  border-radius: 46px;
  cursor: pointer;
  transition: 0.2s $ease-out;
  &:hover {
    background: $light-gray;
  }
}
.back-link-svg {
  display: block;
  width: 22px;
  height: 22px;
}
</style>
