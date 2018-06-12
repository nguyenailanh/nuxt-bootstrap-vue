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
          to="/postarticle"
        >
          <i class="ion-compose">
          </i>&nbsp;New Post
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          to="/settings"
        >
          <i class="ion-gear-a">
          </i>
          &nbsp;Settings
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :to="path"
        >
          <img
            :src="user.image"
            class="user-pic"
            :alt="user.username"
          />
            {{user.username}}
        </router-link>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          href="#"
          @click.prevent="$emit('logoutHandler')"
        >
          Logout
        </a>
      </li>
    </ul>
</template>

<script>
export default {
  name: 'Logged',
  props: ['user'],
  computed: {
    path() {
      return `/user/${this.user.username}`;
    },
  },
};

</script>

