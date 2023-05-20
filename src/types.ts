import { Layout } from 'gatsby-plugin-image'

export interface Episode {
  id: string
  author: string[]
  title: string
  description: { description: string }
  image: {
    url: string | undefined
    id: string
    gatsbyImageData: {
      images: {
        sources: { srcSet: string; sizes: string; type: string }[]
        placeholder: { fallback: string }
      }
      layout: Layout
      width: number
      height: number
    }
  }
  year: number
  episodeUrl: string
  textUrl: string
}
