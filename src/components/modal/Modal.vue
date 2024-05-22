<template>
  <div class="modal" v-if="show">
    <div class="modal-content" tabindex="0" @keydown.esc="close">
      <div class="modal-header">
        <h2>{{ title }}</h2>
        <button class="close-btn" @click="close">&times;</button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="submitForm">
          <div class="form-group" :class="{ 'has-error': errors.title }">
            <span v-if="errors.title" class="error-message">{{
              errors.title
            }}</span>
            <input
              style="padding: 5px"
              type="text"
              id="title"
              v-model="formData.title"
              @blur="validateTitle"
              required
            />
            <label for="title">Title</label>
          </div>
          <div
            class="form-group file-group"
            :class="{ 'has-error': errors.image }"
          >
            <span v-if="errors.image" class="error-message">{{
              errors.image
            }}</span>
            <input
              type="file"
              id="image"
              @change="handleFileChange"
              @blur="validateImage"
              accept="image/*"
              required
            />
            <label for="image">Image</label>
            <span v-if="formData.image">{{ formData.image.name }}</span>
          </div>
          <div class="form-group button-group">
            <button type="button" @click="closeModal" class="cancel-btn">
              Cancel
            </button>
            <button type="submit" class="submit-btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { addNewPost } from "../../api/index.js";
import { useToast } from "vue-toastification";
import eventBus from '../../utils/eventBus.js'

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Create New Post",
    },
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      formData: {
        title: "",
        image: null,
      },
      errors: {
        title: null,
        image: null,
      },
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    closeModal() {
      this.resetForm();
      this.close();
    },
    async submitForm() {
      if (this.validateForm()) {
        if (this.formData.image) {
          this.formData.image = await this.toBase64(this.formData.image);
        }
        const userId = localStorage.getItem("userId");
        this.formData.userId = JSON.parse(userId);
        try {
          await addNewPost(this.formData);
          eventBus.emit('postAdded');
          this.toast.success("New Post created successfully");
        } catch (error) {
          this.toast.error(error);
        }
        this.resetForm();
        this.close();
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.formData.image = file;
        this.errors.image = null;
      }
    },
    validateTitle() {
      this.errors.title = this.formData.title ? null : "Title is required";
    },
    validateImage() {
      this.errors.image = this.formData.image ? null : "Image is required";
    },
    validateForm() {
      this.validateTitle();
      this.validateImage();
      return !this.errors.title && !this.errors.image;
    },
    resetForm() {
      this.formData.title = "";
      this.formData.image = null;
      this.errors.title = null;
      this.errors.image = null;
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
  },
};
</script>

<style scoped>
/* Modal Container */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Modal Content */
.modal-content {
  background-color: #fff;
  width: 60%;
  max-width: 500px;
  padding: 20px;
  border-radius: 8px;
  outline: none; /* Remove default focus outline */
}

/* Modal Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

/* Close Button */
.close-btn {
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
}

/* Modal Body */
.modal-body {
  margin-bottom: 15px;
}

/* Form Group */
.form-group {
  display: flex;
  flex-direction: column-reverse; /* Reverse the order */
  margin-bottom: 15px;
}

/* Error styling */
.form-group.has-error input,
.form-group.has-error input[type="file"] {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

/* File Input */
input[type="file"] {
  border: 1px solid #ccc;
  padding: 8px 12px;
  border-radius: 5px;
}

/* Cancel Button */
.cancel-btn {
  background-color: #6c757d;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.cancel-btn:hover {
  background-color: #5a6268;
}

/* Submit Button */
.submit-btn {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.submit-btn:hover {
  background-color: #218838;
}
</style>
