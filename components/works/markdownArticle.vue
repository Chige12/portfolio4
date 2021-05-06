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
    const root = ref()

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
<style>
.article-contents iframe {
  width: 100%;
  border: none;
  overflow: hidden;
}
.article-contents .columns-2 {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 32px 0;
}
.article-contents .columns-2 > .column {
  width: calc(50% - 12px);
}

.article-contents .columns-3 {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 32px 0;
}
.article-contents .columns-3 > .column {
  width: calc(33.33% - 16px);
}
.article-contents .columns-3 > .column-2 {
  width: calc((33.33% - 16px) * 2);
}

.article-contents img {
  display: block;
  width: 100%;
}
.article-contents .caption {
  text-align: center;
  font-size: 16px;
}
</style>
