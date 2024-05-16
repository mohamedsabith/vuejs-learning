<template>
  <div class="login-container">
    <div class="left-side">
      <img
        src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?size=338&ext=jpg&ga=GA1.1.34264412.1715558400&semt=ais_user"
        alt="Login Image"
      />
    </div>
    <div class="right-side">
      <form @submit.prevent="handleSubmit">
        <h2>Login</h2>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            v-model="formData.email"
            class="form-control"
            :class="{ 'is-invalid': errors.email }"
            @input="validateField('email')"
            @blur="validateField('email')"
            style="width: 100%"
          />
          <ErrorMessage :message="errors.email" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            class="form-control"
            :class="{ 'is-invalid': errors.password }"
            @input="validateField('password')"
            @blur="validateField('password')"
            style="width: 100%"
          />
          <ErrorMessage :message="errors.password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import ErrorMessage from "../errorMessage/ErrorMessage.vue";
import { validateEmail } from "../../utils/validation.js";
import { signInUserApi } from "../../api/index.js";
import { useToast } from "vue-toastification";

export default {
  components: {
    ErrorMessage,
  },
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      errors: {
        email: "",
        password: "",
      },
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    validateField(field) {
      if (field === "email") {
        this.errors.email = validateEmail(this.formData.email);
      } else if (field === "password") {
        this.errors.password =
          this.formData.password === "" ? "Password is required." : "";
      }
    },
    async handleSubmit() {
      this.validateField("email");
      this.validateField("password");

      if (!this.errors.email && !this.errors.password) {
        try {
          const response = await signInUserApi(
            this.formData.email,
            this.formData.password
          );

          const user = response.data.find(
            (user) =>
              user.email === this.formData.email &&
              user.password === this.formData.password
          );

          if (user) {
            this.toast.success("Login successful!");
            localStorage.setItem('isLoggedIn', true);
            setTimeout(() => {
              this.$router.push("/dashboard");
            }, 3000);
          } else {
            this.toast.error("Invalid email or password.");
          }
        } catch (error) {
          console.error("Error during login:", error);
          this.toast.error("An error occurred. Please try again later.");
        }
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
}

.left-side {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}

.left-side img {
  max-width: 100%;
  height: auto;
}

.right-side {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #ffffff;
}

form {
  max-width: 400px;
  width: 100%;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.is-invalid {
  border-color: red;
}
</style>
