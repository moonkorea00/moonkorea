import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './components/Nav';
import SideNav from './components/SideNav/SideNav';
import Home from './components/Home'
import Blog from './components/Blog';

function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Main>
        <SideNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category/:path" element={<Blog />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

const Main = styled.main`
  display: inline-flex;
  width: 100vw;
`;
export default Router;
