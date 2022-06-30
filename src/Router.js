import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Blog from './components/Blog';
import NotFound from './components/NotFound';
function Router() {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category/:path" element={<Blog />} />
        <Route path="/page-not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to='page-not-found' replace />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
