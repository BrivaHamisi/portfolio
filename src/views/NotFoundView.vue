<template>
  <div class="bg-void min-h-screen flex items-center justify-center px-4 py-24 text-center">
    <div class="max-w-md">
      <p class="text-caption text-fog font-[510] mb-4">404</p>
      <h1 class="text-heading text-paper font-[510] mb-4">Page not found</h1>
      <p class="text-body-sm text-fog mb-8">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <router-link
        to="/"
        v-flashlight
        class="inline-flex bg-acid-lime text-void font-[510] text-body-sm rounded-md px-6 py-3 hover:brightness-95 transition"
      >
        Back to Home
      </router-link>
    </div>
  </div>
</template>
