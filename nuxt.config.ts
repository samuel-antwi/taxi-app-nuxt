import { defineNuxtConfig } from "nuxt"

export default defineNuxtConfig({
  buildModules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxtjs/supabase"],

  typescript: {
    shim: false,
  },

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
})
