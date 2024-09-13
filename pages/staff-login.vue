<template>
  <div class="bg-login bg-login-1">
    <div class="row login-box">
      <img src="~/assets/images/logo-3.png" />
      <Loader v-if="loader" />
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="inputEmail">Login ID</label>
          <input
            class="form-control"
            id="inputEmail"
            v-model="email"
            type="text"
            :class="{ 'is-invalid': emailerror }"
          />
          <div v-if="emailerror" class="invalid-feedback">
            {{ emailerror }}
          </div>
        </div>

        <div class="mb-3 password">
          <label for="inputPassword">Password</label>
          <a class="small ml-auto forgot-password" href="/forget-password">Forgot Password?</a>
          <input
            class="form-control"
            id="inputPassword"
            v-model="password"
            type="password"
            :class="{ 'is-invalid': passerror }"
          />
          <div v-if="passerror" class="invalid-feedback">
            {{ passerror }}
          </div>
        </div>

        <div class="d-flex align-items-center mt-3">
          <button type="submit" class="btn login-btn" :disabled="loader">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'; // SweetAlert2 for alerts
import Loader from "../components/loader.vue";

export default {
  components: { Loader },
  data() {
    return {
      loader: false,
      email: "",
      password: "",
      emailerror: null,
      passerror: null,
    };
  },
  methods: {
    // Function to validate email format using regex
    validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },

    async login() {
      // Reset previous errors
      this.emailerror = null;
      this.passerror = null;

      // Client-side validation
      let valid = true;
      if (!this.email) {
        this.emailerror = "Email is required!";
        valid = false;
      } else if (!this.validateEmail(this.email)) {
        this.emailerror = "Invalid email format!";
        valid = false;
      }
      
      if (!this.password) {
        this.passerror = "Password is required!";
        valid = false;
      }

      // If validation fails, stop the function here
      if (!valid) return;

      // Proceed to login only if validation passes
      try {
        this.loader = true;

        const response = await this.$axios.post("auth/login", {
          email: this.email,
          password: this.password,
          type: ""
        });

        const userDetail = response.data;
        console.log(userDetail);
        console.log(userDetail.code);

        // Handle successful login
        if (response.status === 200) {
          console.log(userDetail);
          localStorage.setItem("userdetails", JSON.stringify(userDetail));
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'Redirecting...',
            timer: 1500,
            showConfirmButton: false
          });
          // Wait for the redirect to complete
          await this.$router.push(userDetail.route_alt);
        } else {
          // Handle error from the server response
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: userDetail.message || 'Incorrect email or password',
          });
        }
      } catch (error) {
        // Check if the error is due to an unauthorized request (401)
        if (error.response && error.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Unauthorized',
            text: 'Incorrect email or password.',
          });
        } else {
          // Handle other errors, e.g., server or network errors
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'An error occurred. Please try again later.',
          });
        }
      } finally {
        this.loader = false;
      }
    },
  },
};
</script>

<style scoped>
/* Styling for invalid input fields */
.is-invalid {
  border-color: red;
}

.invalid-feedback {
  color: red;
  font-size: 0.875em;
}
</style>
