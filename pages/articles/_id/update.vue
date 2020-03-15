<template>
  <div>
      <h1>Update Article</h1>
      <hr>

      <div class="row">
          <div class="col-md-6">
              <form action="" method="post" @submit.prevent="submitForm()">
                  <div class="form-group">
                      <label for="title">Title</label>
                      <input type="text" id="title" class="form-control" :class="{ 'is-invalid': errors && errors.title }" v-model="title">
                      <div class="invalid-feedback" v-if="errors && errors.title">
                          {{ errors.title.msg }}
                      </div>
                  </div>

                  <div class="form-group">
                      <label for="author">Author</label>
                      <input type="text" class="form-control" id="author" :class="{ 'is-invalid': errors && errors.author }" v-model="author">
                      <div class="invalid-feedback" v-if="errors && errors.author">
                          {{ errors.author.msg }}
                      </div>
                  </div>

                  <div class="form-group">
                      <label for="body">Body</label>
                      <textarea id="body" cols="30" rows="4" class="form-control" :class="{ 'is-invalid': errors && errors.body }" v-model="body"></textarea>
                      <div class="invalid-feedback" v-if="errors && errors.body">
                          {{ errors.body.msg }}
                      </div>
                  </div>

                  <input type="submit" class="btn btn-primary mr-3" value="Submit">
                  <nuxt-link :to="'/articles/' + $route.params.id" class="btn btn-primary mr-3">Cancel</nuxt-link>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    middleware: 'auth',
    
    async asyncData(context) {
        const {data} = await context.$axios.get('/api/articles/' + context.route.params.id)
        return {
            article: data
        }
    },

    data() {
        return {
            errors: null,
            title: null,
            author: null,
            body: null
        }
    },

    mounted() {
        this.fillFormData()
    },

    methods: {
        fillFormData() {
            this.title = this.article.title;
            this.author = this.article.author;
            this.body = this.article.body;
        },

        submitForm() {
            console.log(this.$route.params.id);
            this.$axios.put('/api/articles/' + this.$route.params.id, {
                title: this.title,
                author: this.author,
                body: this.body
            }).then((response) => {
                if(response.data._id) {
                    this.$router.push({
                        name: 'articles-id',
                        params: {
                            updated: 'yes',
                            id: this.$route.params.id
                        }
                    })
                }
            }).catch((error) => {
                console.log(error);
                if(error.response.data.errors) {
                    this.errors = error.response.data.errors
                }
            })
        }
    }
}
</script>

<style>

</style>