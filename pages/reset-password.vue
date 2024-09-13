<template>
  <div class="bg-login login-bg">
    <div class="row login-box">
      <div class="text mb-0">
        <h4>Password Reset</h4>
      </div>

      <!-- Password Field -->
      <div class="mb-1">
        <label for="password">Password</label>
        <input
          class="form-control"
          id="password"
          type="password"
          v-model="password"
          :class="{ 'is-invalid': emailerror }"
        />
      </div>

      <!-- Confirm Password Field -->
      <div class="mb-1">
        <label for="confirmPassword">Confirm Password</label>
        <input
          class="form-control"
          id="confirmPassword"
          type="password"
          v-model="Cnfpassword"
          :class="{ 'is-invalid': emailerror }"
        />
      </div>

      <!-- Validation Error Messages -->
      <Error :message="emailerror" v-if="emailerror" />
      <Error :message="minPwdError" v-if="minPwdError" />
      <Error :message="maxPwdError" v-if="maxPwdError" />
      <Error :message="letterCaseError" v-if="letterCaseError" />
      <Error :message="alphaNumericError" v-if="alphaNumericError" />
      <Error :message="specialCharError" v-if="specialCharError" />

      <!-- Submit Button -->
      <div class="d-flex align-items-center mt-3 mb-2">
        <button class="btn login-btn" @click="OnSubmit" :disabled="loader">
          Reset Password
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Error from "~/components/Error";
import Swal from "sweetalert2";
import Loader from "../components/loader.vue";

export default {
  components: { Loader },
  name: "reset-password",
  data() {
    return {
      loader: false,
      userid: "",
      password: "",
      Cnfpassword: "",
      minPwd: false,
      minPwdLength: "",
      maxPwd: false,
      maxPwdLength: "",
      letterCase: false,
      alphaNumeric: false,
      specialChar: false,
      emailerror: null,
      minPwdError: null,
      maxPwdError: null,
      letterCaseError: null,
      alphaNumericError: null,
      specialCharError: null,
      validate: true,
    };
  },
  beforeMount() {
    let urlParams = new URLSearchParams(window.location.search);
    this.userid = urlParams.get("uky");
    this.PasswordCharacteristic();
  },
  methods: {
    async PasswordCharacteristic() {
      try {
        const headers = {
          Authorization: "Bearer " + this.userid,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        const response = await this.$axios.get(
          "system-settings/get-setting/password-characteristic",
          { headers }
        );

        if (response.status === 200) {
          const settings = response.data.setting;
          settings.forEach((setting) => {
            if (setting.status === 1) {
              switch (setting.variable_name) {
                case "minimum-password-length":
                  this.minPwd = true;
                  this.minPwdLength = setting.variable_value;
                  break;
                case "maximum-password-length":
                  this.maxPwd = true;
                  this.maxPwdLength = setting.variable_value;
                  break;
                case "include-uppercase-and-lowercase-letters":
                  this.letterCase = true;
                  break;
                case "include-alphanumeric":
                  this.alphaNumeric = true;
                  break;
                case "include-special-characters":
                  this.specialChar = true;
                  break;
              }
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops... Something Went Wrong!",
            text: response.data.message || "An error occurred while fetching settings.",
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load password settings. Please try again later.",
        });
      }
    },

    async OnSubmit() {
      this.emailerror = null;
      this.validate = true;

      if (!this.password) {
        this.emailerror = "Password is Required!";
        return;
      }
      if (this.password !== this.Cnfpassword) {
        this.emailerror = "Passwords do not match!";
        return;
      }

      this.checkPasswords();

      if (!this.validate) return;

      try {
        this.loader = true;
        const response = await this.$axios.post("reset/password", {
          userid: this.userid,
          password: this.password,
        });

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Password Reset Successful",
            text: "Redirecting to login...",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            this.$router.push("/staff-login");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.message || "Password reset failed. Please try again.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred during password reset. Please try again.",
        });
      } finally {
        this.loader = false;
      }
    },

    checkPasswords() {
      // Reset previous errors
      this.minPwdError = null;
      this.maxPwdError = null;
      this.letterCaseError = null;
      this.alphaNumericError = null;
      this.specialCharError = null;

      if (this.minPwd && this.password.length < this.minPwdLength) {
        this.minPwdError = `Password must be at least ${this.minPwdLength} characters long.`;
        this.validate = false;
      }

      if (this.maxPwd && this.password.length > this.maxPwdLength) {
        this.maxPwdError = `Password must not exceed ${this.maxPwdLength} characters.`;
        this.validate = false;
      }

      if (this.letterCase && !(this.password.match(/[a-z]/) && this.password.match(/[A-Z]/))) {
        this.letterCaseError = "Password must contain both uppercase and lowercase letters.";
        this.validate = false;
      }

      if (this.alphaNumeric && !this.password.match(/\d/)) {
        this.alphaNumericError = "Password must contain both letters and numbers.";
        this.validate = false;
      }

      if (this.specialChar && !this.password.match(/[#?!@$%^&*-]/)) {
        this.specialCharError = "Password must contain at least one special character (e.g., #?!@$%^&*-).";
        this.validate = false;
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
