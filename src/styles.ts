import styled from 'styled-components'

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
