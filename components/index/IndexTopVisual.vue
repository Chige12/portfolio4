<template lang="pug">
  .top-visual
    .top-visual-background
      img(src="~/assets/imgs/tottori-sakyu.jpg").top-visual-background-img
      .top-visual-background-cover
    .top-visual-logo
      .top-visual-dots
        .top-visual-dots-wrapper
          .tv-dot.tv-dot--pink
          .tv-dot.tv-dot--navy
          .tv-dot.tv-dot--mint
          .tv-dot.tv-dot--green
        .top-visual-dots-wrapper
          .tv-dot.tv-dot--green
          .tv-dot.tv-dot--mint
          .tv-dot.tv-dot--navy
          .tv-dot.tv-dot--pink
      .top-visual-logo-wrapper
        LogoSvg.logo-img
        .logo-txt Portfolio site
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
// @ts-ignore
import LogoSvg from '~/assets/svgs/chige_logo.svg?inline'

export default defineComponent({
  components: {
    LogoSvg,
  },
})
</script>
<style lang="scss" scoped>
.top-visual {
  position: relative;
  height: 100%;
}
.top-visual-background {
  @include absolute(0, 0, 0, 0);
  width: 100%;
  height: calc(100% - (112px * 2));
  background: $theme-gray-light-3;
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
  }
}

.top-visual-dots {
  $dot-height: 22px;
  @include absolute(0, 0, 0, 0);
  @include flex();
  width: 784px;
  height: $dot-height;
  .top-visual-dots-wrapper {
    @include flex();
    width: 160px;
    height: $dot-height;
    .tv-dot {
      width: $dot-height;
      height: $dot-height;
      border: 3px solid $white;
      border-radius: $dot-height / 2;
      &--green {
        background-color: $theme-green;
      }
      &--mint {
        background-color: $theme-mint;
      }
      &--navy {
        background-color: $theme-navy;
      }
      &--pink {
        background-color: $theme-pink;
      }
    }
  }
}
.top-visual-logo-wrapper {
  @include absolute(0, 0, 0, 0);
  width: 200px;
  height: min-content;
  .logo-img {
    display: block;
    width: 100%;
    margin-bottom: 16px;
    .chige_logo_svg {
      fill: $theme-gray-dark-1; //lighten($theme-navy, 4%);
    }
  }
  .logo-txt {
    @include roboto(
      $size: 22px,
      $color: darken($theme-gray-dark-1, 5%),
      $weight: $font-bold
    );
    text-align: center;
  }
}
</style>
