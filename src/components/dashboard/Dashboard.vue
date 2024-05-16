<template>
  <div class="dashboard">
    <Header />
    <div class="main-content">
      <SideNav />
      <div class="content">
        <table class="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Email</th>
              <th>Ph Number</th>
              <th>Dob</th>
              <th>country</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <td>
                <img :src="user.image" alt="User Image" style="width: 50px; height: 50px;">
              </td>
              <td>{{ user.email }}</td>
              <td>{{ user.phoneNumber }}</td>
              <td>{{ user.dob }}</td>
              <td>{{ user.country }}</td>
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
import { getAllUser } from "../../api/index";

export default {
  components: {
    Header,
    SideNav,
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await getAllUser();
        console.log(response);
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
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
  overflow-y: auto; /* Enable scrolling if content exceeds container height */
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #dddddd;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
}
</style>
