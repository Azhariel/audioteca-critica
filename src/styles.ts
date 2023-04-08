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
  darkTheme: {
    Body: '#363537',
    ContainerBackground: '#2b2b2b',
    Text: '#FAFAFA',
    ToggleBorder: '#6B8096',
    Background: '#999',
  },
}

export const FontStyles = createGlobalStyle`
    :root {
    --color-body: ${colors.Body};
    --color-containerBackground: ${colors.ContainerBackground};
    --color-text: ${colors.Text};
    --color-toggleBorder: ${colors.ToggleBorder};
    --color-background: ${colors.Background};
  }

  :root.dark {
    --color-body: ${colors.darkTheme.Body};
    --color-containerBackground: ${colors.darkTheme.ContainerBackground};
    --color-text: ${colors.darkTheme.Text};
    --color-toggleBorder: ${colors.darkTheme.ToggleBorder};
    --color-background: ${colors.darkTheme.Background};
  }

  * {
    font-family: "Roboto" !important;
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

export const Container = styled.div`
  max-width: 800px;
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
  padding: 16px;
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
