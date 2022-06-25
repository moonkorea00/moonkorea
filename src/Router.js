import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './components/Nav';
import SideNav from './components/SideNav';
import Home from './components/Home'
import Blog from './components/Blog';

function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Main>
        <SideNav />
        {/* <Blog /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/blog/:article" element={<Blog />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

const Main = styled.main`
  display: inline-flex;
  /* width: 100%; */
`;
export default Router;
