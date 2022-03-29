<template>
  <FrontNavbar/>
  <router-view></router-view>
  <FrontFooter/>

</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue'
import FrontFooter from '@/components/FrontFooter.vue'

export default {
  components: {
    FrontNavbar,
    FrontFooter
  }
}
</script>
