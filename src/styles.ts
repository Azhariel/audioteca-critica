import styled, { createGlobalStyle } from 'styled-components'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

export const lightTheme = {
  body: '#fafafa',
  containerBackground: '#f2f2f2',
  text: '#363537',
  toggleBorder: '#FFF',
  background: '#363537',
}
export const darkTheme = {
  body: '#363537',
  containerBackground: '#2b2b2b',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  background: '#999',
}

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  font-size: 0.9rem;
  padding: 0.25rem 1rem;
  border-radius: 5px;
  margin: 0 0.5rem;
  cursor: pointer;
`

export const FontStyles = createGlobalStyle`
  * {
    font-family: "Roboto" !important;
    }

    body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }`

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
  background-color: ${({ theme }) => theme.containerBackground};
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
