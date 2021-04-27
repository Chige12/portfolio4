<template lang="pug">
  .works
    .parameter {{position}} {{viewHeight}}
    ul.worklist
      li.worklist-one-wrapper(
        v-for="work in worklist" :key="`worklist-${work}`"
        :id="work"
      )
        .worklist-one(
          :style="`transform: perspective(600px) translate3d(${rotateXYZ(work)}); height: ${heightShoter(work)}px; opacity: ${fadeInOut(work)};`"
          :class="{'sticky-top': topPadding > elementPosition(work),'sticky-bottom': viewHeight - bottomPadding - smallBoxH < elementPosition(work)}"
          ) 
          .container
            .culumns-2
              .culumn {{work}} {{elementPosition(work)}}
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      position: 0,
      viewHeight: 0,
      topPadding: 24,
      bottomPadding: 24,
      bigBoxH: 240,
      smallBoxH: 60,
      worklist: [
        'hoge',
        'foo',
        'bar',
        'hoge2',
        'foo2',
        'bar2',
        'hoge3',
        'foo3',
        'bar3',
      ],
    }
  },
  mounted() {
    document.onscroll = () => {
      this.position =
        document.documentElement.scrollTop || document.body.scrollTop
    }
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.viewHeight = window.innerHeight
    },
    heightShoter(key: string) {
      const elemPosi = this.elementPosition(key)
      const topHeight = this.cutMinMax(
        this.smallBoxH,
        this.bigBoxH,
        elemPosi + this.bigBoxH - this.topPadding
      )
      const bottomHeight = this.cutMinMax(
        this.smallBoxH,
        this.bigBoxH,
        -elemPosi + (this.viewHeight - this.bottomPadding)
      )
      return Math.min(topHeight, bottomHeight)
    },
    fadeInOut(key: string) {
      const elemPosi = this.elementPosition(key)
      const fadeIn = this.normalization(
        -this.bigBoxH,
        -(this.bigBoxH - this.smallBoxH - this.topPadding),
        elemPosi
      )
      const fadeOut = this.normalization(
        -(this.bigBoxH - this.smallBoxH) - this.smallBoxH,
        -(this.bigBoxH - this.smallBoxH - this.bottomPadding),
        -elemPosi + this.viewHeight - this.bigBoxH
      )
      return this.cutMinMax(0, 1, Math.min(fadeIn, fadeOut))
    },
    rotateXYZ(key: string) {
      const elemPosi = this.elementPosition(key)
      const fade = this.fadeInOut(key)
      const theta = (1 - fade) * Math.PI
      const Y = Math.sin(theta) * 20
      const Z = Math.cos(theta) * 20 - 20 // top
      if (elemPosi < 0) {
        return `0px, ${-Y}px, ${Z}px`
      } else {
        return `0px, ${Y}px, ${Z}px`
      }
    },
    elementPosition(key: string) {
      const elem: HTMLElement | null = document.getElementById(key)
      if (elem) {
        return elem.getBoundingClientRect().top
      }
      return 0
    },
    cutMinMax(min: number, max: number, data: number) {
      if (data > max) {
        return max
      } else if (data < min) {
        return min
      } else {
        return data
      }
    },
    normalization(min: number, max: number, data: number) {
      return (data - min) / (max - min)
    },
  },
})
</script>
<style lang="scss" scoped>
.works {
  padding-top: 80px;
}
.worklist {
  list-style: none;
  position: relative;
}
.worklist-one-wrapper {
  position: relative;
  width: 100%;
  height: 240px;
  margin-bottom: 32px;
}
.worklist-one {
  position: relative;
  width: 100%;
  height: 240px;
  background: lightgray;
  overflow: hidden;
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
</style>
