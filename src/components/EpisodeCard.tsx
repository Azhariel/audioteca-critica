import {
  EpisodeCardAuthor,
  EpisodeCardButton,
  EpisodeCardContainer,
  EpisodeCardDescription,
  EpisodeCardImage,
  EpisodeCardTitle,
  EpisodeCardYear,
} from '@/styles'
import { Episode } from '@/types'
import storageHandler from '@/utils/storageHandler'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import { useEffect, useState } from 'react'
import Modal from './Modal'

interface EpisodeCardProps {
  episode: Episode
  onListen: (id: string, listened: boolean) => void
}

const EpisodeCard = ({ episode, onListen }: EpisodeCardProps) => {
  const [hasListened, setHasListened] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setHasListened(hasListenedToEpisode(episode.id))
  }, [hasListened, episode.id])

  const handleListen = () => {
    onListen(episode.id, !hasListenedToEpisode(episode.id))
    setHasListened(!hasListened)
  }

  const hasListenedToEpisode = (id: string): boolean => {
    return storageHandler(`episode_${id}`) === '1'
  }

  const openInNewTab = (url: string): void => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const onClickUrl =
    (url: string): (() => void) =>
    () =>
      openInNewTab(url)

  return (
    <EpisodeCardContainer>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <EpisodeCardImage
              src={episode.image.url}
              alt={episode.title}
              onClick={() => setShowModal(true)}
              style={{ width: 'auto', height: '200px' }}
            />
          </div>
          <EpisodeCardTitle onClick={onClickUrl(episode.episodeUrl)}>
            {episode.title}
          </EpisodeCardTitle>
          <EpisodeCardAuthor>
            {episode.author.map((author: string) => author).join(', ')}
          </EpisodeCardAuthor>
          <EpisodeCardYear>{episode.year}</EpisodeCardYear>
          <EpisodeCardDescription full onClick={() => setShowModal(true)}>
            {episode.description.description}
          </EpisodeCardDescription>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <EpisodeCardButton
              onClick={handleListen}
              positive={!hasListened}
              aria-label="Episódio ouvido"
            >
              {hasListened ? <ClearRoundedIcon /> : <CheckRoundedIcon />}
            </EpisodeCardButton>
            <EpisodeCardButton
              outline
              positive
              onClick={onClickUrl(episode.textUrl)}
              aria-label="Texto do episódio"
            >
              Texto
            </EpisodeCardButton>
          </div>
        </Modal>
      )}

      <EpisodeCardImage
        src={episode.image.url}
        alt={episode.title}
        onClick={() => setShowModal(true)}
      />
      <EpisodeCardTitle onClick={onClickUrl(episode.episodeUrl)}>
        {episode.title}
      </EpisodeCardTitle>
      <EpisodeCardAuthor>
        {episode.author.map((author: string) => author).join(', ')}
      </EpisodeCardAuthor>
      <EpisodeCardYear>{episode.year}</EpisodeCardYear>
      <EpisodeCardDescription onClick={() => setShowModal(true)}>
        {episode.description.description}
      </EpisodeCardDescription>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <EpisodeCardButton
          onClick={handleListen}
          positive={!hasListened}
          aria-label="Episódio ouvido"
        >
          {hasListened ? <ClearRoundedIcon /> : <CheckRoundedIcon />}
        </EpisodeCardButton>
        <EpisodeCardButton
          outline
          positive
          onClick={onClickUrl(episode.textUrl)}
          aria-label="Texto do episódio"
        >
          Texto
        </EpisodeCardButton>
      </div>
    </EpisodeCardContainer>
  )
}

export default EpisodeCard
