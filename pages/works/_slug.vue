<template lang="pug">
  .work-one
    header.top-image(:style="`background-image: url(${post.fields.topImage.fields.file.url});`" :alt="post.fields.topImage.fields.title")
      .header-top
        nuxt-link(to="/works").back-link ◀︎ Back
      .header-bottom
        .container
          h1.title {{post.fields.title}}
          p {{post.fields.description}}
          p {{post.fields.date}}
    main
      .container
        .article(v-html="toHtmlString(post.fields.article)")
        ul.gallery-list(v-if="post.fields.gallery")
          li.gallery-list-one(v-for="photo in post.fields.gallery" :key="`${photo.fields.title}`")
            img.gallery-photo(:src="photo.fields.file.url" :alt="photo.fields.title")
            p.gallery-title {{photo.fields.title}}
            p.gallery-description {{photo.fields.description}}
</template>
<script lang="ts">
import Vue from 'vue'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import client from '~/plugins/contentful.js'
export default Vue.extend({
  async asyncData({ params }) {
    // 記事一覧を取得
    const entries = await client.getEntries({
      content_type: 'works',
      'fields.slug': params.slug,
    })
    console.log(entries.items[0])
    return {
      post: entries.items[0],
    }
  },
  data() {
    return {
      position: 0,
      viewHeight: 0,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollEvent)
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollEvent)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    scrollEvent() {
      this.position =
        document.documentElement.scrollTop || document.body.scrollTop
    },
    handleResize() {
      this.viewHeight = window.innerHeight
    },
    toHtmlString(obj: any) {
      return documentToHtmlString(obj)
    },
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
