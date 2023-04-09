import React, { useState } from 'react'
import { Episode } from '../types'
import storageHandler from '../utils/storageHandler'
import Modal from './Modal'

type Props = {
  episode: Episode
  onEpisodeChange: (id: string, listened: boolean) => void
}

const EpisodeItem: React.FC<Props> = ({ episode, onEpisodeChange }) => {
  const [showModal, setShowModal] = useState(false)
  const maxTitleLength = 50
  const maxDescriptionLength = 100

  function handleClick() {
    setShowModal(true)
  }

  function handleClose() {
    setShowModal(false)
  }

  function truncateString(str: string, maxLength: number) {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onEpisodeChange(episode.id, event.target.checked)
  }

  const hasListenedToEpisode = (id: string): boolean => {
    const cookieValue = storageHandler(`episode_${id}`)
    return cookieValue === '1'
  }

  return (
    <div className="episode-card" onClick={handleClick}>
      <img src={episode.image.url} alt={episode.title} />
      <h2>{truncateString(episode.title, maxTitleLength)}</h2>
      <p>
        {truncateString(episode.description.description, maxDescriptionLength)}
      </p>
      {showModal && (
        <Modal onClose={handleClose}>
          <h2>{episode.title}</h2>
          <div>
            {episode.author.map((author) => (
              <p key={`${author}_${episode.id}`}>{author}</p>
            ))}
          </div>
          <p>{episode.description.description}</p>
          <div>
            <input
              type="checkbox"
              checked={hasListenedToEpisode(episode.id)}
              onChange={handleChange}
              id={episode.id}
            />
            <label htmlFor={episode.id}>Já ouvi</label>
          </div>
          <div>
            <a href={episode.textUrl} target="_blank" rel="noreferrer">
              Texto
            </a>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default EpisodeItem
