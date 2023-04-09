import styled, { createGlobalStyle } from 'styled-components'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const colors = {
  Body: '#fafafa',
  ContainerBackground: '#f2f2f2',
  Text: '#363537',
  ToggleBorder: '#FFF',
  Background: '#363537',
  Negative: '#b01929',
  Positive: '#06A129',
  darkTheme: {
    Body: '#363537',
    ContainerBackground: '#2b2b2b',
    Text: '#FAFAFA',
    ToggleBorder: '#6B8096',
    Background: '#999',
    Negative: '#fd253c',
    Positive: '#08C434',
  },
}

export const FontStyles = createGlobalStyle`
    :root {
    --color-body: ${colors.Body};
    --color-containerBackground: ${colors.ContainerBackground};
    --color-text: ${colors.Text};
    --color-toggleBorder: ${colors.ToggleBorder};
    --color-background: ${colors.Background};
    --color-negative: ${colors.Negative};
    --color-positive: ${colors.Positive};
  }

  :root.dark {
    --color-body: ${colors.darkTheme.Body};
    --color-containerBackground: ${colors.darkTheme.ContainerBackground};
    --color-text: ${colors.darkTheme.Text};
    --color-toggleBorder: ${colors.darkTheme.ToggleBorder};
    --color-background: ${colors.darkTheme.Background};
    --color-negative: ${colors.darkTheme.Negative};
    --color-positive: ${colors.darkTheme.Positive};
  }

  * {
    font-family: "Roboto" !important;
    }

    a:link {
      color: var(--color-negative);
      text-decoration: none;
    }

    body {
    background: var(--color-body);
    color: var(--color-text);
    transition: all 0.50s linear;
  }

`

export const StyledButton = styled.button`
  background-color: var(--color-body);
  color: var(--color-text);
  border: 2px solid var(--color-toggleBorder);
  font-size: 0.9rem;
  padding: 0.25rem 1rem;
  border-radius: 5px;
  margin: 0 0.5rem;
  cursor: pointer;
`

export const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  border-bottom: 2px solid var(--color-toggleBorder);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: var(--color-body);
`

export const Container = styled.div`
  max-width: 80%;
  margin: 0 auto;
  padding: 0 16px;
`

export const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 32px;
`

export const ListItem = styled.li`
  margin-bottom: 16px;
  padding: 24px;
  background-color: var(--color-containerBackground);
  border-radius: 8px;
  list-style-type: none;

  h2 {
    font-size: 24px;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    margin-bottom: 16px;
  }

  input[type='checkbox'] {
    margin-right: 8px;
  }
`

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60%;
  height: auto;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: var(--color-containerBackground);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  z-index: 3;
`

export const ModalCloseButton = styled.button`
  display: flex;
  position: fixed;
  font-size: 1rem;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  background-color: var(--color-negative);
  border: var(--color-toggleBorder);
  border-radius: 8px;
  color: var(--color-body);
  cursor: pointer;
`

export const EpisodeCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  padding: 16px;
  background-color: var(--color-containerBackground);
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`

export const EpisodeCardImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
`

export const EpisodeCardTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: var(--color-negative);
  :hover {
    color: var(--color-positive);
    cursor: pointer;
  }
`

export const EpisodeCardAuthor = styled.p`
  font-size: 16px;
  color: var(--color-text);
  margin: 0;
`

export const EpisodeCardYear = styled.p`
  font-size: 16px;
  color: var(--color-text);
  margin: 0;
`

export const EpisodeCardDescription = styled.p<{ full?: Boolean }>`
  font-size: 16px;
  margin: 16px 0;
  line-height: 1.5;
  overflow: hidden;
  color: var(--color-text);
  display: -webkit-box;
  text-justify: auto;
  ${(props) => (props.full ? '' : 'text-overflow: ellipsis;')}
  ${(props) => (props.full ? '' : '-webkit-line-clamp: 3;')}
  ${(props) => (props.full ? '' : '-webkit-box-orient: vertical;')}
`

export const EpisodeCardButton = styled.button<{
  positive?: Boolean
  outline?: Boolean
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => {
    if (props.outline) return 'transparent'
    if (props.positive) return 'var(--color-positive)'
    return 'var(--color-negative)'
  }};
  border: ${(props) => {
    if (props.outline)
      if (props.positive) return '2px solid var(--color-positive)'
      else return '2px solid var(--color-negative)'
    return 'none'
  }};
  color: ${(props) =>
    props.outline ? 'var(--color-text)' : 'var(--color-body)'};
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`
