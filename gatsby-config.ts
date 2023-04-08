import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    'gatsby-plugin-pnpm',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
  jsxRuntime: 'automatic',
}

export default config
