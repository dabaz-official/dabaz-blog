import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import addClasses from "rehype-add-classes";

// https://astro.build/config
export default defineConfig({
  site: 'https://dabaz-blog.vercel.app/',
  integrations: [mdx(), sitemap(), react(), image(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'material-palenight',
    },
    extendDefaultPlugins: true,
    rehypePlugins: [
      [
        addClasses,
        {
          h1: 'text-lg font-medium text-blue-500 dark:text-blue-400 my-4',
          h2: 'text-2xl font-bold my-4',
          h3: 'text-xl font-bold my-4',
          h4: 'text-lg font-bold',
          h5: 'font-bold',
          h6: 'font-bold',
          img: 'border border-slate-300 dark:border-gray-700 rounded-2xl mb-6',
          p: 'mb-6 pb-6',
          a: 'underline underline-offset-2 hover:text-blue-500 decoration-blue-500',
          hr: 'text-zinc-400',
          code: '',
          ul: 'list-disc',
          table: 'w-full text-center border-collapse border my-4',
          tr: 'border',
          th: 'sticky z-10 top-0 text-md leading-6 font-semibold p-0 text-gray-500 dark:bg-slate-900 dark:text-slate-100 py-2 pr-2 border',
          td: 'border',
          pre: 'rounded-sm px-2 py-2 mb-4',
        }
      ]
    ]
  }
});