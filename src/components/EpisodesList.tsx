import React from 'react'
import EpisodeItem from './EpisodeItem'
import { Episode } from '../types'

type Props = {
  episodes: Episode[]
  onEpisodeChange: (id: number, listened: boolean) => void
}

const EpisodesList: React.FC<Props> = ({ episodes, onEpisodeChange }) => {
  return (
    <ul>
      {episodes.map((episode) => (
        <EpisodeItem
          key={episode.id}
          episode={episode}
          onEpisodeChange={() => onEpisodeChange(episode.id, episode.listened)}
        />
      ))}
    </ul>
  )
}

export default EpisodesList
