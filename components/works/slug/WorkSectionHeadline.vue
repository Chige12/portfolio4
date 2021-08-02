<template lang="pug">
  h2.headline(:style="workColorStyle")
    .headline-en {{props.headlineEn}}
    .headline-ja(v-if="props.headlineJp") {{props.headlineJp}}
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import computedWorkColorStyle from '~/composables/computedWorkColorStyle'

export default defineComponent({
  props: {
    headlineEn: {
      type: String,
      default: '',
    },
    headlineJp: {
      type: String,
      default: '',
    },
    accentColor: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { workColorStyle } = computedWorkColorStyle('', props.accentColor)
    return {
      props,
      workColorStyle,
    }
  },
})
</script>
<style lang="scss" scoped>
@import '~assets/style/works-slug.scss';

.headline-en {
  position: relative;
  @include roboto($color: $theme-mint, $size: 52px);
  color: var(--accent-color);
  margin-bottom: 4px;
  &::before {
    content: '';
    @include absolute($top: 0, $bottom: 0, $left: -$container-margin);
    width: $container-margin * 0.7;
    height: 3px;
    background-color: $theme-mint;
    background-color: var(--accent-color);
  }
}
.headline-ja {
  @include noto($color: $theme-mint-d1, $size: 20px);
  @include font-kerning();
  color: var(--accent-color);
}
</style>
