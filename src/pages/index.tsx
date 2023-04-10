import React, { useCallback, useEffect } from 'react'
import { PageProps, graphql } from 'gatsby'
import EpisodesList from '../components/EpisodesList'
import { Episode } from '../types'
import { FontStyles, NavBar, NavBarTitle, SearchBar } from '../styles'
import storageHandler from '@/utils/storageHandler'
import ThemeToggler from '@/components/ThemeToggler'
import { StaticImage } from 'gatsby-plugin-image'

type Query = {
  data: {
    allContentfulEpisode: {
      nodes: Episode[]
    }
  }
}
type Props = PageProps & { data: any }

export const Head = () => {
  return (
    <>
      <title key={'pageTitle'}>Audioteca Crítica - Guia de Episódios</title>
      <meta
        key={'metaViewport'}
        name="viewport"
        content="initial-scale=1, width=device-width"
      />
      <meta
        key={'metaDescription'}
        name="description"
        content="Guia de episódios da Audioteca Crítica, podcast de leituras marxistas."
      />
    </>
  )
}

const IndexPage: React.FC<Props> = ({ data }: Query) => {
  const [episodes, setEpisodes] = React.useState<Episode[]>(
    data.allContentfulEpisode.nodes,
  )
  const [percentageListened, setPercentageListened] = React.useState<number>(0)
  const [theme, setTheme] = React.useState('')
  const [search, setSearch] = React.useState('')
  let searchedEpisodes = episodes.filter((episode) => {
    const authors = episode.author
      .map((author) => author)
      .join(' ')
      .toLocaleLowerCase()
    return (
      episode.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      authors.includes(search.toLocaleLowerCase())
    )
  })
  if (!search) searchedEpisodes = [...episodes]

  const isDarkMode = () => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark')
    }
    return false
  }

  useEffect(() => {
    const userTheme = storageHandler('theme')
    if (userTheme) {
      setTheme(userTheme)
    }
  }, [theme])

  const toggleTheme = () => {
    const newTheme = isDarkMode() ? 'light' : 'dark'
    console.log(`toggled theme to ${newTheme}`)
    document.documentElement.classList.toggle('dark')
    setTheme(newTheme)
    storageHandler('theme', newTheme)
  }

  const episodePercentage = useCallback(() => {
    // Calculate percentage of episodes listened to
    const totalEpisodes = episodes.length
    const listenedEpisodes = episodes.filter(
      (episode) => storageHandler(`episode_${episode.id}`) === '1',
    ).length
    const percentageListened = Math.round(
      (listenedEpisodes / totalEpisodes) * 100,
    )

    setPercentageListened(percentageListened)

    // Create cookie for tracking percentage listened
    storageHandler('percentage_listened', percentageListened.toString())
  }, [episodes])

  useEffect(() => {
    episodePercentage()
    setPercentageListened(Number(storageHandler('percentage_listened')))
  }, [episodePercentage])

  const handleEpisodeChange = (id: string, listened: boolean) => {
    const updatedEpisodes = episodes.map((episode) => {
      if (episode.id === id) {
        return { ...episode, listened }
      }
      return episode
    })

    setEpisodes(updatedEpisodes)

    // Save episode status in a cookie
    storageHandler(`episode_${id}`, listened ? '1' : '0')
    episodePercentage()
  }

  return (
    <div style={{ marginTop: '90px' }}>
      <FontStyles />
      <NavBar
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: 70,
          alignItems: 'center',
          margin: '0 20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '20px',
          }}
        >
          <StaticImage
            src="../../static/logo.png"
            alt="logo da audioteca"
            height={40}
            style={{ borderRadius: '12px' }}
          />
          <NavBarTitle>Audioteca Crítica - Guia de Episódios</NavBarTitle>
        </div>
        <div style={{ display: 'flex', width: '50%' }}>
          <SearchBar
            id="fullWidth"
            variant="standard"
            label="Pesquisar"
            fullWidth
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(event.target.value)
            }}
          />
        </div>
        <ThemeToggler handleToggleTheme={toggleTheme} currentTheme={theme} />
      </NavBar>
      <EpisodesList
        theme={theme}
        episodes={searchedEpisodes}
        onEpisodeChange={handleEpisodeChange}
        percentageListened={percentageListened}
      />
    </div>
  )
}

export const allContentfulEpisode = graphql`
  {
    allContentfulEpisode {
      nodes {
        id
        title
        year
        author
        description {
          description: description
        }
        image {
          gatsbyImageData(placeholder: BLURRED, formats: WEBP)
          id
        }
        episodeUrl
        textUrl
      }
    }
  }
`

export default IndexPage
