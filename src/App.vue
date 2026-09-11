<template>
  <div class="min-h-screen bg-void text-mist font-sans">
    <ScrollProgress />
    <navbar />
    <main class="pt-32">
      <router-view></router-view>
    </main>
    <Analytics />
    <ScrollToTop />
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
import ScrollToTop from './components/ScrollToTop.vue';
import { Analytics } from '@vercel/analytics/vue';

export default {
  name: 'App',
  components: {
    navbar,
    ScrollProgress,
    ScrollToTop,
    Analytics
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
