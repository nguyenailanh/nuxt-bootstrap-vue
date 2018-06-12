<template>
  <div class="header">
    <nav class="navbar navbar-light">
      <div class="container">
        <router-link
          class="navbar-brand"
          to="/"
        >
          conduit
        </router-link>
        <Logged
          v-if="isLogged"
          :user="loggedUser"
          @logoutHandler="$emit('logoutHandler')"
        />
        <logout v-else/>
      </div>
    </nav>
  </div>
</template>

<script>
import Logged from './Header/Logged';
import Logout from './Header/Logout';
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  components: {
    Logged,
    Logout,
  },

  computed: {
    ...mapGetters('user', ['loggedUser']),
     isLogged () {
      return Object.keys(this.loggedUser).length;
    },
  },
};

</script>

<style lang="scss" scoped>
  .navbar-brand {
    color: #41b883 !important;
  }
</style>



