import { StyledButton } from '@/styles'
import { ReactElement } from 'react'

interface ThemeTogglerProps {
  handleToggleTheme: () => void
  currentTheme: string
}

const ThemeToggler = ({
  handleToggleTheme,
  currentTheme,
}: ThemeTogglerProps): ReactElement | null => {
  if (!currentTheme) {
    return null
  }
  return (
    <StyledButton onClick={() => handleToggleTheme()}>
      {currentTheme === 'dark' ? '🌞' : '🌛'}
    </StyledButton>
  )
}

export default ThemeToggler
