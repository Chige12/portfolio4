<template lang="pug">
  .work-one(v-if="state.post.fields")
    BackLink(:to="`/`")
    header.header
      .work-container
        .header-top
          h1.header-title {{state.post.fields.title}}
          p.header-date(v-if="formatDateSinceUntil") Date: {{formatDateSinceUntil}}
      .header-image(
        :style="`background-image: url(${state.post.fields.topImage.fields.file.url});`"
      )
      .work-container
        .header-bottom
          .scroll-wrapper
            ClickMe(:isClickMeChanged="false")
          .more-detail-data
            p.header-description {{state.post.fields.description}}
            ul.genre-lists
              li.genre-tag(
                v-for="genre in state.post.fields.genres"
                :key="`genre-${genre.fields.title}`"
              ) {{genre.fields.title}}
    main
      .work-container
        p(v-if="!state.post.fields.articles") すいません。まだ記事がありません……
      section(
        v-for="article in state.post.fields.articles"
      )
        WorkArticleTitle(
          v-if="article.fields.displayType === 'Article-title'"
          :article="article"
          :slug="state.slug"
          :mainColor="state.post.fields.mainColor"
        )
        WorkImageLeftSection(
          v-if="article.fields.displayType === 'Image-left'"
          :article="article"
          :mainColor="state.post.fields.mainColor"
          :accentColor="state.post.fields.accentColor"
        )
        WorkImageRightSection(
          v-if="article.fields.displayType === 'Image-right'"
          :article="article"
          :mainColor="state.post.fields.mainColor"
          :accentColor="state.post.fields.accentColor"
        )
        WorkImageOnlySection(
          v-if="article.fields.displayType === 'Image-only'"
          :article="article"
        )
      .work-container
        GalleryList(
          :gallery="state.post.fields.gallery"
        )
</template>
<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  onMounted,
  onBeforeUnmount,
  useAsync,
  useRoute,
} from '@nuxtjs/composition-api'

import client from '~/plugins/contentful.js'

import GalleryList from '~/components/works/slug/galleryList.vue'

import BackLink from '~/components/atoms/BackLink.vue'
import ClickMe from '~/components/atoms/ClickMe.vue'

import WorkArticleTitle from '~/components/works/slug/WorkArticleTitle.vue'
import WorkImageLeftSection from '~/components/works/slug/WorkImageLeftSection.vue'
import WorkImageRightSection from '~/components/works/slug/WorkImageRightSection.vue'
import WorkImageOnlySection from '~/components/works/slug/WorkImageOnlySection.vue'

type State = {
  post: any
  slug: string
  position: number
  viewHeight: number
}

export default defineComponent({
  components: {
    GalleryList,
    BackLink,
    ClickMe,
    WorkArticleTitle,
    WorkImageLeftSection,
    WorkImageRightSection,
    WorkImageOnlySection,
  },
  setup(_, { root }) {
    // 現在のslugを取得
    const route = useRoute()
    const slug = computed(() => route.value.params.slug)
    // 記事を取得
    useAsync(async () => {
      const entries = await client.getEntries({
        content_type: 'works',
        'fields.slug': slug.value,
      })
      state.post = entries.items[0]
      state.slug = slug.value
      console.log(state.post)
    })

    const state = reactive<State>({
      post: {},
      slug: '',
      position: 0,
      viewHeight: 0,
    })

    const formatDateSinceUntil = computed(() => {
      const dateFormat = state.post.fields.dateFormat
      const since = state.post.fields.date
      const until = state.post.fields.until

      const sinceDate = since ? formatDate(since) : null
      const untilDate = until ? formatDate(until) : null

      if (dateFormat === '<since: yyyy/mm/dd>' && sinceDate) {
        return sinceDate
      }
      if (dateFormat === '<since: yyyy/mm/dd> 〜 Now' && sinceDate) {
        return `${sinceDate} 〜 Now`
      }
      if (
        dateFormat === '<since: yyyy/mm/dd> 〜 <until: yyyy/mm/dd>' &&
        sinceDate &&
        untilDate
      ) {
        return `${sinceDate} 〜 ${untilDate}`
      }
      return null
    })

    const formatDate = (dd: string) => {
      const date = new Date(dd)
      const YYYY = date.getFullYear()
      const MM = date.getMonth() + 1
      const DD = date.getDate()
      return `${YYYY}/${MM}/${DD}`
    }

    // スクロール量とwindowサイズを取得 今後使う予定
    onMounted(() => {
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
    }
    const handleResize = () => {
      state.viewHeight = window.innerHeight
    }

    return {
      state,
      formatDateSinceUntil,
    }
  },
})
</script>
<style lang="scss" scoped>
@import '~assets/style/works-slug.scss';

.work-one {
  position: relative;
  height: 100%;
}

.header {
  width: 100%;
  height: 100%;
}
.header-top {
  height: $header-whiteH;
  @include flex($justifyContent: center, $alignItems: flex-start);
  flex-direction: column;
}
.header-title {
  @include noto($size: 28px, $weight: $font-bold);
  @include font-kerning();
  margin-left: -2px;
}
.header-date {
  @include noto($size: 14px);
}

.header-image {
  height: calc(100% - (#{$header-whiteH} * 2));
  background-size: cover;
  background-position: center, center;
}
.header-bottom {
  height: $header-whiteH;
  @include flex($justifyContent: flex-start, $alignItems: center);
}
.scroll-wrapper {
  width: $container-margin;
  margin-top: $header-whiteH;
  margin-left: -$container-margin;
}

.header-description {
  @include noto($size: 18px);
  line-height: 1;
  margin-bottom: 12px;
}

// ジャンル
.genre-lists {
  margin-left: 0;
  @include flex($justifyContent: center, $alignItems: flex-start);
  list-style: none;
}
.genre-tag {
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 2px 12px 4px;
  background: $theme-mint-d1;
  @include noto($size: 15px, $color: $white);
  @include font-kerning();
  border-radius: 30px;
  &:last-child {
    margin-right: 0;
  }
}

main {
  padding-bottom: 80px;
}
</style>
