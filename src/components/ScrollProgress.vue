<template>
  <div class="fixed top-0 left-0 w-full h-[2px] bg-graphite z-[60]" aria-hidden="true">
    <div
      class="h-full bg-acid-lime transition-[width] duration-75 ease-linear"
      :style="{ width: progress + '%' }"
    ></div>
  </div>
</template>

<script setup>
