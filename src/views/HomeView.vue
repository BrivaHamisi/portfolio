<template>
  <div id="home" class="scroll-mt-20">
    <LandingPlatform/>
  </div>
  <div id="about" class="scroll-mt-20">
    <AboutMeSection/>
  </div>
  <div id="skills" class="scroll-mt-20">
    <whatIdo/>
    <ExperienceStats/>
  </div>
  <latestWork id="latestWork"/>

  <ExperienceSection id="experience"/>
  <QuoteSection/>
  <Testimonial/>
  <div id="contact" class="scroll-mt-20">
    <ContactUs/>
  </div>
  <Footer/>
</template>

<script>
// Importing components
import ExperienceSection from '../components/sections/ExperienceSection.vue';
import whatIdo from '../components/sections/whatIdo.vue';
import AboutMeSection from '../components/sections/AboutMeSection.vue';
import latestWork from '../components/sections/latestWork.vue'
import LandingPlatform from '../components/sections/LandingPlatform.vue';
import ContactUs from '../components/sections/ContactUs.vue'
import ExperienceStats from '@/components/sections/ExperienceStats.vue';
import Footer from '../components/Footer.vue';
import Testimonial from '@/components/sections/Testimonial.vue';
import QuoteSection from '@/components/sections/QuoteSection.vue';

export default {
  name: 'HomeView',
  components: {
    whatIdo,
    AboutMeSection,
    ExperienceSection,
    latestWork,
    LandingPlatform,
    ContactUs,
    ExperienceStats,
    Footer,
    Testimonial,
    QuoteSection
  }
}
</script>
