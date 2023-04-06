import React from 'react'
import { PageProps } from 'gatsby'
import EpisodesList from '../components/EpisodesList'
import { Episode } from '../types'
const episodesData = require('../data/episodes.json')

type Props = PageProps & {}

const IndexPage: React.FC<Props> = () => {
  const [episodes, setEpisodes] = React.useState<Episode[]>(episodesData)

  const handleEpisodeChange = (id: number, listened: boolean) => {
    setEpisodes(
      episodes.map((episode) =>
        episode.id === id ? { ...episode, listened } : episode,
      ),
    )
  }

  return (
    <div>
      <h1>My SSR Website</h1>
      <EpisodesList episodes={episodes} onEpisodeChange={handleEpisodeChange} />
    </div>
  )
}

export default IndexPage
