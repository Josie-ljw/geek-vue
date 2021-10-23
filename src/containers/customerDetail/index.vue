<template>
  <div class="customer-page">
    <halfVirtual v-if="type === 'half'"/>
    <completevirtual v-if="type === 'complete'"/>
  </div>
</template>

<script>
  import halfVirtual from '@/components/halfVirtual/index'
  import completevirtual from '@/components/completevirtual/index'

  export default {
    components: {
      halfVirtual,
      completevirtual
    },
    data () {
      return {
        id: null,
        type: 'complete'
      }
    },
    created () {
      this.id = this.$route.query.id
    },
    methods: {
      handleChange (select) {
        console.log('click...', select)
        this.currentSelect = select
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
