<template>
  <div class="dashboard">
    <Header />
    <div class="main-content">
      <SideNav />
      <div class="content">
        <Modal
          :show="isModalVisible"
          @close="closeModal"
          title="Add New Post"
        ></Modal>
        <div class="button-container">
          <button class="add-post-button" @click="showModal">
            Add New Post
          </button>
        </div>
        <table class="post-table">
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Title</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id">
              <td>{{ post.id }}</td>
              <td>{{ post.title }}</td>
              <td>
                <img
                  :src="post.image"
                  alt="Post Image"
                  width="50"
                  height="50"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../header/Header.vue";
import SideNav from "../sideNav/SideNav.vue";
import Modal from "../modal/Modal.vue";
import { fetchUserPosts } from "../../api/index.js";
import eventBus from "../../utils/eventBus.js";

export default {
  components: {
    Header,
    SideNav,
    Modal,
  },
  data() {
    return {
      isModalVisible: false,
      newPost: {
        title: "",
        image: null,
      },
      errors: {
        title: null,
        image: null,
      },
      posts: [],
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.resetForm();
    },
    async fetchPosts() {
      const userId = localStorage.getItem("userId");
      const { data } = await fetchUserPosts(JSON.parse(userId));
      this.posts = data;
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.newPost.image = file;
        this.errors.image = null;
      }
    },
    validateTitle() {
      this.errors.title = this.newPost.title ? null : "Title is required";
    },
    validateImage() {
      this.errors.image = this.newPost.image ? null : "Image is required";
    },
    validateForm() {
      this.validateTitle();
      this.validateImage();
      return !this.errors.title && !this.errors.image;
    },
    resetForm() {
      this.newPost.title = "";
      this.newPost.image = null;
      this.errors.title = null;
      this.errors.image = null;
    },
  },
  mounted() {
    this.fetchPosts();
    eventBus.on('postAdded', () => {
      this.fetchPosts();
    });
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.add-post-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-post-button:hover {
  background-color: #0056b3;
}

.post-table {
  width: 100%;
  border-collapse: collapse;
}

.post-table th,
.post-table td {
  border: 1px solid #dddddd;
  padding: 8px;
}

.post-table th {
  background-color: #f2f2f2;
}

.post-table img {
  max-width: 100px;
  max-height: 100px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group.has-error input,
.form-group.has-error input[type="file"] {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
