import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { useMidnightReset } from './hooks/useMidnightReset';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SetupPage from './pages/SetupPage';
import EditPage from './pages/EditPage';
import HistoryPage from './pages/HistoryPage';

function AppContent() {
  useMidnightReset();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/edit/:id?" element={<EditPage />} />
        <Route path="/history/:id" element={<HistoryPage />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}
