<template>
  <div class="min-h-screen bg-void text-mist font-sans">
    <ScrollProgress />
    <navbar />
    <main class="pt-32">
      <router-view></router-view>
    </main>
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
