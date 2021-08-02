<template lang="pug">
  .article-section(:style="workColorStyle")
    .work-container
      .columns
        .column
          WorkSectionHeadline(
            v-if="props.article.fields.headlineEn"
            :headlineEn="props.article.fields.headlineEn"
            :headlineJp="props.article.fields.headlineJp"
            :accentColor="props.accentColor"
          )
          MarkdownArticle(
            :md="props.article.fields.text"
            :mainColor="props.mainColor"
            :accentColor="props.accentColor"
          ).markdown-article
        .column
          WorkImageWindow(
            :image="props.article.fields.image"
            :backgroundSize="props.article.fields.backgroundSize"
            :mainColor="props.mainColor"
            :backgroundColor="props.article.fields.backgroundColor"
          )

</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import WorkSectionHeadline from '~/components/works/slug/WorkSectionHeadline.vue'
import WorkImageWindow from '~/components/works/slug/WorkImageWindow.vue'
import MarkdownArticle from '~/components/works/slug/markdownArticle.vue'

import computedWorkColorStyle from '~/composables/computedWorkColorStyle'

export default defineComponent({
  components: {
    WorkSectionHeadline,
    WorkImageWindow,
    MarkdownArticle,
  },
  props: {
    article: {
      type: Object,
      default: () => {},
    },
    mainColor: {
      type: String,
      default: '',
    },
    accentColor: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { workColorStyle } = computedWorkColorStyle(
      props.mainColor,
      props.accentColor
    )
    const openGalleryList = () => {
      console.log('open!')
    }
    return {
      props,
      workColorStyle,
      openGalleryList,
    }
  },
})
</script>
<style lang="scss" scoped>
@import '~assets/style/works-slug.scss';
.columns {
  margin-top: 32px;
  @include flex($wrap: wrap, $alignItems: stretch);
}
.column {
  width: calc(50% - #{$gap / 2});
}
.markdown-article {
  margin-top: 40px;
}
</style>
