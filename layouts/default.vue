<template>
  <div class="app">
    <notifications group="error"/>
    <Loading v-if="loading"/>
    <Header @logoutHandler="onLogoutHandler" />
     <div class="row">
      <div
        v-for="(variant, index) in ['primary','secondary','success','outline-success','warning','danger','link']"
        :key="index"
      >
        <div class="col-md-4 pb-2" v-for="size in ['sm','','lg']" :key="`${variant}_${size}`">
            <b-button :size="size" :variant="variant">
                {{variant}} {{size}}
            </b-button>
        </div>
      </div>
     </div>
    
    <nuxt
      :class="{loading: loading}"
    />
    <Footer />
  </div>
</template>

<script>

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loading from '@/components/Misc/Loading';

import {
  mapState,
  mapGetters,
  mapActions,
} from 'vuex';

import {
  clearLoggedUser,
  updateHeader,
} from '@/utils/api';

export default {
  name: 'App',

  components: {
    Header,
    Footer,
    Loading,
  },

  data() {
    return {
      isHome: true
    }
  },

  computed: {
    ...mapState(['loading', 'error']),
    ...mapGetters('user', ['loggedUser']),
    isLogged () {
      return Object.keys(this.loggedUser).length
    }
  },

  mounted() {
    updateHeader(this.loggedUser.token);

  },

  watch: {
    error(newErr) {
      if (newErr !== '') {
        this.$notify({
          group: 'error',
          type: 'error',
          text: newErr,
          position: 'top left',
        })
      }
    },

    $route(to) {
      this.isHome = (to.name === 'Home');
    },

    loading(newVal, oldVal) {
      if (newVal !== oldVal && !newVal) {
        window.scrollTo(0, 0);
      }
    },

    isLogged(newVal) {
      if (newVal) updateHeader(this.loggedUser.token);
    },
  },

  methods: {
    ...mapActions('user', ['doLoginSuccess']),
    onLogoutHandler() {
      clearLoggedUser();

      this.doLoginSuccess({});
      this.$router.replace('/');
    },
  },
};

</script>

<style lang="scss" scoped>
 .loading {
    filter: blur(2px) hue-rotate(45deg) saturate(95%);
    // filter: drop-shadow(30px 10px 4px #4444dd);
  }
  h1 {
    font-size: 46px;
  }

  h4 {
    font-size: 14px;
  }

</style>
