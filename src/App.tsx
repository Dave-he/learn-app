import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

// Route-based code splitting: each page is emitted as its own chunk and
// loaded on demand, so the initial bundle stays small. Layout + Home are
// eager (app shell + landing route); the rest are lazy.
const LearningPath = lazy(() => import('./pages/LearningPath'));
const Grammar = lazy(() => import('./pages/Grammar'));
const Corpus = lazy(() => import('./pages/Corpus'));
const Exams = lazy(() => import('./pages/Exams'));
const Articles = lazy(() => import('./pages/Articles'));
const Search = lazy(() => import('./pages/Search'));
const Forum = lazy(() => import('./pages/Forum'));
const Resources = lazy(() => import('./pages/Resources'));
const Reader = lazy(() => import('./pages/Reader'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>加载中…</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="path" element={<LearningPath />} />
            <Route path="path/:lang" element={<LearningPath />} />
            <Route path="grammar" element={<Grammar />} />
            <Route path="corpus" element={<Corpus />} />
            <Route path="exams" element={<Exams />} />
            <Route path="articles" element={<Articles />} />
            <Route path="search" element={<Search />} />
            <Route path="forum" element={<Forum />} />
            <Route path="forum/partners" element={<Forum />} />
            <Route path="resources" element={<Resources />} />
            <Route path="reader/:id" element={<Reader />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
