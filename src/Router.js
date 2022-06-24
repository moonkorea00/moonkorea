import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './components/Nav';
import SideNav from './components/SideNav';
import Blog from './components/Blog';
import React from 'react';

function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Main>
        <SideNav />
        {/* <Blog /> */}
        <Routes>
          <Route path="/*" element={<Blog />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

const Main = styled.main`
  display: inline-flex;
`;
export default Router;
