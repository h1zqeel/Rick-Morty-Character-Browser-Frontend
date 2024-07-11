import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import CharacterPage from '../../routes/CharacterPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
  useNavigate: () => jest.fn(),
}));

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: () => ({
    loading: false,
    error: true,
    data: undefined,
  }),
}));

describe('CharacterPage::Error', () => {
  it('should render error message', async () => {
    render(
      <BrowserRouter>
        <CharacterPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Error fetching character data')).toBeInTheDocument();
    });
  });
});
