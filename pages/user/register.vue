<template>
  <div>
      <h1>Register</h1>
      <hr>

      <div class="row">
          <div class="col-md-6">
              <form action="" method="POST" @submit.prevent="submitForm()">
                  <div class="form-group">
                      <label for="full_name">Full Name</label>
                      <input type="text" id="full_name" class="form-control" :class="{ 'is-invalid': errors && errors.full_name }" v-model="full_name">
                      <div class="invalid-feedback" v-if="errors && errors.full_name">
                          {{ errors.full_name.msg }}
                      </div>
                  </div>

                  <div class="form-group">
                      <label for="email">Email</label>
                      <input type="text" class="form-control" id="email" :class="{ 'is-invalid': errors && errors.email }" v-model="email">
                      <div class="invalid-feedback" v-if="errors && errors.email">
                          {{ errors.email.msg }}
                      </div>
                  </div>

                  <div class="form-group">
                      <label for="password">Password</label>
                      <input type="password" class="form-control" id="password" :class="{ 'is-invalid': errors && errors.password }" v-model="password">
                      <div class="invalid-feedback" v-if="errors && errros.password">
                          {{ errors.password.msg }}
                      </div>
                  </div>

                  <input type="submit" class="btn btn-primary mr-3" value="Register">
                  <nuxt-link class="btn btn-secondary mr-3" to="/">Cancel</nuxt-link>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    middleware: 'auth',
    auth: 'guest',
    data() {
        return {
            errors: null,
            full_name: null,
            email: null,
            password: null,
            status: false
        }
    },

    methods: {
        submitForm() {
            this.$axios.post('/api/users/register', {
                full_name: this.full_name,
                email: this.email,
                password: this.password,
            }).then((response) => {
                console.log(response);

                if(response.data._id) {
                    this.$router.push({
                        name: 'user-login',
                        params: {
                            registered: 'yes'
                        }
                    })
                    this.$auth.loginWith('local', {
                        data: {
                            email: this.email,
                            password: this.password
                        }
                    }).catch((error) => {
                        console.log(error)
                        if(error.response.data.errors) {
                            this.errors = error.response.data.errors
                        }
                    })
                }
            })
        }
    },

    head() {
        return {
            title: 'Register'
        }
    }
}
</script>

<style>

</style>