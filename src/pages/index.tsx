import React, { useCallback, useEffect } from 'react'
import { PageProps } from 'gatsby'
import EpisodesList from '../components/EpisodesList'
import { Episode } from '../types'
import { FontStyles, lightTheme, darkTheme, StyledButton } from '../styles'
import storageHandler from '@/utils/storageHandler'
import { ThemeProvider } from 'styled-components'
const episodesData = require('../data/episodes.json')

type Props = PageProps & {}

export const Head = () => {
  return (
    <>
      <title>Audioteca Crítica - Guia de Episódios</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </>
  )
}

const IndexPage: React.FC<Props> = () => {
  const [episodes, setEpisodes] = React.useState<Episode[]>(episodesData)
  const [percentageListened, setPercentageListened] = React.useState<number>(0)
  const [theme, setTheme] = React.useState('light')
  // console.log(theme)
  // if (typeof document !== 'undefined')
  //   console.log(
  //     document.documentElement.style.getPropertyValue('--initial-color-mode'),
  //   )

  useEffect(() => {
    const userTheme = storageHandler('theme')
    if (userTheme) {
      setTheme(userTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
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

  episodesData.forEach((episode: Episode) => {
    const cookieName = `episode_${episode.id}`
    storageHandler(cookieName)
  })

  const handleEpisodeChange = (id: number, listened: boolean) => {
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
    <div>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <FontStyles />
        <h1>Audioteca Crítica - Guia de Episódios</h1>
        <StyledButton onClick={toggleTheme}>
          {/* {theme === 'light' ? 'Apagar as luzes' : 'Acender as luzes'} */}
          Toggle
        </StyledButton>
        <EpisodesList
          theme={theme}
          episodes={episodes}
          onEpisodeChange={handleEpisodeChange}
          percentageListened={percentageListened}
        />
      </ThemeProvider>
    </div>
  )
}

export default IndexPage
