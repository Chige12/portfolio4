import { computed } from '@nuxtjs/composition-api'

export default (mainColor: string, accentColor: string): any => {
  const workColorStyle = computed(() => {
    return {
      '--main-color': mainColor,
      '--accent-color': accentColor,
    }
  })
  return {
    workColorStyle,
  }
}
