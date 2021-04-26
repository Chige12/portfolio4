<template lang="pug">
  .works
    .parameter {{position}} {{viewHeight}}
    ul.worklist
      li.worklist-one-wrapper(
        v-for="work in worklist" :key="`worklist-${work}`"
        :id="work"
      )
        .worklist-one(
          :style="`transform: translate(0px, 0px);`"
          :class="{'sticky-top': 0 > elementPosition(work),'sticky-bottom': viewHeight-200 < elementPosition(work)}"
          ) {{work}} {{elementPosition(work)}}
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      position: 0,
      viewHeight: 0,
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
    document.onscroll = (e) => {
      this.position =
        document.documentElement.scrollTop || document.body.scrollTop
    }
    this.viewHeight = window.innerHeight
  },
  methods: {
    stopScroll(key: string) {
      const elemPosi = this.elementPosition(key)
      if (elemPosi) {
        return elemPosi < 0 ? -elemPosi : 0
      }
      return 0
    },
    elementPosition(key: string) {
      const elem: HTMLElement | null = document.getElementById(key)
      if (elem) {
        const elemPosi = elem.getBoundingClientRect().top - 36
        return elemPosi
      }
      return 0
    },
    normalization(min: number, max: number, data: number) {
      // 0~-200を正規化
      return (data - min) / (max - min)
    },
  },
})
</script>
<style lang="scss" scoped>
.works {
  padding-top: 20px;
}
.worklist {
  list-style: none;
  position: relative;
}
.worklist-one-wrapper {
  position: relative;
  height: 200px;
  margin: 16px;
}
.worklist-one {
  position: relative;
  height: 200px;
  background: lightgray;
  transition: 0.1s ease-out;
  opacity: 0.7;
}
.parameter {
  position: fixed;
}
.sticky-top {
  position: fixed;
  top: 0;
  left: 0;
  background: red;
}
.sticky-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  background: blue;
}
</style>
