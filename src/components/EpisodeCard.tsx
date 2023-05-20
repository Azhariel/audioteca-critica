import {
  EpisodeCardAuthor,
  EpisodeCardButton,
  EpisodeCardContainer,
  EpisodeCardDescription,
  EpisodeCardTitle,
  EpisodeCardYear,
  StyledGatsbyImage,
} from '@/styles'
import { Episode } from '@/types'
import storageHandler from '@/utils/storageHandler'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import { useEffect, useState } from 'react'
import Modal from './Modal'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Tooltip } from '@mui/material'

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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '510px',
            }}
          >
            <StyledGatsbyImage
              image={episode.image.gatsbyImageData}
              alt={episode.title}
              objectFit="cover"
            />
          </div>
          <EpisodeCardTitle onClick={onClickUrl(episode.episodeUrl)}>
            {episode.title}
          </EpisodeCardTitle>
          <EpisodeCardAuthor>
            {episode.author.map((author: string) => author).join(', ')}
          </EpisodeCardAuthor>
          <EpisodeCardYear>{episode.year}</EpisodeCardYear>
          <EpisodeCardDescription full>
            {episode.description.description}
          </EpisodeCardDescription>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Tooltip
              title={
                hasListened ? 'Desmarcar como ouvido' : 'Marcar como ouvido'
              }
            >
              <EpisodeCardButton
                onClick={handleListen}
                positive={!hasListened}
                aria-label="Episódio ouvido"
              >
                {hasListened ? <ClearRoundedIcon /> : <CheckRoundedIcon />}
              </EpisodeCardButton>
            </Tooltip>
            <Tooltip title="Texto do episódio">
              <EpisodeCardButton
                outline
                positive
                onClick={onClickUrl(episode.textUrl)}
                aria-label="Texto do episódio"
              >
                Texto
              </EpisodeCardButton>
            </Tooltip>
          </div>
        </Modal>
      )}
      <div
        onClick={() => setShowModal(true)}
        style={{ display: 'flex', cursor: 'pointer', maxHeight: '200px' }}
      >
        <GatsbyImage
          image={episode.image.gatsbyImageData}
          alt={episode.title}
          objectFit="cover"
          loading="eager"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            marginBottom: '8px',
          }}
        />
      </div>
      <EpisodeCardTitle onClick={onClickUrl(episode.episodeUrl)}>
        {episode.title}
      </EpisodeCardTitle>
      <EpisodeCardAuthor>
        {episode.author.map((author: string) => author).join(', ')}
      </EpisodeCardAuthor>
      <EpisodeCardYear>{episode.year}</EpisodeCardYear>
      <EpisodeCardDescription
        onClick={() => setShowModal(true)}
        style={{ cursor: 'pointer' }}
      >
        {episode.description.description}
      </EpisodeCardDescription>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Tooltip
          title={hasListened ? 'Desmarcar como ouvido' : 'Marcar como ouvido'}
        >
          <EpisodeCardButton
            onClick={handleListen}
            positive={!hasListened}
            aria-label="Episódio ouvido"
          >
            {hasListened ? <ClearRoundedIcon /> : <CheckRoundedIcon />}
          </EpisodeCardButton>
        </Tooltip>
        <Tooltip title="Texto do episódio">
          <EpisodeCardButton
            outline
            positive
            onClick={onClickUrl(episode.textUrl)}
            aria-label="Texto do episódio"
          >
            Texto
          </EpisodeCardButton>
        </Tooltip>
      </div>
    </EpisodeCardContainer>
  )
}

export default EpisodeCard
