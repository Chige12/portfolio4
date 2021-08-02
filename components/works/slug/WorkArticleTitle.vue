<template lang="pug">
  .article-title(:style="workColorStyle")
    .work-container
      h1.article-title-headline
        .en /{{props.slug}}
        .title {{props.article.fields.articleTitle}}
    .article-top-image-wrapper(v-if="props.article.fields.image")
      .work-container
        img.article-top-image(:src="props.article.fields.image.fields.file.url" :alt="props.article.fields.image.fields.title")
    .work-container
      .markdown-article-wrapper(:class="{'--full' : !props.article.fields.image }")
        MarkdownArticle(:md="props.article.fields.text")
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import MarkdownArticle from '~/components/works/slug/markdownArticle.vue'
import computedWorkColorStyle from '~/composables/computedWorkColorStyle'

export default defineComponent({
  components: {
    MarkdownArticle,
  },
  props: {
    article: {
      type: Object,
      default: () => {},
    },
    slug: {
      type: String,
      default: '',
    },
    mainColor: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { workColorStyle } = computedWorkColorStyle(props.mainColor, '')
    return {
      props,
      workColorStyle,
    }
  },
})
</script>
<style lang="scss" scoped>
@import '~assets/style/works-slug.scss';

.article-title {
  margin-top: 80px;
  position: relative;
}

.article-title-headline {
  background-color: $theme-navy;
  background-color: var(--main-color);
  padding: 48px;
  border-radius: 20px;
  box-shadow: 0 8px 24px -8px rgba($theme-navy, 0.4);
  .en {
    @include roboto($color: $white, $size: 16px);
    margin-bottom: 10px;
    opacity: 0.6;
  }
  .title {
    @include noto($color: $white, $weight: $font-bold, $size: 32px);
    line-height: 1.4;
    white-space: pre-wrap;
    @include font-kerning();
  }
}

.article-top-image-wrapper {
  @include absolute($bottom: 0, $right: 0);
  width: 100%;
  .article-top-image {
    display: block;
    margin-left: auto;
    width: calc(50% - #{$gap / 2});
    max-width: 800px;
  }
}

.markdown-article-wrapper {
  width: calc(50% - #{$gap / 2});
  margin-right: auto;
  padding-left: 8px;
  padding-top: 38px;
  padding-bottom: 24px;
  &.--full {
    width: 100%;
    margin-right: unset;
    padding-right: 8px;
  }
}
</style>
