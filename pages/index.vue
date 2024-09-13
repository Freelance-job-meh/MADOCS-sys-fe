<template>
  <loginHome />
</template>

<script>
export default {
  head() {
      return {
        script: [
          {
            src:
              'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
          }
        ],
        link: [
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
          }
        ]
      }
    },
  // Lazy load the loginHome component
  components: {
    loginHome: () => import('./staff-login.vue')
  },
  name: "IndexPage",
};
</script>
