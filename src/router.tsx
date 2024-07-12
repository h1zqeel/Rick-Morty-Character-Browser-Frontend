import { createBrowserRouter } from 'react-router-dom';
import CharacterPage from './routes/CharacterPage';
import RootPage from './routes/RootPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
  },
  {
    path: '/character/:id',
    element: <CharacterPage />,
  },
]);

export default router;
