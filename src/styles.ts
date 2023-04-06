import styled, { createGlobalStyle } from 'styled-components'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

export const FontStyles = createGlobalStyle`
  * {
    font-family: "Roboto" !important;
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
  background-color: #f2f2f2;
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
