<template>
   <ul class="nav navbar-nav pull-xs-right">
      <li class="nav-item">
        <router-link
          class="nav-link active"
          to="/"
        >
          Home
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :to="{path: '/authens/login', params: {test: 'login'}}"
        >
          Login
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :to="{path: '/authens/signup', params: {test: 'login'}}"
        >
          Signup
        </router-link>
      </li>
    </ul>
</template>


<script>
export default {
  name: 'Logout',
};

</script>
