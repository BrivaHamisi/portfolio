<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <navbar />
    <div class="pt-32">
      <router-view></router-view>
    </div>
  </div>
</template>

<!-- <script>
import navbar from './components/navbar.vue';

export default {
  name: 'App',
  components: {
    navbar
  }
}

window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments) };

</script> -->

<script>
import navbar from './components/navbar.vue';

export default {
  name: 'App',
  components: {
    navbar
  },
  mounted() {
    window.va = window.va || function () {
      (window.vaq = window.vaq || []).push(arguments);
    };
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
