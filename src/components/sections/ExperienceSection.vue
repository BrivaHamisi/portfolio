<template>
  <!-- Full width wrapper for the background color -->
  <div class="bg-void w-full scroll-mt-20 py-12 sm:py-16">
    <div class="text-paper px-5 py-8 sm:p-8 max-w-6xl mx-auto">
      <div v-reveal class="flex flex-col md:flex-row items-center md:items-end justify-between gap-5 sm:gap-6 mb-10 sm:mb-12 pb-6 sm:pb-8 border-b border-graphite">
        <div class="text-center md:text-left">
          <p class="text-caption font-[510] uppercase tracking-[0.08em] text-fog mb-3">Career journey</p>
          <h2 class="text-heading font-[510] text-paper">My Resume</h2>
          <p class="text-body-sm text-fog max-w-xl mt-4">A concise view of the work, learning, and experience shaping how I build.</p>
        </div>
        <a
          v-flashlight
          href="https://docs.google.com/document/d/1f3Sd1ETlEa6T2D0vj2uC6mp0B8lTL7Bm00Sa30dh8yU"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full justify-center shrink-0 inline-flex items-center gap-2 bg-acid-lime hover:brightness-95 transition text-void font-[510] text-body-sm py-3 px-6 rounded-md md:w-auto"
        >
          <ArrowDownTrayIcon class="w-5 h-5" />
          Download CV
        </a>
      </div>

      <div class="grid grid-cols-3 gap-2 sm:gap-4 mb-12">
        <div v-for="summary in resumeSummary" :key="summary.label" class="bg-white/[0.02] border border-graphite rounded-md p-3 sm:p-4 text-center">
          <p class="text-subheading sm:text-heading-sm font-[510] text-paper">{{ summary.value }}</p>
          <p class="text-caption text-fog mt-1">{{ summary.label }}</p>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-12 md:gap-8">
        <div v-reveal class="w-full md:w-1/2">
          <h3 class="flex items-center gap-3 text-body-lg font-[510] text-paper mb-6 text-left">
            Experiences
            <span class="h-px flex-1 bg-graphite"></span>
          </h3>
          <div v-for="(job, index) in displayedExperiences" :key="index" class="mb-8 sm:mb-6 relative pl-10">
            <div class="absolute left-0 top-0 h-full w-px bg-graphite"></div>
            <div class="absolute left-0 top-1 w-8 h-8 rounded-full bg-graphite border border-smoke flex items-center justify-center -ml-4 text-caption font-[510] text-mist">
              {{ index + 1 }}
            </div>
            <div class="relative">
              <div class="text-caption font-[510] uppercase tracking-[0.04em] text-fog relative z-10 text-left">{{ job.period }}</div>
            </div>
            <h4 class="text-body-lg font-[510] text-paper mb-1 text-left mt-2 leading-tight">{{ job.title }}</h4>
            <p class="text-mist mb-1 text-left">{{ job.company }}</p>
            <p class="text-body-sm text-fog text-left max-w-prose">{{ job.description }}</p>
          </div>
        </div>

        <div v-reveal class="w-full md:w-1/2">
          <h3 class="flex items-center gap-3 text-body-lg font-[510] text-paper mb-6 text-left">
            Education
            <span class="h-px flex-1 bg-graphite"></span>
          </h3>
          <div v-for="(edu, index) in displayedEducation" :key="index" class="mb-8 sm:mb-6 relative pl-10">
            <div class="absolute left-0 top-0 h-full w-px bg-graphite"></div>
            <div class="absolute left-0 top-1 w-8 h-8 rounded-full bg-graphite border border-smoke flex items-center justify-center -ml-4 text-caption font-[510] text-mist">
              {{ index + 1 }}
            </div>
            <div class="relative">
              <div class="text-caption font-[510] uppercase tracking-[0.04em] text-fog relative z-10 text-left">{{ edu.period }}</div>
            </div>
            <h4 class="text-body-lg font-[510] text-paper mb-1 text-left mt-2 leading-tight">{{ edu.degree }}</h4>
            <p class="text-mist mb-1 text-left">{{ edu.institution }}</p>
            <p class="text-body-sm text-fog text-left max-w-prose">{{ edu.description }}</p>
          </div>
        </div>
      </div>

      <button
        @click="toggleLoadMore"
        :aria-expanded="isShowingAll"
        class="border border-graphite text-mist text-caption py-2 px-4 rounded-md min-h-11 mt-8 block mx-auto hover:border-smoke transition"
      >
        {{ isShowingAll ? 'Show less' : 'Load more' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline'

const experiences = ref([
  {
    period: "2019 - Now",
    title: "Founder and CEO",
    company: "Briva Digital",
    description: "A digital agency focused on Web, Creative Graphic Design, Android App Development, Branding and UI/UX Design. Successfully Designs various creatives and Supports wide range of Customers"
  },
  {
    period: "May 2025 - Now",
    title: "Webmaster",
    company: "Daystar University",
    description: "Responsible for managing and maintaining the university's website to ensure it functions effectively, aligns with the institution's goals, and provides a good user experience"
  },
  {
    period: "Nov 2024 - Now",
    title: "Communications Officer",
    company: "Resilient Woman of Africa",
    description: "Responsible for managing and improving an organization’s internal and external communication. My role involves crafting messages, maintaining the organization's brand, and ensuring effective engagement with various audience"
  },
  {
    period: "Aug 2024 - May 2025",
    title: "Backend Software Engineer",
    company: "Stanbest Group (EA) Limited",
    description: "Integrating POS (Point of Sale) systems with eTIMS(Electronic Tax Invoice Management Systems) Creating RESTFUL APIs"
  },
  {
    period: "2022 - 2024",
    title: "STEM IT",
    company: "FOCUS Kenya",
    description: "Involved in student ministry, offered mentorship and advisory support to students and Christian Union leaders. Facilitated training to students in different Universities/Colleges. Involved in FOCUS Kenya Android Students App Development, FOCUS Kenya Bookstall App Development, FOCUS Student Management System, and FOCUS Tatua Enterprise System. Involved in Creative Graphics Design for FOCUS Productions"
  },
  {
    period: "2022 - 2022",
    title: "IT Support and Graphics Designer",
    company: "ArielTech & Essert Kenya",
    description: "Assisted in the development of responsive web applications using CMS (Content Management Systems) to implement user-friendly interfaces. Designed Creatives for print such as banners, Business cards and Company profiles "
  },
])

const education = ref([
  {
    period: "January 2026 - Present",
    degree: "Master of Science in Information Technology",
    institution: "Kabarak University",
    description: "is a two-year postgraduate program designed to build advanced skills in modern computing, systems development, data management, networking, and IT research. It blends theory with practical, industry-focused training and includes a research project or thesis. The program prepares graduates for senior roles in software development, systems administration, IT leadership, and academia, and also serves as a pathway to doctoral studies"
  },
  {
    period: "Feb 2025 - June 2025",
    degree: "Certificate in Apologetics",
    institution: "St. Paul's University & Apologetics Kenya",
    description: "The Certificate in Apologetics is a groundbreaking 4-month curriculum that seeks to raise 21st century Christian apologists for the African continent and the world."
  },
  {
    period: "June 2022 - November 2022",
    degree: "Android Development",
    institution: "Google Africa Developers Programme",
    description: "It is an initiative by Google aimed at supporting and empowering developers in Africa. It focuses on providing resources, training, and opportunities to developers to help them build high-quality applications, grow their careers, and contribute to the African tech ecosystem."
  },
  {
    period: "September 2018 - December 2022",
    degree: "Bachelor of Science in Computer Science",
    institution: "Kenyatta University, Nairobi",
    description: "Comprehensive study of computer science fundamentals, including data structures, algorithms, software engineering principles, and database management systems."
  },
  {
    period: "Jan 2018 - April 2018",
    degree: "Certificate of Computer Fundamentals",
    institution: "P.C.E.A College, Molo",
    description: "The Certificate of Computer Fundamentals Programme is a full-time course that requires learners to commit to at least 3 hours of learning per week to successfully complete the coursework. The Programme prepares learner with the sought after professional skills for today's digital workforce."
  },
  
])

const itemsToShow = ref(3)
const isShowingAll = ref(false)
const resumeSummary = [
  { value: '6+', label: 'Years experience' },
  { value: '6', label: 'Career roles' },
  { value: '5', label: 'Education milestones' },
]

const displayedExperiences = computed(() => 
  isShowingAll.value ? experiences.value : experiences.value.slice(0, itemsToShow.value)
)
const displayedEducation = computed(() => 
  isShowingAll.value ? education.value : education.value.slice(0, itemsToShow.value)
)

const toggleLoadMore = () => {
  isShowingAll.value = !isShowingAll.value
  if (!isShowingAll.value) {
    itemsToShow.value = 3 
  }
}
</script>