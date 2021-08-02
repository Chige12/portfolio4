<template lang="pug">
  button.article-section.work-image-only-section(
    :style="workBackgroundColorStyle"
    @click="openGalleryList()"
  )
    .work-container
      .work-image-button
        img.work-image(
          :src="props.article.fields.image.fields.file.url"
          :alt="props.article.fields.image.fields.title"
          :title="`「${props.article.fields.image.fields.title}」をもっとよく見る`"
        )
        .work-caption(v-if="props.article.fields.image.fields.description") {{props.article.fields.image.fields.description}}
</template>
<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    article: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const workBackgroundColorStyle = computed(() => {
      if (!props.article.fields.backgroundColor) return
      return {
        '--background-color': props.article.fields.backgroundColor,
      }
    })
    const openGalleryList = () => {
      console.log('open!')
    }
    return {
      props,
      workBackgroundColorStyle,
      openGalleryList,
    }
  },
})
</script>
<style lang="scss" scoped>
@import '~assets/style/works-slug.scss';

.article-section.work-image-only-section {
  background-color: var(--background-color);
}

.work-image-button {
  @include flex($wrap: nowrap, $alignItems: stretch);
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}
.work-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
.work-caption {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  @include noto($color: $white, $size: 14px);
  padding: 8px 16px 10px;
  background-color: $theme-navy;
  background-color: var(--background-color);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;
}
</style>
