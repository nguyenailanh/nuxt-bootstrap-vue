<template>
   <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Update Your Settings</h1>
          <form
            @submit.prevent="onSubmitHandler">
            <fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    name="image"
                    v-model="dataSend.image"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="User Name"
                    name="username"
                    required
                    v-model="dataSend.username"
                  />
                </fieldset>
                <fieldset
                  class="form-group">
                  <textarea
                    class="form-control form-control-lg"
                    rows="5"
                    placeholder="Short bio about you"
                    name="bio"
                    v-model="dataSend.bio"
                  >
                  </textarea>
                </fieldset>
                <fieldset
                  class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    name="email"
                    required
                    v-model="dataSend.email"
                  />
                </fieldset>
                <fieldset
                  class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    required
                    v-model="dataSend.password"
                  />
                </fieldset>
                <button
                  class="btn btn-lg btn-primary pull-xs-right"
                >
                  Update Settings
                </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions,
} from 'vuex';

export default {
  name: 'Settings',

  data() {
    return {
      dataSend: {
        image: '',
        username: '',
        bio: '',
        email: '',
        password: '',
      },
    };
  },

  meta: {
    requiresAuth: true
  },

  head () {
    return {
      title: 'NUXT Edit Your settings',
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },

  computed: {
    ...mapGetters('user', ['loggedUser']),
  },

  mounted() {
    const {
      image,
      username,
      bio,
      email,
    } = this.loggedUser;

    this.dataSend = { ...{ image, username, bio, email } };
  },

  methods: {
    ...mapActions('user', ['doUpdateSettings']),
    onSubmitHandler() {
      this.doUpdateSettings(this.dataSend)
        .then(() => {
          this.$router.push('/')
        });
    },
  },
};

</script>
