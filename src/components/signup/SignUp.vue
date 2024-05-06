<script>
import Loading from "../loading/Loading.vue";
import { validateEmail, validatePhoneNumber } from "../../utils/validation.js";
import ErrorMessage from "../errorMessage/ErrorMessage.vue";

export default {
  components: {
    Loading,
    ErrorMessage,
  },
  data() {
    return {
      formData: {
        email: "",
        country: "",
        phoneNumber: "",
        dob: "",
        password: "",
        confirmPassword: "",
      },
      errors: {
        email: "",
        country: "",
        phoneNumber: "",
        dob: "",
        password: "",
        confirmPassword: "",
      },
      loading: false,
    };
  },
  methods: {
    onSubmit() {
      this.validateForm();
      if (this.isFormValid) {
        this.loading = true;
        localStorage.setItem("email", JSON.stringify(this.formData.email));
        localStorage.setItem(
          "phoneNumber",
          JSON.stringify(this.formData.phoneNumber)
        );
        setTimeout(() => {
          this.$router.push("/dashboard");
          this.loading = false;
        }, 2000);
      }
    },
    validateForm() {
      this.validateField("email");
      this.validateField("country");
      this.validateField("phoneNumber");
      this.validateField("dob");
      this.validateField("password");
      this.validateField("confirmPassword");
    },
    validateField(fieldName) {
      switch (fieldName) {
        case "email":
          const emailError = validateEmail(this.formData.email);
          this.errors.email = emailError;
          break;
          break;
        case "country":
          if (!this.formData.country) {
            this.errors.country = "Country is required";
          } else {
            this.errors.country = "";
          }
          break;
        case "phoneNumber":
          const phoneNumberError = validatePhoneNumber(
            this.formData.phoneNumber
          );
          this.errors.phoneNumber = phoneNumberError;
          break;
        case "dob":
          const selectedDate = new Date(this.formData.dob);
          const currentDate = new Date();

          if (!this.formData.dob) {
            this.errors.dob = "Date of Birth is required";
          } else if (selectedDate > currentDate) {
            this.errors.dob = "Date of Birth cannot be in the future";
          } else {
            this.errors.dob = "";
          }
          break;
        case "password":
          if (!this.formData.password) {
            this.errors.password = "Password is required";
          } else {
            this.errors.password = "";
          }
          break;
        case "confirmPassword":
          if (
            !this.formData.confirmPassword ||
            this.formData.confirmPassword !== this.formData.password
          ) {
            this.errors.confirmPassword = "Passwords must match";
          } else {
            this.errors.confirmPassword = "";
          }
          break;
      }
    },
  },
  computed: {
    isFormValid() {
      return (
        Object.values(this.errors).every((error) => !error) &&
        Object.values(this.formData).every((value) => value !== "")
      );
    },
  },
};
</script>

<!-- template -->
<template>
  <div class="container-fluid bg-grey">
    <div class="row">
      <div
        class="col-md-6 bg-light d-flex align-items-center justify-content-center"
      >
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-8694031-6983270.png"
          class="img-fluid"
          alt="Image"
          style="height: 600px; width: 600px"
        />
      </div>
      <div class="col-md-6 bg-grey" style="margin-top: 55px">
        <div class="card mt-5 mx-auto" style="max-width: 500px">
          <Loading :isLoading="loading" />
          <div class="card-body">
            <form @submit.prevent="onSubmit">
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
                <label for="country">Country</label>
                <select
                  id="country"
                  v-model="formData.country"
                  class="form-control"
                  :class="{ 'is-invalid': errors.country }"
                  @change="validateField('country')"
                  @blur="validateField('country')"
                  style="width: 100%"
                >
                  <option value="">Select Country</option>
                  <option value="USA">USA</option>
                  <option value="Canada">India</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">UK</option>
                </select>
                <ErrorMessage :message="errors.country" />
              </div>
              <div class="form-group">
                <label for="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  v-model="formData.phoneNumber"
                  class="form-control"
                  :class="{ 'is-invalid': errors.phoneNumber }"
                  @input="validateField('phoneNumber')"
                  @blur="validateField('phoneNumber')"
                  style="width: 100%"
                />
                <ErrorMessage :message="errors.phoneNumber" />
              </div>
              <div class="form-group">
                <label for="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  v-model="formData.dob"
                  class="form-control"
                  :class="{ 'is-invalid': errors.dob }"
                  @change="validateField('dob')"
                  @blur="validateField('dob')"
                  style="width: 100%"
                />
                <ErrorMessage :message="errors.dob" />
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
              <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  v-model="formData.confirmPassword"
                  class="form-control"
                  :class="{ 'is-invalid': errors.confirmPassword }"
                  @input="validateField('confirmPassword')"
                  @blur="validateField('confirmPassword')"
                  style="width: 100%"
                />
                <ErrorMessage :message="errors.confirmPassword" />
              </div>
              <div class="form-group">
                <button
                  type="submit"
                  class="btn btn-primary btn-block"
                  style="width: 100%"
                  :disabled="!isFormValid"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- style -->
<style scoped>
.is-invalid {
  border-color: #dc3545 !important;
}

/* Additional styling for centering and padding */
.container {
  height: 100vh;
}
.card-body {
  padding: 2rem;
}
.form-group {
  margin-bottom: 1.5rem; /* Add margin between form groups */
}
.form-group label {
  display: block; /* Display labels as block elements */
}
.form-control {
  height: 2rem; /* Increase input box height */
  width: 100%;
}
</style>