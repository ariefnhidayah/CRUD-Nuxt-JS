<template>
  <div>
      <h1>My Account</h1>
      <hr>

      <div class="card">
          <div class="card-body">
              <h4>{{ this.$auth.user.full_name }}</h4>
              <div class="mb-5">
                  <strong>Email: </strong> {{ this.$auth.user.email }}
              </div>
              <nuxt-link class="btn btn-danger" to="/user/logout">Logout</nuxt-link>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    middleware: 'auth',
    head() {
        return {
            title: 'My Account'
        }
    }
}
</script>

<style>

</style>