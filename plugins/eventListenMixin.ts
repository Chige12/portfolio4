import Vue from 'vue'

type Data = {
  eventRemoversArr: Array<{
    remove(): void
  }>
}

export const eventListenMixin = Vue.extend({
  data(): Data {
    return {
      eventRemoversArr: [],
    }
  },
  destroyed() {
    if (this.eventRemoversArr) {
      this.eventRemoversArr.forEach(function (eventRemover) {
        eventRemover.remove()
      })
    }
  },
  methods: {
    listen(target: any, eventType: string, callback: void) {
      if (!this.eventRemoversArr) {
        this.eventRemoversArr = []
      }
      target.addEventListener(eventType, callback)
      this.eventRemoversArr.push({
        remove(): void {
          target.removeEventListener(eventType, callback)
        },
      })
    },
  },
})
