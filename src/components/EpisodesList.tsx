import React from 'react'
import EpisodeItem from './EpisodeItem'
import { Episode } from '../types'
import { Container, Title, ListItem } from '../styles'
import LinearProgress from '@mui/material/LinearProgress'
import { ThemeProvider, createTheme } from '@mui/material/styles'

type Props = {
  episodes: Episode[]
  onEpisodeChange: (id: number, listened: boolean) => void
  percentageListened: number
  theme: string
}

const EpisodesList: React.FC<Props> = ({
  episodes,
  onEpisodeChange,
  percentageListened,
  theme,
}) => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  return (
    <Container>
      <Title>Episódios</Title>
      {theme === 'dark' && (
        <ThemeProvider theme={darkTheme}>
          <LinearProgress variant="determinate" value={percentageListened} />
        </ThemeProvider>
      )}
      {theme !== 'dark' && (
        <LinearProgress variant="determinate" value={percentageListened} />
      )}
      <ul style={{ padding: 0 }}>
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
