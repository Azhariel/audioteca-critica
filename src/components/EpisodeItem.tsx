import React from 'react'
import { Episode } from '../types'

type Props = {
  episode: Episode
  onEpisodeChange: (id: number, listened: boolean) => void
}

const EpisodeItem: React.FC<Props> = ({ episode, onEpisodeChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onEpisodeChange(episode.id, event.target.checked)
  }

  return (
    <li>
      <h2>{episode.title}</h2>
      <p>{episode.description}</p>
      <input
        type="checkbox"
        checked={episode.listened}
        onChange={handleChange}
      />
    </li>
  )
}

export default EpisodeItem
