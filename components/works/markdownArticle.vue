<template lang="pug">
  .article(ref="root")
    .article-contents(v-html="$md.render(article)")
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUpdated,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    article: {
      type: String,
      default: '',
    },
  },
  setup() {
    const root = ref<HTMLElement>()

    onMounted(() => {
      runScript()
    })
    onUpdated(() => {
      runScript()
    })
    // 埋め込みScriptを実行 https://qiita.com/sakapun/items/7d78f48debb4fd6156cb
    const runScript = () => {
      if (root.value) {
        const scripts = root.value.querySelectorAll('script')
        scripts.forEach((script: any) => {
          const parentNode = script.parentNode
          let alternativeNode: any
          // todo: ホワイトリスト方式にする
          if (script.src.includes('https://gist.github.com/')) {
            alternativeNode = document.createElement('iframe')
            alternativeNode.src = URL.createObjectURL(
              new Blob(['<!DOCTYPE html><title></title>' + script.outerHTML], {
                type: 'text/html',
              })
            )
            alternativeNode.onload = () => {
              alternativeNode.height =
                alternativeNode.contentDocument.body.scrollHeight + 50
            }
          } else if (script.src.includes('//speakerdeck.com/')) {
            alternativeNode = document.createElement('script')
            alternativeNode.async = true
            alternativeNode.classList.add('speakerdeck-embed')
            alternativeNode.setAttribute('data-id', script.dataset.id)
            alternativeNode.setAttribute('data-ratio', script.dataset.ratio)
            alternativeNode.src = script.src
          } else {
            alternativeNode = document.createElement('script')
            alternativeNode.src = script.src
          }
          parentNode.replaceChild(alternativeNode, script)
        })
      }
    }
    return {
      root,
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
