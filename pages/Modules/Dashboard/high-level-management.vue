<template>
  <div id="layoutSidenav">
    <CommonSidebar />
    <div id="layoutSidenav_content">
      <CommonHeader />
      <main>
        <section class="container-fluid">
          <div class="card mb-4">
            <div class="card-header icon-title">
              <a href="#"><i class="fa fa-shield-alt"></i></a>
              <h4>Dashboard</h4>
            </div>
            <div class="image-container">
              <img class="center" :src="comingSoonImage" alt="Coming Soon" />
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
// Lazy loading the components for better performance
const CommonHeader = () => import('../../../components/CommonHeader.vue');
const CommonSidebar = () => import('../../../components/CommonSidebar.vue');

export default {
  components: {
    CommonSidebar,
    CommonHeader,
  },
  name: "Dashboard",

  data() {
    return {
      comingSoonImage: require('~/assets/images/comingsoon.png'),
    };
  },

  methods: {
    // Add any dashboard-specific methods here
  },
};
</script>

<style scoped>
.image-container {
  text-align: center;
  margin: 20px 0;
}

.center {
  height: 30%;
  width: 30%;
}

.icon-title {
  display: flex;
  align-items: center;
}

.icon-title a {
  margin-right: 10px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-header h4 {
  margin: 0;
  font-size: 1.5rem;
}
</style>
