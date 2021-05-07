<template lang="pug">
  .work-one(v-if="state.post.fields")
    .top-image(
      :style="`background-image: url(${state.post.fields.topImage.fields.file.url});`"
      :alt="state.post.fields.topImage.fields.title"
      :class="{'top-image--blur': 400 < state.position}"
      )
    .header-top
      nuxt-link(to="/works").back-link ◀︎ Back
    header.header
      .header-bottom
        .container
          h1.header-title.font-kerning {{state.post.fields.title}}
          p.header-description.font-kerning {{state.post.fields.description}}
          p.header-date(v-if="formatDateSinceUntil") Date: {{formatDateSinceUntil}}
    main.main
      .container
        GalleryList(v-if="state.post.fields.gallery" :gallery="state.post.fields.gallery")
        MarkdownArticle(:article="state.post.fields.article")
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

import client from '~/plugins/contentful.js'

import GalleryList from '~/components/works/galleryList.vue'
import MarkdownArticle from '~/components/works/markdownArticle.vue'

type State = {
  post: any
  position: number
  viewHeight: number
}

export default defineComponent({
  components: {
    GalleryList,
    MarkdownArticle,
  },
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

    const formatDateSinceUntil = computed(() => {
      const dateFormat = state.post.fields.dateFormat

      const since = state.post.fields.date
        ? formatDate(state.post.fields.date)
        : null
      if (dateFormat === '<since: yyyy/mm/dd>' && since) {
        return since
      }
      if (dateFormat === '<since: yyyy/mm/dd> 〜 Now' && since) {
        return `${since} 〜 Now`
      }

      const until = state.post.fields.until
        ? formatDate(state.post.fields.until)
        : null
      if (
        dateFormat === '<since: yyyy/mm/dd> 〜 <until: yyyy/mm/dd>' &&
        since &&
        until
      ) {
        return `${since} 〜 ${until}`
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
.work-one {
  position: relative;
  height: 100%;
}
.top-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center bottom;
  background-size: cover;
  z-index: -2;
  transform: scale(1);
  transition: 0.3s ease-in-out;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    transform: scale(1);
    transition: 0.3s ease-in-out;
  }
  &--blur {
    transform: scale(1.01);
    filter: brightness(50%);
    opacity: 0.8;
    &::before {
      backdrop-filter: blur(8px);
      background-color: rgba(#4e648a, 0.4);
    }
  }
}
.header {
  position: relative;
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 1px 8px rgba($theme-navy, 0.8));
}
.header-top {
  position: fixed;
  top: 32px;
  left: 32px;
  z-index: 3;
  filter: drop-shadow(0 1px 8px rgba($theme-navy, 0.8));
  .back-link {
    color: white;
    padding: 4px;
    font-size: 24px;
    text-decoration: none;
  }
}

.header-bottom {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  color: white;
  padding: 32px 0 40px;
}
.header-description {
  margin-top: 8px;
}
.header-date {
  margin-top: 4px;
}
.main {
  border-radius: 32px 32px 0 0;
  background: rgba($white, 0.92);
  padding-bottom: 2000px;
}
.article {
  padding: 64px 0 80px;
  font-size: 18px;
  line-height: 2;
}
</style>
