<template>
  <div id="layoutSidenav">
    <div id="layoutSidenav_nav">
      <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div class="sb-sidenav-menu scrool">
          <div class="nav">
            <ul>
              <div v-for="(menu, index) in navlist" :key="index">
                <li class="sub-menu" v-if="menu.sub_module_id.length">
                  <a class="nav-link" data-bs-toggle="collapse" v-bind:data-bs-target="'#demo' + index"
                    aria-expanded="true">
                    <i v-bind:class="[menu.icon]"></i>
                    {{ menu.screen_name }}
                  </a>
                  <ul class="collapse" v-bind:id="['demo' + index]" aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordion">
                    <li v-for="(submenu, ind) in menu.sub_module_id" :key="ind">
                      <a class="nav-link" v-bind:href="submenu.screen_route">
                        <i v-bind:class="[submenu.icon]"></i>
                        {{ submenu.screen_name }}
                      </a>
                    </li>
                  </ul>
                </li>
                <li v-if="!menu.sub_module_id.length">
                  <a v-bind:href="menu.screen_route" class="nav-link">
                    <i v-bind:class="[menu.icon]"></i>
                    {{ menu.screen_name }}
                  </a>
                </li>
              </div>
             
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  name: "CommonSidebar",
  head: {
    script: [
      {
        src: "/js/bootstrap.bundle.min.js",
        body: true,
        crossorigin: "anonymous",
        type: "text/javascript",
      },
    ],
  },

  data() {
    return {
      userdetails: null,
      navlist: [],
      message: null,

    
    };
  },
  beforeMount() {
    this.userdetails = JSON.parse(localStorage.getItem("userdetails"));
    if (!this.userdetails) {
      this.loader = true;
      try {
        this.$router.push("/");
      } catch (error) {
        this.handleNavigationError(error);
      } finally {
        this.loader = false;
      }
    } else {
      this.role = this.userdetails.role.role_name;
    }

  
    this.GetList();

  },
  mounted() {
    document.body.classList.add("sb-nav-fixed");
    setTimeout(function () {
      sidebarToggle.addEventListener('click', event => {
        event.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
      })
    }, 1000);

    
  },
 
  methods: {
    changesidebar: function (event) {
      event.target.className += " active";
      alert(event.target.className);
    },
 
    async GetList() {
      const headers = {
        Authorization: "Bearer " + this.userdetails.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const response1 = await this.$axios.post(
        "access/sidebar",
        {
          staff_id: this.userdetails.user.id,
          type: this.userdetails.user.role,
        },
        { headers }
      );

      if (response1.data.code == 200) {
        this.navlist = response1.data.list;
       
      } else {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops... Something Went Wrong!',
          text: 'the error is: ' + this.error,
          footer: ''
        })
      }
    },

    async getSessionSettings() {
      const headers = {
        Authorization: "Bearer " + this.userdetails.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const response = await this.$axios.get(
        "system-settings/get-setting/idle-session-timeout",
        { headers }
      );

      if (response.data.code == 200) {
        this.setTimer = parseInt(response.data.setting[0].variable_value);
      } else {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops... Something Went Wrong!',
          text: 'the error is: ' + this.error,
          footer: ''
        })
      }
    },


    logoutUser: function () {
      localStorage.removeItem('userdetails');
      this.loader = true;
      try {
        this.$router.push("/staff-login");
      } catch (error) {
        this.handleNavigationError(error);
      } finally {
        this.loader = false;
      }
    },

    resetTimer: function () {
      clearTimeout(this.warningTimer);
   
    }
  },
};
</script>
