<template>
  <div class="bg-login login-bg">
    <div class="row login-box">
      <div class="text mb-0">
        <h4>Password Reset</h4>
        <p>Enter your email address and we will send you a link to reset your password.</p>
      </div>

      <div class="mb-1">
        <label for="inputEmail">Email address</label>
        <input
          class="form-control"
          id="inputEmail"
          type="text"
          v-model="email"
          :class="{ 'is-invalid': emailerror }"
        />
        <div v-if="emailerror" class="invalid-feedback">{{ emailerror }}</div>
      </div>

      <div class="d-flex align-items-center mt-3 mb-2">
        <button class="btn login-btn" @click="SendEmail" :disabled="loader">
          <Loader v-if="loader" /> Reset Password
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2"; // Import SweetAlert2 for better UX
import Loader from "../components/loader.vue";

export default {
  components: { Loader },
  data() {
    return {
      loader: false,
      email: "",
      emailerror: null,
    };
  },
  methods: {
    // Email validation method
    validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },

    async SendEmail() {
      this.emailerror = null;

      // Basic validation
      if (!this.email) {
        this.emailerror = "Email is required!";
        return;
      } else if (!this.validateEmail(this.email)) {
        this.emailerror = "Please enter a valid email address!";
        return;
      }

      try {
        this.loader = true; // Start loader

        // API call for sending the reset password email
        const response = await this.$axios.post("mails/forgot-password", {
          emailaddress: this.email,
        });

        // Handle successful response
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Email Sent",
            text: response.data.message,
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.message,
          });
        }
      } catch (error) {
        // Handle API or network error
        Swal.fire({
          icon: "error",
          title: "API Error",
          text: "Unable to send password reset email. Please try again later.",
        });
      } finally {
        this.loader = false; // Stop loader
      }
    },
  },
};
</script>

<style scoped>
.is-invalid {
  border-color: red;
}

.invalid-feedback {
  color: red;
  font-size: 0.875em;
}
</style>
