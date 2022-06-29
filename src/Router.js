import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './components/Nav';
import Home from './components/Home';
import Blog from './components/Blog';
import NotFound from './components/NotFound';
function Router() {
  return (
    <BrowserRouter>
      <Nav />
      {/* <Main> */}

      <Routes>
        <Route path="/moonkorea" element={<Home />} />
        <Route path="/moonkorea/:category/:path" element={<Blog />} />
        <Route path="/moonkorea/page-not-found" element={<NotFound />} />
        <Route path="/*" element={<Navigate to='/moonkorea/page-not-found' replace />} />
      </Routes>
      {/* </Main> */}
    </BrowserRouter>
  );
}

const Main = styled.main`
  display: inline-flex;
  width: 100vw;
`;
export default Router;
