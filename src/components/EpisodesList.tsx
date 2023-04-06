import React from 'react'
import EpisodeItem from './EpisodeItem'
import { Episode } from '../types'
import { Container, Title, ListItem } from '../styles'

type Props = {
  episodes: Episode[]
  onEpisodeChange: (id: number, listened: boolean) => void
}

const EpisodesList: React.FC<Props> = ({ episodes, onEpisodeChange }) => {
  return (
    <Container>
      <Title>Episódios</Title>
      <ul>
        {episodes.map((episode) => (
          <ListItem key={episode.id}>
            <EpisodeItem episode={episode} onEpisodeChange={onEpisodeChange} />
          </ListItem>
        ))}
      </ul>
    </Container>
  )
}

export default EpisodesList
