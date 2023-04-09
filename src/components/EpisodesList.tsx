import React from 'react'
import { Episode } from '../types'
import { Container, Title } from '../styles'
import LinearProgress from '@mui/material/LinearProgress'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import EpisodeCard from './EpisodeCard'

type Props = {
  episodes: Episode[]
  onEpisodeChange: (id: string, listened: boolean) => void
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
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '25px',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
      >
        {episodes.map((episode) => (
          <EpisodeCard
            episode={episode}
            onListen={onEpisodeChange}
            key={`${episode.id}card`}
          />
        ))}
      </div>
    </Container>
  )
}

export default EpisodesList
