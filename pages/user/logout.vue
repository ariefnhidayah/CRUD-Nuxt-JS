<template>
  <div>
      <h1>Loggout</h1>
      <hr>

      <p>Please wait...</p>
  </div>
</template>

<script>
export default {
    middleware: 'auth',

    async asyncData (context) {
        await context.$auth.logout()
    },
}
</script>

<style>

</style>