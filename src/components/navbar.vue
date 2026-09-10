<template>
  <nav class="bg-void border-b border-graphite fixed top-0 left-0 w-full z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <img class="h-8 w-auto" src="/images/BH_Monogram.png" alt="Briva Hamisi">
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center">
          <div class="flex items-baseline space-x-2">
            <a v-for="item in menuItems" :key="item.name"
               :href="item.route"
               @click="navigateTo(item, $event)"
               class="text-mist hover:underline px-3 py-2 text-caption font-[400] transition-colors duration-150"
               :class="{ 'text-acid-lime': item.ref === activeSection }"
            >
              {{ item.name }}
            </a>
          </div>
          <a href="/#contact" @click="navigateTo({ route: '/#contact' }, $event)"
             class="ml-6 bg-paper text-void rounded-full px-4 py-2 text-caption font-[510] hover:brightness-95 transition">
            Let's Talk
          </a>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="isOpen = !isOpen" type="button" class="bg-transparent inline-flex items-center justify-center p-3 rounded-md text-fog hover:text-paper transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-void focus:ring-acid-lime">
