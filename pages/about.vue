<template lang="pug">
  .about
    .about-header
      img(src="~/assets/imgs/tottori-sakyu.jpg").about-header-img
      .about-header-cover
        .about-header-cover-text About
      .back-index
        nuxt-link(to="./").back-index-link
          ArrowSvg.svg-wrapper
    AboutTop(:style="{transform: `translateY(${aboutPageTop}px`}").about-top-animation
</template>
<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import AboutTop from '~/components/about/AboutTop.vue'
// @ts-ignore
import ArrowSvg from '~/assets/svgs/arrow.svg?inline'

export default defineComponent({
  components: {
    AboutTop,
    ArrowSvg,
  },
  setup() {
    const aboutPageTop = computed((): number => {
      return 200 // this.$store.state.styles.aboutPageTop
    })
    return {
      aboutPageTop,
    }
  },
})
</script>
<style lang="scss" scoped>
.about-header {
  position: relative;
  width: 100%;
  height: 112px;
  background: $light-gray;
  &-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &-cover {
    @include absolute(0, 0, 0, 0);
    width: 100%;
    height: 100%;
    background: rgba($white, 0.9);
    &-text {
      @include absolute(0, 0, 0, 0);
      width: 100%;
      height: min-content;
      text-align: center;
      @include roboto(
        $size: 32px,
        $color: $theme-gray-dark-1,
        $weight: $font-bold
      );
    }
  }
}
.back-index {
  @include fixed($top: 50px, $left: 48px);
  height: min-content;
  &-link {
    @include flex($justifyContent: center);
    width: 48px;
    height: 48px;
    background: $white;
    border-radius: 48px;
    .svg-wrapper {
      display: inline-block;
      margin-right: 2px;
      width: 18px;
      height: 18px;
      transform: rotateZ(90deg);
      .arrow_svg {
        fill: $theme-navy;
      }
    }
  }
  &:hover {
    .back-index-link {
      color: $theme-mint;
    }
    .svg-wrapper .arrow_svg {
      fill: $theme-mint;
    }
  }
}
.about-top-animation {
  animation: aboutTopAnm 0.8s $bezier-fast-ease-out forwards;
}
@keyframes aboutTopAnm {
  0% {
    opacity: 1;
  }
  100% {
    transform: translateY(0);
  }
}
</style>
