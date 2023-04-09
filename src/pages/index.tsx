import React, { useCallback, useEffect } from 'react'
import { PageProps, graphql } from 'gatsby'
import EpisodesList from '../components/EpisodesList'
import { Episode } from '../types'
import { FontStyles, NavBar } from '../styles'
import storageHandler from '@/utils/storageHandler'
import ThemeToggler from '@/components/ThemeToggler'

type Query = {
  data: {
    allContentfulEpisode: {
      nodes: Episode[]
    }
  }
}
type Props = PageProps & { data: any }

export const Head = () => {
  return (
    <>
      <title key={'pageTitle'}>Audioteca Crítica - Guia de Episódios</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </>
  )
}

const IndexPage: React.FC<Props> = ({ data }: Query) => {
  const [episodes, setEpisodes] = React.useState<Episode[]>(
    data.allContentfulEpisode.nodes,
  )
  const [percentageListened, setPercentageListened] = React.useState<number>(0)
  const [theme, setTheme] = React.useState('')

  const isDarkMode = () => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark')
    }
    return false
  }

  useEffect(() => {
    const userTheme = storageHandler('theme')
    if (userTheme) {
      setTheme(userTheme)
    }
  }, [theme])

  const toggleTheme = () => {
    const newTheme = isDarkMode() ? 'light' : 'dark'
    console.log(`toggled theme to ${newTheme}`)
    document.documentElement.classList.toggle('dark')
    setTheme(newTheme)
    storageHandler('theme', newTheme)
  }

  const episodePercentage = useCallback(() => {
    // Calculate percentage of episodes listened to
    const totalEpisodes = episodes.length
    const listenedEpisodes = episodes.filter(
      (episode) => storageHandler(`episode_${episode.id}`) === '1',
    ).length
    const percentageListened = Math.round(
      (listenedEpisodes / totalEpisodes) * 100,
    )

    setPercentageListened(percentageListened)

    // Create cookie for tracking percentage listened
    storageHandler('percentage_listened', percentageListened.toString())
  }, [episodes])

  useEffect(() => {
    episodePercentage()
    setPercentageListened(Number(storageHandler('percentage_listened')))
  }, [episodePercentage])

  const handleEpisodeChange = (id: string, listened: boolean) => {
    const updatedEpisodes = episodes.map((episode) => {
      if (episode.id === id) {
        return { ...episode, listened }
      }
      return episode
    })

    setEpisodes(updatedEpisodes)

    // Save episode status in a cookie
    storageHandler(`episode_${id}`, listened ? '1' : '0')
    episodePercentage()
  }

  return (
    <div style={{ marginTop: '75px' }}>
      <FontStyles />
      <NavBar
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: 50,
          alignItems: 'center',
          margin: '0 20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="/logo.png"
            alt="logo da audioteca"
            style={{ height: 40, borderRadius: '12px' }}
          />
          <h1>Audioteca Crítica - Guia de Episódios</h1>
        </div>
        <ThemeToggler handleToggleTheme={toggleTheme} currentTheme={theme} />
      </NavBar>
      <EpisodesList
        theme={theme}
        episodes={episodes}
        onEpisodeChange={handleEpisodeChange}
        percentageListened={percentageListened}
      />
    </div>
  )
}

export const allContentfulEpisode = graphql`
  {
    allContentfulEpisode {
      nodes {
        id
        title
        year
        author
        description {
          description: description
        }
        image {
          url
        }
        episodeUrl
        textUrl
      }
    }
  }
`

export default IndexPage
