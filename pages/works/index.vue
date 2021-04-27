<template lang="pug">
  .works#works
    WorkList
</template>
<script lang="ts">
import Vue from 'vue'
import WorkList from '~/components/works/workList.vue'
export default Vue.extend({
  components: {
    WorkList,
  },
})
</script>
<style lang="scss" scoped>
.works {
  padding-top: 80px;
  height: 100%;
}
</style>
