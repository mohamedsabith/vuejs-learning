<template>
  <div class="container">
    <div class="left-half">
      <img
        src="https://www.pngitem.com/pimgs/m/623-6230347_registration-online-vector-png-transparent-png.png"
        alt="Image"
        class="image"
      />
    </div>

    <div class="right-half">
      <button @click="signupWithEmail" class="button signup-button">
        Signup with Email
      </button>

      <GoogleLogin
        :clientId="clientId"
        :callback="loginSuccess"
        @error="loginError"
        class="button google-button"
        prompt="consent"
        :scope="['email','profile','https://www.googleapis.com/auth/calendar']"
      >
        Login with Google
      </GoogleLogin>

      <button @click="loginWithEmail" class="button email-button">
        Login with Email
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleLogin } from "vue3-google-login";
import {
  getGoogleAccessToken,
  getUserDetailsByToken,
} from "../../api/index.js";

export default defineComponent({
  components: {
    GoogleLogin,
  },
  data() {
    return {
      clientId:
        "885861646042-g61v356ajtjaknmiku5hko9ae73b70e6.apps.googleusercontent.com",
    };
  },
  methods: {
    signupWithEmail() {
      this.$router.push("/signup");
    },
    async loginSuccess(userInfo) {
      try {
        const { data } = await getGoogleAccessToken(
          userInfo.code,
          this.clientId
        );
        await getUserDetailsByToken(data.access_token);
      } catch (error) {
        console.log(error);
      }
      localStorage.setItem("isLoggedIn", true);
      this.$router.push("/dashboard");
    },
    loginError(error) {
      console.error("Login error:", error);
    },
    loginWithEmail() {
      this.$router.push("/login");
    },
  },
});
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.left-half,
.right-half {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  max-width: 100%;
  max-height: 100%;
}

.right-half {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
}

.signup-button {
  background-color: #28a745; /* Green */
}

.google-button {
  background-color: #4285f4; /* Blue */
  text-align: center;
}

.email-button {
  background-color: #ff5722; /* Orange */
}

.button {
  margin: 10px;
  padding: 10px 20px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 70%; /* Make buttons take up full width */
}

.button:hover {
  filter: brightness(90%); /* Adjust brightness on hover */
}
</style>
