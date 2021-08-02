// 埋め込みScriptを実行 https://qiita.com/sakapun/items/7d78f48debb4fd6156cb
export const runEmbedScript = (root: any) => {
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
