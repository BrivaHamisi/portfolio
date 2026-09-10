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
    image: '/images/sw_1.jpg',
    images: ['/images/sw_1.jpg', '/images/sw_2.jpg', '/images/sw_3.jpg'],
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
  },
]

export const designProjects = [
  {
    id: 'stancap-branding',
    title: 'Graphics Design',
    description: 'Your brand’s personality, captured in a single, powerful logo',
    coverImage: '/images/mockup_1.jpg',
    images: [
      '/images/mockup_1.jpg',
      '/images/mockup_2.jpg',
      '/images/mockup_3.jpg',
      '/images/mockup_4.jpg',
      '/images/mockup_5.jpg',
      '/images/mockup_6.jpg',
      '/images/mockup_7.jpg',
    ],
    client: 'Stancap Enterprises',
    year: '2024',
  },
]

// Intentionally empty — no photography content exists in this repo yet.
// Add an entry here ({ id, title, description, coverImage, images }) once real photos are available.
export const photographyProjects = []

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
  images: ['/images/UI_Mockup4.jpg', '/images/UI_Mockup3.jpg', '/images/UI_Mockup2.jpg', '/images/UI_Mockup1.jpg', '/images/bg_main.jpg', '/images/UI_1.png', '/images/UIDesign.jpg', '/images/UIDesign_2.jpg', '/images/UI_Design3.jpg', '/images/MobileUI.jpg'],
  videoUrl: null,
  fullDescription: 'I design with a deep understanding that great user experiences go beyond just looks. My UI/UX design blends creative flair with strategic thinking, creating interfaces that are visually striking and easy to navigate. Every detail, from color harmony and typography to layout and micro-interactions, is thoughtfully crafted to enhance user engagement. With a strong focus on user behavior and accessibility, I aim to build digital experiences that feel intuitive, foster connection, and deliver value. Whether its for mobile or web, my designs ensure that each interaction is purposeful and fluid, making technology feel human',
  client: 'Stanbest Group (EA) Limited, FOCUS Kenya',
  type: 'User Interface/User Experience Design',
  year: '2023 – 2024',
  previewUrl: 'https://www.figma.com/design/CALoyJqgn3oYv2ryML7BFv/Stanbest?node-id=0-1&t=pMobcroRoDNRfkT5-1',
  quote: "We tend to forget that behind every product, there's a person – a human with dreams, struggles, and emotions. UX design is about connecting the heart of the designer to the heart of the user",
  quoteAuthor: 'Aarron Walter',
}
