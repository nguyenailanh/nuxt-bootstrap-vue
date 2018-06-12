<template>
  <form @submit.prevent="$emit('submitForm', dataSend)">
     <fieldset class="form-group">
       <input
          class="form-control form-control-lg"
          type="text"
          placeholder="User Name"
          required
          name="username"
          v-model="dataSend['username']"
        />
    </fieldset>
    <fieldset class="form-group">
      <input
        class="form-control form-control-lg"
        type="email"
        placeholder="Email"
        required
        name="email"
        v-model="dataSend['email']"
      />
    </fieldset>
    <fieldset class="form-group">
      <input
        class="form-control form-control-lg"
        type="password"
        required
        placeholder="Password"
        name="password"
        v-model="dataSend['password']"
      />
    </fieldset>
    <button
      class="btn btn-lg btn-primary pull-xs-right"
    >
      Signup
    </button>
  </form>
</template>
<script>
export default {
  name: 'Signup',
  data() {
    return {
      dataSend: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
};

</script>
<style lang="scss" scoped>
  h1 {
    margin-bottom: 20px
  }
</style>


