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
