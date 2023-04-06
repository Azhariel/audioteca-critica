import React from 'react'
import { PageProps } from 'gatsby'
import EpisodesList from '../components/EpisodesList'
import { Episode } from '../types'
const episodesData = require('../data/episodes.json')

type Props = PageProps & {}

export const Head = () => <title>Audioteca Crítica - Guia de Episódios</title>

const IndexPage: React.FC<Props> = () => {
  const [episodes, setEpisodes] = React.useState<Episode[]>(episodesData)

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
  }

  return (
    <div>
      <h1>Audioteca Crítica - Guia de Episódios</h1>
      <EpisodesList episodes={episodes} onEpisodeChange={handleEpisodeChange} />
    </div>
  )
}

export default IndexPage
