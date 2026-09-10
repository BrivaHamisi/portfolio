<template>
  <div class="bg-void w-full py-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-reveal class="max-w-2xl mx-auto text-center mb-12 pb-8 border-b border-graphite">
        <h2 class="text-heading font-[510] text-paper mb-4">Professional Recommendations</h2>
        <p class="text-body-sm text-fog">Throughout my career, I've had the privilege of collaborating with exceptional professionals across various industries. These individuals have not only witnessed my work firsthand but have also experienced the value I bring to projects and teams. Their words reflect my commitment to excellence, innovation, and client satisfaction. I'm honored to share their recommendations, which speak to my expertise, work ethic, and the positive impact I've made in my field.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="(testimonial, index) in testimonials" :key="index"
             v-reveal="index"
             class="bg-carbon border border-graphite rounded-xl p-8 relative overflow-hidden transition-colors duration-150 hover:border-smoke">
          <svg class="absolute top-6 right-6 w-10 h-10 text-fog opacity-20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
          <img :src="testimonial.avatar" :alt="testimonial.name" class="w-12 h-12 rounded-full object-cover mb-4" />
          <h3 class="font-[510] text-paper text-body-lg mb-1">{{ testimonial.name }}</h3>
          <p class="text-fog text-caption mb-4">{{ testimonial.title }}</p>
          <p class="text-mist text-body-sm leading-relaxed">{{ testimonial.comment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const testimonials = ref([
  {
    name: 'Moses Ngure',
    title: 'Flutter Developer at Uzapoint Technologies',
    avatar: '/images/moses_ngure.jpg',
    comment: "Briva is a designer with a difference. With a keen eye on detail and purpose, he lets his creations speak for themselves. He pays attention to what the customer needs and delivers an outstanding work of art. On building softwares, he's flexible to deliver both mobile and web applications."
  },
  {
    name: 'Maureen Mamo',
    title: 'Economist',
    avatar: '/images/Mamo_M.jpg',
    comment: "Briva's designs are a mark of excellence and creativity. I have had the opportunity to interact with his work over the years, and his commitment to grow and become better is admirable.  He is out to meet the needs and preferences of his clients, he is consistent and with a touch of his creativity produces quality designs from posters to fliers and bronchures."
  },
  {
    name: 'Wachira Maina',
    title: 'Sales & Marketing Consultant',
    avatar: '/images/wachira_maina.jpg',
    comment: "I highly recommend Hamisi Briva for his exceptional skills as a graphic designer. Hamisi's work consistently demonstrates creativity, attention to detail, and a thorough understanding of design principles. He brings fresh, innovative ideas to every project and skillfully translates concepts into visually compelling designs. His professionalism, timely delivery, and adaptability make him a pleasure to work with, and his designs have had a positive impact on our brand. Hamisi’s expertise and dedication to quality make him a valuable asset to any team."
  }
])
</script>
