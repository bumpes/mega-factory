import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from './layouts/AppLayout';
import DashboardPage from './pages/DashboardPage';
import CreationsPage from './pages/CreationsPage';
import TaskPage from './pages/TaskPage';
import GalleryPage from './pages/GalleryPage';
import ComparePage from './pages/ComparePage';
import ReferencePage from './pages/ReferencePage';
import SettingsPage from './pages/SettingsPage';

const queryClient = new QueryClient();

export default function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/creations" element={<CreationsPage />} />
            <Route path="/task" element={<TaskPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/reference" element={<ReferencePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
