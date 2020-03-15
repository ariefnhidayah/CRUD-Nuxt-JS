<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <nuxt-link class="navbar-brand" to="/">Home</nuxt-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle Navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/" exact-active-class="active">Home</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/articles" exact-active-class="active">Articles</nuxt-link>
          </li>
        </ul>

        <ul class="navbar-nav" v-if="!$auth.loggedIn">
          <li class="nav-item">
            <nuxt-link class="nav-link" exact-active-class="active" to="/user/register">
              Register
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" exact-active-class="active" to="/user/login">
              Login
            </nuxt-link>
          </li>
        </ul>

        <ul class="navbar-nav" v-if="$auth.loggedIn">
          <li class="nav-item">
            <nuxt-link class="nav-link" exact-active-class="active" to="/user/my-account">
              My Account
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" exact-active-class="active" to="/user/logout">
              Logout
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
