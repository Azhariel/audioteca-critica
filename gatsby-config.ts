import type { GatsbyConfig } from 'gatsby'
import dotenv from 'dotenv'
dotenv.config()

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Audioteca Crítica',
    description: 'Guia de episódios para o podcast Audioteca Crítica',
    siteUrl: 'https://audioteca-critica.vercel.app',
    image: '/images/icon.png',
    instagramUsername: '@audiotecacritica',
  },
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    'gatsby-plugin-pnpm',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_API_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Audioteca Crítica',
        short_name: 'AudiotecaCritica',
        start_url: '/',
        background_color: '#f7f0eb',
        display: 'standalone',
        icon: 'src/images/icon.png',
      },
    },
  ],
  jsxRuntime: 'automatic',
}

export default config
