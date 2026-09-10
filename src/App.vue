<template>
  <div class="min-h-screen bg-void text-mist font-sans">
    <ScrollProgress />
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
import ScrollProgress from './components/ScrollProgress.vue';

export default {
  name: 'App',
  components: {
    navbar,
    ScrollProgress
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
