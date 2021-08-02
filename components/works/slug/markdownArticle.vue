<template lang="pug">
  .article(ref="root")
    .article-contents(v-html="$md.render(props.md)" :style="workColorStyle")
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUpdated,
  ref,
} from '@nuxtjs/composition-api'

import computedWorkColorStyle from '~/composables/computedWorkColorStyle'
import { runEmbedScript } from '~/composables/runEmbedScript'

export default defineComponent({
  props: {
    md: {
      type: String,
      default: '',
    },
    mainColor: {
      type: String,
      default: '',
    },
    accentColor: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const root = ref<HTMLElement>()

    const { workColorStyle } = computedWorkColorStyle(
      props.mainColor,
      props.accentColor
    )
    onMounted(() => {
      runEmbedScript(root)
    })
    onUpdated(() => {
      runEmbedScript(root)
    })

    return {
      root,
      props,
      workColorStyle,
    }
  },
})
</script>
<style lang="scss">
.article-contents {
  iframe {
    width: 100%;
    border: none;
    overflow: hidden;
  }
  .columns-2 {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    padding: 32px 0;
    & > .column {
      width: calc(50% - 12px);
    }
  }
  .columns-3 {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    padding: 32px 0;
    & > .column {
      width: calc(33.33% - 16px);
    }
    & > .column-2 {
      width: calc((33.33% - 16px) * 2);
    }
  }
  p {
    margin-bottom: 1em;
  }
  img {
    display: block;
    width: 100%;
  }
  .caption {
    text-align: center;
    font-size: 16px;
  }
  blockquote {
    padding: 16px 24px;
    background-color: $theme-gray-light-4;
    margin-bottom: 1em;
    border-radius: 4px;
    p {
      @include noto($weight: $font-bold, $color: $theme-mint-d1);
      color: var(--accent-color);
      line-height: 1.8;
      margin-bottom: 0;
    }
  }
  p:last-child {
    margin-bottom: 0.1em;
  }
  a:link,
  a:visited {
    color: var(--accent-color);
  }

  // 16:9の構造を作成
  .aspect16-9 {
    width: 100%;
    padding-top: 56.25%;
    position: relative;
    margin: 32px 0;
  }
  .aspect16-9-child {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  // Youtube: 16:9の構造を作成
  .youtube {
    width: 100%;
    padding-top: 56.25%;
    position: relative;
    margin: 32px 0;
  }
  .youtube-iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .speakerdeck-embed-wrapper {
    margin: 32px 0;
  }
}
</style>
