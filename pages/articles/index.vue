<template>
  <div>
      <div class="d-flex justify-content-between align-items center">
          <h1>Articles</h1>
          <nuxt-link class="btn btn-success" to="/articles/add" v-if="$auth.loggedIn">Add Article</nuxt-link>
      </div>
      <hr>

      <div class="alert alert-success" v-if="$route.params.created == 'yes'">
          Record addedd successfully
      </div>

      <div class="alert alert-success" v-if="$route.params.deleted == 'yes'">
          Record delete successfully
      </div>

      <div class="list-group" v-if="articles.length">
          <nuxt-link class="list-group-item list-group-item-action" :to="'/articles/' + article._id" v-for="article in articles" :key="article._id">
            {{ article.title }}
          </nuxt-link>
      </div>

      <div class="alert alert-info" v-else>
          No Record Found
      </div>
  </div>
</template>

<script>
export default {
    async asyncData(context) {
        const {data} = await context.$axios.get('/api/articles');
        return {
            articles: data
        }
    },

    head() {
        return {
            title: 'Articles - Nuxt Blog'
        }
    }
}
</script>

<style>

</style>