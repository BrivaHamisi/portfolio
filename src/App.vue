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
