export const blogs = [
    {
      id: 1,
      title: "Getting Started with Vue 3",
      slug: "getting-started-with-vue-3",
      excerpt: "Learn the basics of Vue 3 and how to set up your first project with the Composition API.",
      content: `
        <p>Vue 3 is the latest version of the Vue.js framework, bringing powerful features like the Composition API, improved performance, and better TypeScript support.</p>
        <h2>Why Vue 3?</h2>
        <p>Vue 3 offers a more flexible and scalable way to build applications. The Composition API allows for better code organization and reuse, making it easier to manage complex projects.</p>
        <h2>Setting Up a Project</h2>
        <p>Run <code>npm create vue@latest</code> to bootstrap a new Vue 3 project. Follow the prompts to configure your project with tools like Vite and Tailwind CSS.</p>
        <h2>Key Features</h2>
        <ul>
          <li>Composition API for modular code.</li>
          <li>Improved performance with Proxy-based reactivity.</li>
          <li>Enhanced TypeScript support.</li>
        </ul>
      `,
      date: "2025-03-15",
      image: "/images/blogs/blogs1.jpg",
      author: "Jane Doe",
      tags: ["Vue.js", "Frontend", "JavaScript"]
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS",
      slug: "mastering-tailwind-css",
      excerpt: "Discover how Tailwind CSS can speed up your styling workflow with utility-first classes.",
      content: `
        <p>Tailwind CSS is a utility-first CSS framework that makes styling fast and intuitive. Instead of writing custom CSS, you apply pre-defined classes directly in your HTML.</p>
        <h2>Benefits of Tailwind</h2>
        <ul>
          <li>Rapid prototyping with utility classes.</li>
          <li>Consistent design with predefined scales.</li>
          <li>Highly customizable with configuration files.</li>
        </ul>
        <h2>Getting Started</h2>
        <p>Install Tailwind via npm and add it to your project. Use the <code>@tailwind</code> directive to include base, components, and utilities.</p>
        <h2>Advanced Tips</h2>
        <p>Leverage Tailwind's JIT compiler for faster builds and create custom utilities in your configuration file for reusable styles.</p>
      `,
      date: "2025-04-01",
      image: "/images/blogs/blogs2.jpg",
      author: "John Smith",
      tags: ["CSS", "Tailwind", "Web Design"]
    },
    {
      id: 3,
      title: "Modern JavaScript Features Every Developer Should Know",
      slug: "modern-javascript-features",
      excerpt: "Explore the essential JavaScript features that have transformed frontend development in recent years.",
      content: `
        <p>JavaScript has evolved significantly over the past decade, introducing powerful features that make code more readable, maintainable, and expressive.</p>
        <h2>ES6 and Beyond</h2>
        <p>Modern JavaScript (ES6+) introduces several syntax improvements and new capabilities that streamline development.</p>
        <h2>Destructuring</h2>
        <p>Destructuring allows you to extract values from objects and arrays into distinct variables with concise syntax.</p>
        <h2>Arrow Functions</h2>
        <p>Arrow functions provide concise syntax and lexical <code>this</code> binding, eliminating many common issues in JavaScript.</p>
        <h2>Asynchronous JavaScript</h2>
        <ul>
          <li><strong>Promises</strong>: Cleaner alternative to callbacks.</li>
          <li><strong>Async/await</strong>: Syntactic sugar over promises.</li>
        </ul>
        <h2>Optional Chaining and Nullish Coalescing</h2>
        <p>Introduced in ES2020, these features help deal with potentially undefined values.</p>
      `,
      date: "2025-04-10",
      image: "/images/blogs/blogs3.jpg",
      author: "Alex Chen",
      tags: ["JavaScript", "ES6", "Frontend", "Web Development"]
    },
    {
      id: 4,
      title: "Introduction to React Hooks",
      slug: "introduction-to-react-hooks",
      excerpt: "Learn how React Hooks revolutionize state management and side effects in functional components.",
      content: `
        <p>React Hooks were introduced in React 16.8 as a way to use state and other React features without writing a class component.</p>
        <h2>Why Hooks?</h2>
        <p>Hooks solve many of the problems developers faced with class components, including complex lifecycle methods and confusing <code>this</code> binding.</p>
        <h2>Core Hooks</h2>
        <ul>
          <li><code>useState</code> - Adds state to functional components.</li>
          <li><code>useEffect</code> - Manages side effects in components.</li>
        </ul>
        <h2>Custom Hooks</h2>
        <p>Create reusable logic with custom hooks. They're functions that start with "use" and may call other hooks.</p>
      `,
      date: "2025-04-18",
      image: "/images/blogs/blogs4.jpg",
      author: "Sarah Johnson",
      tags: ["React", "Hooks", "Frontend", "JavaScript"]
    },
    {
      id: 5,
      title: "Building a REST API with Node.js and Express",
      slug: "building-rest-api-nodejs-express",
      excerpt: "Step-by-step guide to creating a robust RESTful API using Node.js and Express.",
      content: `
        <p>Node.js combined with Express provides a powerful platform for building fast, scalable RESTful APIs.</p>
        <h2>Setting Up the Project</h2>
        <p>Initialize your project and install dependencies:</p>
        <pre><code>npm init -y
  npm install express mongoose dotenv</code></pre>
        <h2>Creating the Server</h2>
        <p>Set up a basic Express server in <code>server.js</code>.</p>
        <h2>Defining Routes</h2>
        <p>Organize your API endpoints using Express Router.</p>
        <h2>Connecting to MongoDB</h2>
        <p>Use Mongoose to connect to your MongoDB database.</p>
      `,
      date: "2025-04-25",
      image: "/images/blogs/blogs5.jpg",
      author: "Michael Brown",
      tags: ["Node.js", "Express", "API", "Backend"]
    }
];