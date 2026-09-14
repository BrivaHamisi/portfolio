export const categories = [
  { key: 'software', label: 'Development' },
  { key: 'designs', label: 'Graphic Design' },
  { key: 'photography', label: 'Photography' },
  { key: 'uiux', label: 'UI/UX Design' },
]

export const softwareProjects = [
  {
    id: 'stanbest-website',
    title: 'Software Development',
    description: 'Your vision transformed into a seamless digital experience that engages and resonates with your audience. Every element reflects your brand’s unique identity, ensuring your message captivates and builds lasting connections with users.',
    image: '/images/development/sw_1.webp',
    images: ['/images/development/sw_1.webp', '/images/development/sw_2.webp', '/images/development/sw_3.webp'],
    liveUrl: '',
    githubUrl: 'https://github.com/BrivaHamisi',
    videoUrl: null,
    fullDescription: 'This project features a sleek, minimalistic website built with Next.js and styled using Tailwind CSS, emphasizing clean aesthetics and user-friendly navigation. The site includes an integrated AI chatbot that enhances user interaction by providing real-time assistance and personalized responses. By leveraging Next.js for dynamic rendering and Tailwind CSS for a responsive layout, the website not only looks modern and inviting but also delivers a seamless and engaging user experience',
    client: 'Stanbest Group (EA) Limited',
    type: 'Software Development',
    year: '2024',
    previewUrl: 'https://github.com/BrivaHamisi',
    quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    quoteAuthor: 'Martin Fowler',
    problem: 'Stanbest needed a fast, modern web presence that represented the brand credibly and let visitors get answers without waiting on a human.',
    role: 'Sole developer — architecture, frontend build, and AI chatbot integration.',
    outcome: 'Shipped a production Next.js site with an integrated AI chatbot for instant visitor support.',
  },
]

export const designProjects = [
  {
    id: 'stancap-branding',
    title: 'Graphics Design',
    description: 'Your brand’s personality, captured in a single, powerful logo',
    coverImage: '/images/designs/mockup_1.webp',
    images: [
      '/images/designs/mockup_1.webp',
      '/images/designs/mockup_2.webp',
      '/images/designs/mockup_3.webp',
      '/images/designs/mockup_4.webp',
      '/images/designs/mockup_5.webp',
      '/images/designs/mockup_6.webp',
      '/images/designs/mockup_7.webp',
    ],
    client: 'Stancap Enterprises',
    year: '2024',
    problem: 'Stancap Enterprises needed a brand identity that felt professional and consistent everywhere it appeared — apparel, signage, stationery, and packaging.',
    role: 'Sole graphic designer — logo design and full brand mockup set.',
    outcome: "Delivered a versatile logo and mockup suite applied consistently across the client's merchandise and signage.",
  },
]

// DEMO CONTENT — these are freely-licensed placeholder photos (not Briva's own
// work), sourced online at the user's request so this tab isn't empty while a
// real photo set is prepared. The `demo: true` flag drives a visible "Demo
// placeholder" badge in PhotographyView.vue. Replace this entry (and delete
// public/images/photography/demo-*.webp) with real photography when available.
export const photographyProjects = [
  {
    id: 'landscape-demo',
    title: 'Landscape Collection (Demo)',
    description: 'A placeholder set standing in for a real photography portfolio, so this tab has something to show while genuine work is prepared.',
    demo: true,
    coverImage: '/images/photography/demo-1.webp',
    images: [
      '/images/photography/demo-1.webp',
      '/images/photography/demo-2.webp',
      '/images/photography/demo-3.webp',
      '/images/photography/demo-4.webp',
      '/images/photography/demo-5.jpg',
      '/images/photography/demo-6.webp',
    ],
    client: '—',
    year: '2026',
  },
]

export const designLinks = [
  { label: 'Behance', url: 'https://www.behance.net/brivahamisi' },
  { label: 'Dribbble', url: 'https://dribbble.com/_HamisiBriva' },
  { label: 'Pinterest', url: 'https://www.pinterest.com/brivahamisi/' },
]

export const photographyLinks = [
  { label: 'Behance', url: 'https://www.behance.net/brivahamisi' },
]

export const uiuxProject = {
  id: 'stanbest-uiux',
  title: 'UI/UX Design',
  description: 'Seamlessly blending aesthetics with functionality, our UI/UX design transforms user interactions into intuitive, delightful experiences. From sleek interfaces to effortless navigation, we craft digital journeys that captivate and engage, ensuring every click feels natural and meaningful.',
  images: ['/images/uiux/UI_Mockup4.webp', '/images/uiux/UI_Mockup3.webp', '/images/uiux/UI_Mockup2.webp', '/images/uiux/UI_Mockup1.webp', '/images/uiux/bg_main.webp', '/images/uiux/UI_1.webp', '/images/uiux/UIDesign.webp', '/images/uiux/UIDesign_2.webp', '/images/uiux/UI_Design3.webp', '/images/uiux/MobileUI.webp'],
  videoUrl: null,
  fullDescription: 'I design with a deep understanding that great user experiences go beyond just looks. My UI/UX design blends creative flair with strategic thinking, creating interfaces that are visually striking and easy to navigate. Every detail, from color harmony and typography to layout and micro-interactions, is thoughtfully crafted to enhance user engagement. With a strong focus on user behavior and accessibility, I aim to build digital experiences that feel intuitive, foster connection, and deliver value. Whether its for mobile or web, my designs ensure that each interaction is purposeful and fluid, making technology feel human',
  client: 'Stanbest Group (EA) Limited, FOCUS Kenya',
  type: 'User Interface/User Experience Design',
  year: '2023 – 2024',
  previewUrl: 'https://www.figma.com/design/CALoyJqgn3oYv2ryML7BFv/Stanbest?node-id=0-1&t=pMobcroRoDNRfkT5-1',
  quote: "We tend to forget that behind every product, there's a person – a human with dreams, struggles, and emotions. UX design is about connecting the heart of the designer to the heart of the user",
  quoteAuthor: 'Aarron Walter',
  problem: 'Stanbest and FOCUS Kenya needed interfaces that felt considered and easy to use across mobile and web, not just visually polished.',
  role: 'Sole UI/UX designer — research-informed layout, interaction design, and prototyping in Figma.',
  outcome: 'Delivered a cohesive design system and prototypes used to guide development across both products.',
}

export const workImageSizes = {
  '/images/designs/mockup_1.webp': [1920, 1147],
  '/images/designs/mockup_2.webp': [4000, 3000],
  '/images/designs/mockup_3.webp': [1920, 1234],
  '/images/designs/mockup_4.webp': [1920, 1280],
  '/images/designs/mockup_5.webp': [1920, 1600],
  '/images/designs/mockup_6.webp': [1920, 1280],
  '/images/designs/mockup_7.webp': [1920, 1280],
  '/images/photography/demo-1.webp': [1200, 1500],
  '/images/photography/demo-2.webp': [1200, 1500],
  '/images/photography/demo-3.webp': [1200, 1500],
  '/images/photography/demo-4.webp': [1200, 1500],
  '/images/photography/demo-5.jpg': [1200, 1500],
  '/images/photography/demo-6.webp': [1200, 1500],
}
