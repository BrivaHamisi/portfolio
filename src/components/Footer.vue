<template>
  <div>
    <!-- Faded horizontal line -->
    <div class="max-w-6xl mx-auto px-4">
      <hr class="border-t border-graphite my-8" />
    </div>

    <!-- Footer -->
    <footer class="bg-void text-mist py-8 px-4">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div class="text-caption mb-4 sm:mb-0">
          © Copyright {{ currentYear }} - Hamisi Briva
        </div>
        <div class="flex space-x-6">
          <a
            v-for="(link, index) in socialLinks"
            :key="index"
            :href="link.href"
