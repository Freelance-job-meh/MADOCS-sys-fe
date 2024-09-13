<template>
  <div class="message-bg">
    <div class="message-box">
      <p>Your account has been verified successfully.</p>
      <div class="d-flex justify-content-center">
        <a href="/" class="btn btn-success next-btn">
          Next <i class="fad fa-arrow-to-right"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Loader from "../components/loader.vue";

export default {
  components: { Loader },
  name: "verify-account",
  data() {
    return {
      loader: false,
      userid: "",
    };
  },
  beforeMount() {
    const urlParams = new URLSearchParams(window.location.search);
    this.userid = urlParams.get("uky");
    if (this.userid) {
      this.OnSubmit();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No user ID found.",
      });
    }
  },
  methods: {
    async OnSubmit() {
      try {
        this.loader = true;
        const response = await this.$axios.post("reset/verifyAccount", {
          userid: this.userid,
        });

        // Handle successful verification
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Account Verified",
            text: "Your account has been verified successfully.",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            this.$router.push("/staff-login");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Verification Failed",
            text: response.data.message,
          });
        }
      } catch (error) {
        console.error("API error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Unable to verify account. Please try again later.",
        });
      } finally {
        this.loader = false;
      }
    },
  },
};
</script>

<style scoped>
.message-bg {
  background: #f7f6f1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.message-box {
  background: #e2decc;
  border: 0px;
  border-radius: 15px;
  padding: 50px 15px;
  box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 7%);
  width: 500px;
  text-align: center;
  margin: auto;
}
</style>
