import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Home from './pages/Home/Home';
import Article from './pages/Article/Article';
import NotFound from './pages/NotFound/NotFound';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category/:path" element={<Article />} />
        <Route path="/page-not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="page-not-found" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
