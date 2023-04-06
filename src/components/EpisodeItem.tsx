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

  const hasListenedToEpisode = (id: number): boolean => {
    const cookieName = `episode_${id}`
    const cookieValue = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith(cookieName))
      ?.split('=')[1]

    return cookieValue === '1'
  }

  return (
    <>
      <h2>{episode.title}</h2>
      <p>{episode.description}</p>
      <input
        type="checkbox"
        checked={hasListenedToEpisode(episode.id)}
        onChange={handleChange}
      />
    </>
  )
}

export default EpisodeItem
