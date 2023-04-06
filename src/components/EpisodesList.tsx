import React from 'react'
import EpisodeItem from './EpisodeItem'
import { Episode } from '../types'
import { Container, Title, ListItem } from '../styles'
import LinearProgress from '@mui/material/LinearProgress'

type Props = {
  episodes: Episode[]
  onEpisodeChange: (id: number, listened: boolean) => void
  percentageListened: number
}

const EpisodesList: React.FC<Props> = ({
  episodes,
  onEpisodeChange,
  percentageListened,
}) => {
  return (
    <Container>
      <Title>Episódios</Title>
      <LinearProgress variant="determinate" value={percentageListened} />
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
