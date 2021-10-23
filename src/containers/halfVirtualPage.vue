<template>
  <div id="main">
    <half-virtual :hangup="hangup" />
  </div>
</template>

<script>
  import halfVirtual from '@/components/halfVirtual'
  export default {
    components: {
      halfVirtual
    },
    methods: {
      hangup() {
        console.log('挂断了');
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
