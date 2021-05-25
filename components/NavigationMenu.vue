<template lang="pug">
  .navi-menu
    .navi-menu-wrapper(
      :class="{'navi-menu-wrapper--open':state.isNaviOpened, 'navi-menu-wrapper--hover':state.isNaviBtnHovered}"
      @mouseenter="naviBtnFocus()"
      @mouseleave="naviBtnBlur()"
    )
      button.navi-menu-button(
        @click="toggleNavi()"
        @focus="naviBtnFocus()"
        @blur="naviBtnBlur()"
        ref="naviMenuButton"
      )
        .circle-dot
          .circle-dot-green
          .circle-dot-mint
          .circle-dot-navy
          .circle-dot-pink
      transition(name="flashIn-fadeOut")
        .page-links(v-if="state.isNaviOpened")
          .link-cover(v-for="(page, key) in state.pages" :key="key")
            nuxt-link(@click.native="closeNaviAtLink()" :to="'/'+page.link").link
              .link-over.link-over--gray
                .link-over-text.link-over-text--gray {{page.name}}
              .link-over.link-over--green
                .link-over-text.link-over-text--green {{page.name}}
              .link-text {{page.name}}
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'

// types
type State = {
  isNaviOpened: boolean
  isNaviBtnHovered: boolean
  isNaviBtnHoverOutEnable: boolean
  isNaviBtnHoverOut: boolean
  pages: Array<{
    name: string
    link: string
  }>
}

export default defineComponent({
  setup() {
    const refNaviMenuButton = ref<HTMLButtonElement>()
    const state = reactive<State>({
      isNaviOpened: false,
      isNaviBtnHovered: false,
      isNaviBtnHoverOutEnable: true,
      isNaviBtnHoverOut: true,
      pages: [
        { name: 'Index', link: '' },
        { name: 'About', link: 'about' },
        { name: 'Works', link: 'works' },
        { name: 'Contact', link: 'contact' },
      ],
    })
    const toggleNavi = () => {
      if (state.isNaviOpened) {
        state.isNaviBtnHoverOutEnable = false
        state.isNaviBtnHovered = true
        closeNavi()
      } else {
        openNavi()
      }
    }
    const openNavi = () => {
      state.isNaviOpened = true
    }
    const closeNaviAtLink = async () => {
      state.isNaviBtnHoverOutEnable = false // イベントによるhoverOut不可 アニメーション中にhoverOutイベントで勝手に閉まるのを防ぐ
      state.isNaviBtnHovered = true // hover状態を維持
      await delay(300) // メニューを閉じるまで少し待つ
      closeNavi()
    }
    const closeNavi = async () => {
      state.isNaviOpened = false // メニュー閉じる
      await delay(400) // 閉じるまで待つ(完全には閉じていない)
      state.isNaviBtnHoverOutEnable = true // イベントによるhoverOutを許可
      if (state.isNaviBtnHoverOut) {
        // すでにマウスがhoverOutしていた時
        state.isNaviBtnHovered = false // hoverを外す
        if (refNaviMenuButton.value) {
          const naviMenuButton = refNaviMenuButton.value
          naviMenuButton.blur()
        }
      }
      state.isNaviBtnHoverOut = false // 戻す
    }
    const naviBtnFocus = () => {
      state.isNaviBtnHovered = true
    }
    const naviBtnBlur = () => {
      if (state.isNaviBtnHoverOutEnable) {
        // イベントによるhoverOutが許可されている時
        state.isNaviBtnHovered = false // hoverを外す
        if (refNaviMenuButton.value) {
          const naviMenuButton = refNaviMenuButton.value
          naviMenuButton.blur()
        }
      } else {
        state.isNaviBtnHoverOut = true // マウスがhoverOutしたことを記憶
      }
    }
    const delay = (ms: number) => {
      return new Promise<void>((resolve) => setTimeout(resolve, ms))
    }

    return {
      state,
      toggleNavi,
      closeNaviAtLink,
      naviBtnFocus,
      naviBtnBlur,
    }
  },
})
</script>
<style lang="scss" scoped>
$menu-outline-width: 336px;
$menu-padding: 72px;
$dot-circle-width: 14px;

a,
a:link,
a:visited {
  text-decoration: none;
}

@mixin circle-dot($size: 17px, $color: $theme-gray) {
  width: $size;
  height: $size;
  border-radius: 50%;
  background: $color;
  transition: 0.5s $bezier-fast-ease-out;
}

.navi-menu-wrapper {
  @include fixed($top: 18px + 32px, $right: 48px, $z: $z-navigation-menu);
  width: 118px;
  height: 48px;
  background: $white;
  border-radius: 32px;
  padding: 0;
  box-shadow: 0 0 20px 20px transparent;
  overflow: hidden;
  transition: 0.5s $bezier-fast-ease-out;
}
.navi-menu-button {
  @include absolute($top: 0, $left: 0);
  margin: 0;
  width: 118px;
  height: 48px;
  padding: (48px - $dot-circle-width) / 2 24px;
  cursor: pointer;
  transition: 0.5s $bezier-fast-ease-out;
  .circle-dot {
    @include flex();
    width: 70px;
    height: $dot-circle-width;
    transition: 0.5s $bezier-fast-ease-out;
    &-green {
      @include circle-dot($dot-circle-width, $theme-green);
    }
    &-mint {
      @include circle-dot($dot-circle-width, $theme-mint);
    }
    &-navy {
      @include circle-dot($dot-circle-width, $theme-navy);
    }
    &-pink {
      @include circle-dot($dot-circle-width, $theme-pink);
    }
  }
}
.page-links {
  margin-top: 128px;
  overflow: hidden;
  .link-cover {
    margin: 48px 0;
    height: 32px;
    transition: 0.5s $bezier-fast-ease-out;
  }
}
.link {
  position: relative;
  display: block;
}
.link-text {
  display: block;
  margin: 0;
  @include roboto($size: 32px, $weight: $font-medium, $color: $theme-navy);
}
.link-over,
.link-over .link-over-text {
  @include absolute($top: 0, $left: 0);
  display: block;
  width: 100%;
  height: 100%;
  user-select: none;
}
.link-over {
  background: #fff;
  overflow: hidden;
  transform: translateX(-100%);
  .link-over-text {
    @include roboto($size: 32px, $weight: $font-medium);
    transform: translateX(100%);
  }
}
.link-over--gray {
  transition: all 0.8s $bezier-fast-ease-out,
    background-color 0.5s $bezier-fast-ease-out;
  z-index: 21;
  .link-over-text--gray {
    transition: 0.8s $bezier-fast-ease-out;
    color: $theme-gray-dark-1;
    z-index: 22;
  }
}
.link-over--green {
  transition: 0.8s 0.24s $bezier-fast-ease-out;
  z-index: 23;
  .link-over-text--green {
    transition: 0.8s 0.24s $bezier-fast-ease-out;
    color: $theme-green;
    z-index: 24;
  }
}

.nuxt-link-exact-active {
  .link-over.link-over--gray {
    transform: translateX(0);
    .link-over-text.link-over-text--gray {
      transform: translateX(0);
    }
  }
  .link-over.link-over--green {
    transition: 0.8s 0s $bezier-fast-ease-out;
    transform: translateX(-100%);
    .link-over-text.link-over-text--green {
      transition: 0.8s 0s $bezier-fast-ease-out;
      transform: translateX(100%);
    }
  }
  &:focus {
    .link-over.link-over--green {
      transform: translateX(0);
      .link-over-text.link-over-text--green {
        transform: translateX(0);
      }
    }
  }
}

.navi-menu-wrapper--hover {
  width: $menu-outline-width;
  padding: 0 $menu-padding;
  background: #eee;
  .navi-menu-button {
    width: $menu-outline-width;
    left: 0;
    padding: (48px - $dot-circle-width) / 2 ($menu-outline-width - 108px) / 2; // 上下中央
  }
  .circle-dot {
    width: 108px;
    height: $dot-circle-width;
  }
}

.navi-menu-wrapper--open {
  $dot-circle-width: 16px;
  top: 0;
  width: $menu-outline-width;
  height: 100%;
  border-radius: 0;
  padding: 0 $menu-padding;
  box-shadow: 0 0 20px 20px rgba($theme-navy, 0.02);
  .navi-menu-button {
    top: 72px;
    width: $menu-outline-width;
    padding: (48px - $dot-circle-width) / 2 $menu-padding; // dotをcenterにする
    .circle-dot {
      width: 108px;
      height: $dot-circle-width;
      &-green {
        @include circle-dot($dot-circle-width, $theme-green);
      }
      &-mint {
        @include circle-dot($dot-circle-width, $theme-mint);
      }
      &-navy {
        @include circle-dot($dot-circle-width, $theme-navy);
      }
      &-pink {
        @include circle-dot($dot-circle-width, $theme-pink);
      }
    }
  }
  .link-over {
    background: #fff;
  }
  .about-me {
    bottom: -90vh;
  }
}

.navi-menu-wrapper--open.navi-menu-wrapper--hover {
  $dot-circle-width: 16px;
  background: $white;
  .navi-menu-button {
    padding: (48px - $dot-circle-width) / 2 $menu-padding; // dotをcenterにする
  }
}

// flash in fade out
.flashIn-fadeOut-enter-active {
  transition: 0 $bezier-fast-ease-out;
}
.flashIn-fadeOut-leave-active {
  transition: 0s 0.8s $bezier-fast-ease-out;
}
.flashIn-fadeOut-enter,
.flashIn-fadeOut-leave-to {
  opacity: 0;
}
// .link-over
.flashIn-fadeOut-leave-active .link-over {
  transition: all 0.5s $bezier-fast-ease-out;
}
.flashIn-fadeOut-enter .link-over,
.flashIn-fadeOut-leave-to .link-over {
  background: #eee;
}
// .nuxt-link-exact-active .link-over
.flashIn-fadeOut-leave-active .nuxt-link-exact-active .link-over {
  transition: all 0.5s $bezier-fast-ease-out;
}
.flashIn-fadeOut-enter .nuxt-link-exact-active .link-over,
.flashIn-fadeOut-leave-to .nuxt-link-exact-active .link-over {
  background: #eee;
}

.link:hover,
.link:focus {
  .link-over {
    transform: translateX(0);
    .link-over-text {
      transform: translateX(0);
    }
  }
  .link-over.link-over--green {
    transform: translateX(0);
    .link-over-text.link-over-text--green {
      transform: translateX(0);
    }
  }
}
</style>
