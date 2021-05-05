<template lang="pug">
  .worklist-one(
    :style="`transform: perspective(500px) translate3d(${rotateXYZ}); height: ${heightShoter}px; opacity: ${getFadeInOut};`"
    :class="{'sticky-top': -state.topPadding < state.getPosition - state.absYpx,'sticky-bottom': -(state.getViewHeight - state.bottomPadding - state.smallBoxH) > state.getPosition - state.absYpx}"
    )
    .container
      .culumns-2
        .culumn(
          v-for="post in columnPost"
          v-if="post"
          :key="`work-list-${post.fields.slug}`"
          )
          nuxt-link.works-card(:to="`/works/${post.fields.slug}`")
            .top-image(:style="`background-image: url(${post.fields.topImage.fields.file.url});`" :alt="post.fields.topImage.fields.title")
            .over-box
              .title {{post.fields.title}}
        .culumn.culumn--empty(v-else)
</template>
<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  onMounted,
  watch,
} from '@nuxtjs/composition-api'

type State = {
  workListOneStyle: string
  getPosition: number
  getViewHeight: number
  absYpx: number
  topPadding: number
  bottomPadding: number
  bigBoxH: number
  smallBoxH: number
}

type Props = {
  postsRow: number
  columnPost: Array<any>
  position: number
  viewHeight: number
}

export default defineComponent({
  props: {
    postsRow: {
      type: Number,
      default: 0,
    },
    columnPost: {
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
  setup(props: Props) {
    const state = reactive<State>({
      workListOneStyle: '',
      getPosition: 0,
      getViewHeight: 0,
      absYpx: 0,
      topPadding: 24,
      bottomPadding: 24,
      bigBoxH: 240,
      smallBoxH: 60,
    })

    // 消える前にスクロールに合わせてカードの高さを短くする
    const heightShoter = computed((): number => {
      const topHeight = cutMinMax(
        state.smallBoxH,
        state.bigBoxH,
        -(state.getPosition - state.absYpx) + state.bigBoxH - state.topPadding
      )
      const bottomHeight = cutMinMax(
        state.smallBoxH,
        state.bigBoxH,
        state.getPosition -
          state.absYpx +
          (state.getViewHeight - state.bottomPadding)
      )
      return Math.min(topHeight, bottomHeight)
    })
    // スクロールに合わせてopacityが0から1まで変化するよう調整
    const getFadeInOut = computed((): number => {
      return fadeInOut()
    })
    // スクロールに合わせて画面奥へ回転するように見えるXYZ座標を出力 => transformへ
    const rotateXYZ = computed((): string => {
      const fade = fadeInOut()
      const theta = (1 - fade) * Math.PI
      const Y = Math.sin(theta) * 20
      const Z = Math.cos(theta) * 20 - 20 // top
      if (-state.getPosition + state.absYpx < 0) {
        return `0px, ${-Y}px, ${Z}px`
      } else {
        return `0px, ${Y}px, ${Z}px`
      }
    })

    watch(
      () => props.position,
      (newValue: number) => {
        state.getPosition = newValue
      }
    )
    watch(
      () => props.viewHeight,
      (newValue: number) => {
        state.getPosition = newValue
      }
    )

    onMounted(() => {
      state.getViewHeight = props.viewHeight
      state.getPosition = props.position
      const elem: HTMLElement | null = document.getElementById(
        `work-row-${props.postsRow + 1}`
      )
      if (elem) {
        state.absYpx = elem.offsetTop
      }
    })

    // スクロールに合わせてopacityを0から1まで変化するよう調整
    const fadeInOut = (): number => {
      const fadeIn = normalization(
        -state.bigBoxH,
        -(state.bigBoxH - state.smallBoxH - state.topPadding),
        -state.getPosition + state.absYpx
      )
      const fadeOut = normalization(
        -(state.bigBoxH - state.smallBoxH) - state.smallBoxH,
        -(state.bigBoxH - state.smallBoxH - state.bottomPadding),
        state.getPosition - state.absYpx + state.getViewHeight - state.bigBoxH
      )
      return cutMinMax(0, 1, Math.min(fadeIn, fadeOut))
    }
    // 最大値と最小値を指定して、それ以上orそれ以下のとき値固定
    const cutMinMax = (min: number, max: number, data: number): number => {
      if (data > max) {
        return max
      } else if (data < min) {
        return min
      } else {
        return data
      }
    }
    // 正規化
    const normalization = (min: number, max: number, data: number): number => {
      return (data - min) / (max - min)
    }

    return {
      state,
      heightShoter,
      getFadeInOut,
      rotateXYZ,
    }
  },
})
</script>
<style lang="scss" scoped>
.worklist-one {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: $culumnHeightMax;
  z-index: 1;
  &.sticky-top {
    position: fixed;
    top: 24px; // same topPadding
    left: 0;
    z-index: 0;
  }
  &.sticky-bottom {
    position: fixed;
    bottom: 24px; // same bottomPadding
    left: 0;
    z-index: 0;
  }
}
.parameter {
  position: fixed;
}
.container {
  height: 100%;
}
.culumns-2 {
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 0 40px;
}
.culumn {
  width: $culumnHeightMax * 1920 / 1080;
  height: 100%;
}
.works-card {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba($theme-gray-d2, 0.3);
  .top-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: 0.2s ease-out;
  }
  .over-box {
    position: absolute;
    bottom: 8px;
    left: 8px;
    width: calc(100% - 16px);
    height: $culumnHeightMin - 16;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    color: white;
    border-radius: 14px;
    background: rgba(black, 0.8);
    // backdrop-filter: blur(4px);
    transform: translate(0, 0);
  }
  &:hover {
    .top-image {
      transform: scale(1.05);
    }
  }
}
</style>
