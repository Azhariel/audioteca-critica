import React from 'react'
import { PageProps } from 'gatsby'
import EpisodesList from '../components/EpisodesList'
import { Episode } from '../types'
import { FontStyles } from '../styles'
import cookieHandler from '@/components/cookieHandler'
const episodesData = require('../data/episodes.json')

type Props = PageProps & {}

export const Head = () => {
  return (
    <>
      <title>Audioteca Crítica - Guia de Episódios</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <FontStyles />
    </>
  )
}

const IndexPage: React.FC<Props> = () => {
  const percListenedCookieValue =
    Number(cookieHandler('percentage_listened')) || 0

  const [episodes, setEpisodes] = React.useState<Episode[]>(episodesData)
  const [percentageListened, setPercentageListened] = React.useState<number>(
    percListenedCookieValue,
  )

  // Create cookie for percentage_listened if it doesn't exist
  // if (!cookieHandler('percentage_listened')) {
  //   cookieHandler('percentage_listened')
  // }

  episodesData.forEach((episode: Episode) => {
    const cookieName = `episode_${episode.id}`
    cookieHandler(cookieName)
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
    cookieHandler(`episode_${id}`, listened ? '1' : '0')

    // Calculate percentage of episodes listened to
    const totalEpisodes = episodes.length
    const listenedEpisodes = updatedEpisodes.filter(
      (episode) => cookieHandler(`episode_${episode.id}`) === '1',
    ).length
    const percentageListened = Math.round(
      (listenedEpisodes / totalEpisodes) * 100,
    )

    setPercentageListened(percentageListened)

    // Create cookie for tracking percentage listened
    cookieHandler('percentage_listened', percentageListened.toString())
  }

  return (
    <div>
      <h1>Audioteca Crítica - Guia de Episódios</h1>
      <EpisodesList
        episodes={episodes}
        onEpisodeChange={handleEpisodeChange}
        percentageListened={percentageListened}
      />
    </div>
  )
}

export default IndexPage
