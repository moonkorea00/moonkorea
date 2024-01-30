'use client';

import { ThemeProvider } from 'styled-components';

import { StyledComponentsRegistry, GlobalStyle, theme } from '@styles';

const StyledComponentsProvider = ({ children }: PropsWithStrictChildren) => {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default StyledComponentsProvider;
