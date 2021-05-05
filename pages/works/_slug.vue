<template lang="pug">
  .work-one(v-if="state.post.fields")
    header.top-image(:style="`background-image: url(${state.post.fields.topImage.fields.file.url});`" :alt="state.post.fields.topImage.fields.title")
      .header-top
        nuxt-link(to="/works").back-link ◀︎ Back
      .header-bottom
        .container
          h1.title {{state.post.fields.title}}
          p {{state.post.fields.description}}
          p {{state.post.fields.date}}
    main
      .container
        .article(v-html="toHtmlString(state.post.fields.article)")
        ul.gallery-list(v-if="state.post.fields.gallery")
          li.gallery-list-one(v-for="photo in state.post.fields.gallery" :key="`${photo.fields.title}`")
            img.gallery-photo(:src="photo.fields.file.url" :alt="photo.fields.title")
            p.gallery-title {{photo.fields.title}}
            p.gallery-description {{photo.fields.description}}
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
  watch,
} from '@nuxtjs/composition-api'

import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import client from '~/plugins/contentful.js'

type State = {
  post: any
  position: number
  viewHeight: number
}

export default defineComponent({
  setup() {
    // 現在のslugを取得
    const route = useRoute()
    const slug = computed(() => route.value.params.slug)
    // 記事を取得
    const entries = useAsync(() =>
      client.getEntries({
        content_type: 'works',
        'fields.slug': slug.value,
      })
    )
    // 記事一覧をstateに反映
    watch(entries, (newPosts: any) => {
      if (newPosts) {
        state.post = newPosts.items[0]
      }
    })

    const state = reactive<State>({
      post: {},
      position: 0,
      viewHeight: 0,
    })

    // Contentfullの記事をHTMLに変換
    const toHtmlString = (obj: any) => {
      return documentToHtmlString(obj)
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
      toHtmlString,
    }
  },
})
</script>
<style lang="scss" scoped>
.work-one {
  height: 100%;
}
.top-image {
  position: relative;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(75, 87, 133, 0.3);
  }
}
.header-top {
  position: absolute;
  top: 32px;
  left: 32px;
}
.back-link {
  color: white;
  padding: 4px;
  font-size: 24px;
}
.header-bottom {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  color: white;
  padding: 32px 0 40px;
  background: rgba(58, 60, 67, 0.3);
  backdrop-filter: blur(10px);
}
.article {
  padding: 80px 0;
  font-size: 18px;
  line-height: 2;
}

.gallery-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -16px 32px;
  width: calc(100% + 32px);
  list-style: none;
}

.gallery-list-one {
  margin: 0 16px 32px;
  width: calc(50% - 32px);
}
.gallery-photo {
  width: 100%;
  border-radius: 8px;
}
.gallery-title {
  padding: 6px 2px;
}
.gallery-description {
  padding: 0 2px;
}
</style>
