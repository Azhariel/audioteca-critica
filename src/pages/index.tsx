import React, { useEffect } from 'react'
import { PageProps } from 'gatsby'
import EpisodesList from '../components/EpisodesList'
import { Episode } from '../types'
import { FontStyles } from '../styles'
import storageHandler from '@/utils/storageHandler'
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
  const [episodes, setEpisodes] = React.useState<Episode[]>(episodesData)
  const [percentageListened, setPercentageListened] = React.useState<number>(0)

  const episodePercentage = () => {
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
  }

  useEffect(() => {
    episodePercentage()
    setPercentageListened(Number(storageHandler('percentage_listened')))
  }, [])

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
