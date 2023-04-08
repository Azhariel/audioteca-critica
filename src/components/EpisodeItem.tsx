import React from 'react'
import { Episode } from '../types'
import storageHandler from '../utils/storageHandler'

type Props = {
  episode: Episode
  onEpisodeChange: (id: string, listened: boolean) => void
}

const EpisodeItem: React.FC<Props> = ({ episode, onEpisodeChange }) => {
  console.log(episode)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onEpisodeChange(episode.id, event.target.checked)
  }

  const hasListenedToEpisode = (id: string): boolean => {
    const cookieValue = storageHandler(`episode_${id}`)
    return cookieValue === '1'
  }

  return (
    <>
      <h2>{episode.title}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          {episode.author.map((author) => (
            <p key={`${author}_${episode.id}`}>{author}</p>
          ))}
        </div>
        <div>
          <p>{episode.year}</p>
        </div>
      </div>
      <p>{episode.description.description}</p>
      <input
        type="checkbox"
        checked={hasListenedToEpisode(episode.id)}
        onChange={handleChange}
        id={episode.id}
      />
      <label htmlFor={episode.id}>Já ouvi</label>
    </>
  )
}

export default EpisodeItem
