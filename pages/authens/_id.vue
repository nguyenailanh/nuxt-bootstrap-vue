<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 v-if="isLoginPage" class="text-xs-center">Login</h1>
          <h1 v-else class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link
              v-if="isLoginPage"
              to="/signup"
            >
              Have not an account?
            </router-link>
            <router-link
              v-else
              to="/login"
            >
              Have an account?
            </router-link>
          </p>
          <Login
            v-if="isLoginPage"
            @submitForm="submitFormHandler"
          />
          <Signup
            v-else
            @submitForm="submitFormHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Login from '@/components/Authens/Login';
import Signup from '@/components/Authens/Signup';
import {
  mapActions,
  mapGetters,
} from 'vuex';

export default {
  name: 'Authens',

  components: {
    Login,
    Signup,
  },

  computed: {
    ...mapGetters('user', ['loggedUser']),
    isLoginPage() {
      return this.$route.params.id === 'login'
    }
  },

  head () {
    return {
      title: this.isLoginPage ? 'NUXT Login Page' : 'NUXT Signup Page',
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },

  watch: {
    loggedUser(newVal) {
      if (Object.keys(newVal).length) {
        this.$router.replace('/');
      }
    },
  },

  methods: {
    ...mapActions('user', [
      'doLoginRequest',
      'doSignupRequest',
    ]),

    submitFormHandler(data) {
      if (!!data.username) this.doSignupRequest(data);
      else {
        this.doLoginRequest(data)
          .then((logged) => {
            logged && this.$router.go(-1)
          });
      }
    },
  },
};

</script>


