<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{profile.username}}</h4>
            <p>
              {{profile.bio}}
            </p>
            <div v-if="!isOwner">
              <button
                v-if="following"
                class="btn btn-sm btn-outline-secondary action-btn"
                @click="onFollowClickHandler"
                :class="{disabled: !isLogged}"
                :disabled="!isLogged"
              >
                <i class="ion-minus-round"></i>
                &nbsp;
                <span>Unfollow {{profile.username}}</span>
              </button>
              <button
                v-else
                class="btn btn-sms btn-outline-secondary action-btn"
                :class="{disabled: !isLogged}"
                :disabled="!isLogged"
                @click="onFollowClickHandler"
              >
                <i class="ion-plus-round"></i>
                &nbsp;
                <span>Follow {{profile.username}}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <keep-alive>
            <Articles :isInHome="false"/>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Articles from '@/components/Articles/Articles';

import {
  mapGetters,
  mapActions,
} from 'vuex';

export default {
  name: 'ProfilePage',

  components: {
    Articles,
  },

  computed: {
    ...mapGetters('user', ['loggedUser', 'profile']),
    isOwner() {
      return this.loggedUser.username === this.profile.username
    },
    isLogged() {
      return Object.keys(this.loggedUser).length
    },
    following() {
      return this.isLogged && this.profile.following
    },

  },

  head () {
    return {
      title: `NUXT ${this.profile.username}`,
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },

  watch: {
    $route(to, from) {
      const newUser = to.params.username;
      const currUser = from.params.username;
      if (newUser !== currUser) {
        this.doProfileRequest(newUser);
      }
    },
  },

  methods: {
    ...mapActions('user', [
      'doProfileRequest',
      'doFollowUser',
    ]),

    onFollowClickHandler() {
      const data = {
        username: this.profile.username,
        isFollow: !this.following,
      };

      this.doFollowUser(data);
    },
  },

  created() {
    this.doProfileRequest(this.$route.params.id);
  },

};

</script>

<style lang="scss" scoped>
  .home-page {
    .banner {
      background: #5CB85C;
      box-shadow:
        inset 0 8px 8px -8px rgba(0, 0, 0, 0.3),
        inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3);
    }
  }
</style>

