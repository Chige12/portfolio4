<template lang="pug">
  button.work-image-button(
    @click="openGalleryList()"
    :style="[backgroundColorStyle, workColorStyle]"
  )
    .work-image.--cover(
      v-if="props.backgroundSize === 'Cover' || props.backgroundSize === 'Contain'"
      :style="`background-image: url(${props.image.fields.file.url});`"
      :class="{'--contain': props.backgroundSize === 'Contain'}"
      :title="`「${props.image.fields.title}」をもっとよく見る`"
    )
    img.work-image.--auto(
      v-if="props.backgroundSize === 'Auto'"
      :src="props.image.fields.file.url"
      :alt="props.image.fields.title"
      :title="`「${props.image.fields.title}」をもっとよく見る`"
    )
    .work-caption(v-if="props.image.fields.description") {{props.image.fields.description}}
</template>
<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

import computedWorkColorStyle from '~/composables/computedWorkColorStyle'

export default defineComponent({
  props: {
    image: {
      type: Object,
      default: () => {},
    },
    backgroundSize: {
      type: String,
      default: 'Cover',
    },
    mainColor: {
      type: String,
      default: '',
    },
    backgroundColor: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { workColorStyle } = computedWorkColorStyle(props.mainColor, '')
    const backgroundColorStyle = computed(() => {
      return {
        '--background-color': props.backgroundColor,
      }
    })
    const openGalleryList = () => {
      console.log('open!')
    }
    return {
      props,
      workColorStyle,
      backgroundColorStyle,
      openGalleryList,
    }
  },
})
</script>
<style lang="scss" scoped>
.work-image-button {
  @include flex($wrap: nowrap, $alignItems: stretch);
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  transition: 0.5s $ease-out;
}

.work-image {
  width: 100%;
  transition: 0.5s $ease-out;
  background-color: var(--background-color);
  background-size: cover;
  background-position: center;
  &.--cover {
    height: 100%;
  }
  &.--auto {
    display: block;
    height: auto;
    flex-shrink: 0;
    transform: scale(1.02);
  }
  &.--contain {
    background-size: contain;
  }
}
.work-image-button:hover {
  .work-image.--cover {
    transform: scale(1.05);
  }
  .work-image.--auto {
    transform: scale(1.07);
  }
}
.work-caption {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  @include noto($color: $white, $size: 14px);
  padding: 8px 16px 10px;
  background-color: $theme-navy;
  background-color: var(--main-color);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;
}
</style>
