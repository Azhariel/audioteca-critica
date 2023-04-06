import React from 'react'
import { PageProps } from 'gatsby'
import EpisodesList from '../components/EpisodesList'
import { Episode } from '../types'
const episodesData = require('../data/episodes.json')

type Props = PageProps & {}

export const Head = () => <title>Audioteca Crítica - Guia de Episódios</title>

const IndexPage: React.FC<Props> = () => {
  const percListenedCookieValue =
    Number(
      document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('percentage_listened'))
        ?.split('=')[1],
    ) || 0

  const [episodes, setEpisodes] = React.useState<Episode[]>(episodesData)
  const [percentageListened, setPercentageListened] = React.useState<number>(
    percListenedCookieValue,
  )

  console.log('percentageListened', percentageListened)

  // Create cookie for percentage_listened if it doesn't exist
  if (!document.cookie.includes('percentage_listened')) {
    document.cookie = 'percentage_listened='
  }

  episodesData.forEach((episode: Episode) => {
    const cookieName = `episode_${episode.id}`
    if (!document.cookie.includes(cookieName)) {
      document.cookie = `${cookieName}=`
    }
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
    document.cookie = `episode_${id}=${listened ? 1 : 0}`

    // Calculate percentage of episodes listened to
    const totalEpisodes = episodes.length
    const listenedEpisodes = updatedEpisodes.filter(
      (episode) =>
        document.cookie
          .split('; ')
          .find((cookie) => cookie.startsWith(`episode_${episode.id}`))
          ?.split('=')[1] === '1',
    ).length
    const percentageListened = Math.round(
      (listenedEpisodes / totalEpisodes) * 100,
    )

    setPercentageListened(percentageListened)

    // Create cookie for tracking percentage listened
    const cookieName = 'percentage_listened'
    const cookieValue = `${percentageListened}`
    if (document.cookie.includes(cookieName)) {
      document.cookie = `${cookieName}=${cookieValue}`
    }
  }

  return (
    <div>
      <h1>Audioteca Crítica - Guia de Episódios</h1>
      <EpisodesList episodes={episodes} onEpisodeChange={handleEpisodeChange} />
    </div>
  )
}

export default IndexPage
