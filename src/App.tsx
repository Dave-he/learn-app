import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import LearningPath from './pages/LearningPath';
import Grammar from './pages/Grammar';
import Corpus from './pages/Corpus';
import Exams from './pages/Exams';
import Articles from './pages/Articles';
import Search from './pages/Search';
import Forum from './pages/Forum';
import Resources from './pages/Resources';
import Reader from './pages/Reader';

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
