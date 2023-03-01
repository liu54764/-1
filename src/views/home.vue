<template>

  <side />
  <top></top>



</template>

<script>




import side from '../components/side';
import top from '../components/top';

export default{
    name:'home',
  components: {

      side,
    top,

  },

    methods: {
        add()
        {
            this.$store.commit("addCount",3)
        }

    },
}

</script>