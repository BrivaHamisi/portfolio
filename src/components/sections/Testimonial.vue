<template>
  <div class="bg-void w-full py-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-reveal class="max-w-2xl mx-auto text-center mb-12 pb-8 border-b border-graphite">
        <h2 class="text-heading font-[510] text-paper mb-4">Professional Recommendations</h2>
        <p class="text-body-sm text-fog">Throughout my career, I've had the privilege of collaborating with exceptional professionals across various industries. These individuals have not only witnessed my work firsthand but have also experienced the value I bring to projects and teams. Their words reflect my commitment to excellence, innovation, and client satisfaction. I'm honored to share their recommendations, which speak to my expertise, work ethic, and the positive impact I've made in my field.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="(testimonial, index) in testimonials" :key="index"
