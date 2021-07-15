<template lang="pug">
  article.background-image(
    :style="`background-image: url(${props.post.fields.backgroundImage.fields.file.url});`"
    :class="{'--vivid': isWorkArticleVivid}"
    :id="`wide-work-${props.postKey + 1}`"
    )
    .container.work-link-container
      .work-item-columns(:class="{'--reverse': props.postKey % 2}")
        .work-item-column.work-item-column--left
          img.overwrapImage(
            v-if="props.post.fields.isOverwrapImageShowed"
            :src="props.post.fields.overwrapImage.fields.file.url"
            :alt="props.post.fields.overwrapImage.fields.description || props.post.fields.backgroundImage.fields.title")
        .work-item-column.work-item-column--right
          h3.title
            span.text-underline {{props.post.fields.title}}
          .catchphrase
            span.text-underline(
              v-for="(catchPhrage, catchPhrageKey) in lineReturnTextArray(props.post.fields.catchphrase)"
              :key="catchPhrage"
              ) {{catchPhrage}}
          nuxt-link.link-button(:to="`/works/${props.post.fields.slug}`")
            .link-button-text VIEW MORE
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  computed,
  watch,
} from '@nuxtjs/composition-api'

type State = {
  getPosition: number
  getViewHeight: number
  topYpx: number
  clientHeight: number
  isFirstReloading: boolean
  vividStartYpx: number
  vividEndYpx: number
}

type Props = {
  postKey: number
  post: any
  position: number
  viewHeight: number
}

export default defineComponent({
  props: {
    postKey: {
      type: Number,
      default: 0,
    },
    post: {
      type: Object,
      default: () => {},
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
  setup(props: Props) {
    const state = reactive<State>({
      getPosition: props.position,
      getViewHeight: props.viewHeight,
      topYpx: 0,
      clientHeight: 0,
      isFirstReloading: true,
      vividStartYpx: 0,
      vividEndYpx: 0,
    })

    watch(
      () => props.position,
      (newValue: number) => {
        state.getPosition = newValue
        if (state.isFirstReloading) {
          setTopYpxReload()
        }
      }
    )
    watch(
      () => props.viewHeight,
      (newValue: number) => {
        state.getViewHeight = newValue
      }
    )

    onMounted(() => {
      setTopYpxReload()
    })

    const setTopYpxReload = () => {
      const elem: HTMLElement | null = document.getElementById(
        `wide-work-${props.postKey + 1}`
      )
      if (elem) {
        // 要素の絶対値Y座標と要素の高さを設定
        state.topYpx = elem.offsetTop
        state.clientHeight = elem.clientHeight
        state.isFirstReloading = false
      }
    }

    const isWorkArticleVivid = computed(() => {
      const vividStartYpx = state.topYpx - state.getViewHeight / 2
      const vividEndYpx =
        state.topYpx - state.getViewHeight / 2 + state.clientHeight
      const isWorkArticleVivid =
        vividStartYpx <= state.getPosition && state.getPosition <= vividEndYpx
      return isWorkArticleVivid
    })

    const lineReturnTextArray = (text: string): Array<string> => {
      return text.split(/\n/g)
    }

    return {
      state,
      props,
      isWorkArticleVivid,
      lineReturnTextArray,
    }
  },
})
</script>
<style lang="scss" scoped>
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
.work-item-columns.--reverse {
  flex-direction: row-reverse;
  text-align: right;
  .work-item-column {
    &--right {
      padding-right: 24px;
    }
    &--left {
      padding-left: 24px;
    }
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
