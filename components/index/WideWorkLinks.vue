<template lang="pug">
  ul.wide-work-links#wide-work-links
    li.wide-work-link(
      v-for="(post,postKey) in props.posts"
      :key="`wide-work-${postKey}`"
      )
      article.background-image(
        :style="`background-image: url(${post.fields.backgroundImage.fields.file.url});`"
        :class="{'--vivid': vividWorkKey === postKey+1}"
        )
        .container.work-link-container
          .work-item-columns
            .work-item-column.work-item-column--left
              img.overwrapImage(
                v-if="post.fields.isOverwrapImageShowed"
                :src="post.fields.overwrapImage.fields.file.url"
                :alt="post.fields.overwrapImage.fields.description || post.fields.backgroundImage.fields.title")
            .work-item-column.work-item-column--right
              h3.title
                span.text-underline {{post.fields.title}}
              .catchphrase
                span.text-underline(
                  v-for="(catchPhrage, catchPhrageKey) in lineReturnTextArray(post.fields.catchphrase)"
                  :key="catchPhrage"
                  ) {{catchPhrage}}
              nuxt-link.link-button(:to="`/works/${post.fields.slug}`")
                .link-button-text VIEW MORE
      
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  onMounted,
  watch,
} from '@nuxtjs/composition-api'
// import { cutMinMax } from '@/composables/scrollFunctions'

type State = {
  topYpx: number
  listHeight: number
  getPosition: number
  getViewHeight: number
  isFirstReloading: boolean
}

export default defineComponent({
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
    position: {
      type: Number,
      default: 0,
    },
    viewHeight: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const state = reactive<State>({
      topYpx: 0,
      listHeight: 0,
      getPosition: props.position,
      getViewHeight: props.viewHeight,
      isFirstReloading: true,
    })

    watch(
      () => props.position,
      (newValue: number) => {
        state.getPosition = newValue
        if (state.isFirstReloading) {
          setPosiAndHeight()
        }
      }
    )
    watch(
      () => props.viewHeight,
      (newValue: number) => {
        state.getViewHeight = newValue
        setPosiAndHeight()
      }
    )

    onMounted(() => {
      setPosiAndHeight()
    })

    const setPosiAndHeight = () => {
      // 親要素の絶対値Y座標topと子要素のHeightを取得
      const elem: HTMLElement | null = document.getElementById(
        'wide-work-links'
      )
      if (elem) {
        state.topYpx = elem.offsetTop
        const firstChild: Element | null = elem.children[0]
        if (firstChild) {
          state.listHeight = firstChild.clientHeight
          state.isFirstReloading = false
        }
      }
    }

    const vividWorkKey = computed(() => {
      const getViewHeightCenter = state.getViewHeight / 2
      const centerPosition =
        state.getPosition -
        state.topYpx +
        getViewHeightCenter +
        state.listHeight
      return (centerPosition / state.listHeight) | 0
    })
    const lineReturnTextArray = (text: string): Array<string> => {
      return text.split(/\n/g)
    }

    return {
      state,
      props,
      vividWorkKey,
      lineReturnTextArray,
    }
  },
})
</script>

<style lang="scss" scoped>
ul.wide-work-links {
  list-style: none;
}
.wide-work-link {
  width: 100%;
  height: 640px;
  margin: 0 0;
}
.background-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: grayscale(100%) brightness(60%);
  transition: 1s $ease-out;
}
.background-image.--vivid {
  filter: grayscale(0%) brightness(100%);
}

.work-link-container {
  height: 100%;
}
.work-item-columns {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.work-item-column {
  width: 50%;
  &--right {
    padding-left: 24px;
  }
  &--left {
    padding-right: 24px;
  }
  a:link,
  a:visited {
    text-decoration: none;
  }
}
.overwrapImage {
  display: block;
  width: 100%;
}
.title {
  @include noto($size: 42px, $color: $theme-navy, $weight: $font-bold);
  @include font-kerning;
  line-height: 1;
  margin-bottom: 18px;
  .text-underline {
    display: inline-block;
    padding: 0 4px 4px;
    background: $white;
  }
}
.catchphrase {
  @include noto($size: 20px, $color: $theme-navy, $weight: $font-bold);
  @include font-kerning;
  line-height: 1.2;
  margin-bottom: 40px;
  .text-underline {
    display: inline-block;
    padding: 1px 4px 2px;
    background: $white;
  }
}

.link-button {
  position: relative;
  display: inline-block;
  padding: 10px 32px;
  background: $theme-mint;
  transition: 0.3s $ease-out;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $theme-navy;
    z-index: 0;
    transition: 0.3s $ease-out;
    transform: translateX(-100%);
  }
  &:hover,
  &:focus {
    &::after {
      transform: translateX(0);
    }
  }
}

.link-button-text {
  position: relative;
  z-index: 1;
  @include roboto($size: 30px, $color: $white);
}
</style>
