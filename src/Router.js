import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './components/Nav';
import CategoryList from './components/CategoryList/CategoryList';
import Home from './components/Home'
import Blog from './components/Blog';

function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Main>
        <CategoryList />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:category/:id" element={<Blog />} />
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
