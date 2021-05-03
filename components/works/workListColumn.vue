<template lang="pug">
  .worklist-one(
    :style="`transform: perspective(500px) translate3d(${rotateXYZ}); height: ${heightShoter}px; opacity: ${getFadeInOut};`"
    :class="{'sticky-top': -topPadding < getPosition - absYpx,'sticky-bottom': -(getViewHeight - bottomPadding - smallBoxH) > getPosition - absYpx}"
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
import Vue from 'vue'
export default Vue.extend({
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
  data() {
    return {
      topPadding: 24,
      bottomPadding: 24,
      bigBoxH: 240,
      smallBoxH: 60,
      workListOneStyle: '',
      getPosition: 0,
      getViewHeight: 0,
      absYpx: 0,
    }
  },
  computed: {
    heightShoter(): number {
      const topHeight = this.cutMinMax(
        this.smallBoxH,
        this.bigBoxH,
        -(this.getPosition - this.absYpx) + this.bigBoxH - this.topPadding
      )
      const bottomHeight = this.cutMinMax(
        this.smallBoxH,
        this.bigBoxH,
        this.getPosition -
          this.absYpx +
          (this.getViewHeight - this.bottomPadding)
      )
      return Math.min(topHeight, bottomHeight)
    },
    getFadeInOut(): number {
      return this.fadeInOut()
    },
    rotateXYZ(): string {
      const fade = this.fadeInOut()
      const theta = (1 - fade) * Math.PI
      const Y = Math.sin(theta) * 20
      const Z = Math.cos(theta) * 20 - 20 // top
      if (-this.getPosition + this.absYpx < 0) {
        return `0px, ${-Y}px, ${Z}px`
      } else {
        return `0px, ${Y}px, ${Z}px`
      }
    },
  },
  watch: {
    position(newValue) {
      this.getPosition = newValue
    },
    viewHeight(newValue) {
      this.getViewHeight = newValue
    },
  },
  mounted() {
    this.getViewHeight = this.viewHeight
    this.getPosition = this.position
    const elem: HTMLElement | null = document.getElementById(
      `work-row-${this.postsRow + 1}`
    )
    if (elem) {
      this.absYpx = elem.offsetTop
    }
  },
  methods: {
    fadeInOut() {
      const fadeIn = this.normalization(
        -this.bigBoxH,
        -(this.bigBoxH - this.smallBoxH - this.topPadding),
        -this.getPosition + this.absYpx
      )
      const fadeOut = this.normalization(
        -(this.bigBoxH - this.smallBoxH) - this.smallBoxH,
        -(this.bigBoxH - this.smallBoxH - this.bottomPadding),
        this.getPosition - this.absYpx + this.getViewHeight - this.bigBoxH
      )
      return this.cutMinMax(0, 1, Math.min(fadeIn, fadeOut))
    },
    cutMinMax(min: number, max: number, data: number): number {
      if (data > max) {
        return max
      } else if (data < min) {
        return min
      } else {
        return data
      }
    },
    normalization(min: number, max: number, data: number): number {
      return (data - min) / (max - min)
    },
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
