import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Router from './Router';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';
import { AuthContext } from './context/auth';

const Wrapper = styled.div``;

const App: React.FC = () => {
  // auth context
  const [token, setToken] = useState(null);
  useEffect(() => {
    let user;
    try {
      user = localStorage.getItem('user');
    } catch (error) {
      console.log(error);
    } finally {
      if (user) {
        setToken(JSON.parse(user));
      }
    }
  }, []);

  const setTokens = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setToken(data);
  };

  console.log('token', token);
  return (
    <Wrapper>
      <AuthContext.Provider value={{ authTokens: token, setAuthTokens: setTokens }}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeProvider>
      </AuthContext.Provider>
    </Wrapper>
  );
};

export default App;
