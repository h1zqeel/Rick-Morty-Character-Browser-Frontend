import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import RootPage from '../../routes/RootPage';

const charactersData = {
  characters: {
    info: {
      count: 40,
    },
    results: [
      {
        id: '1',
        name: 'Test Rick',
        image: 'test-rick-image',
        status: 'Test Alive',
        species: 'Test Human',
      },
      {
        id: '2',
        name: 'Test Morty',
        image: 'test-morty-image',
        status: 'Test Dead',
        species: 'Test Alein',
      },
    ],
  },
};

const mockRefetch = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: () => ({
    refetch: mockRefetch,
    loading: false,
    error: undefined,
    data: charactersData,
  }),
}));

describe('RootPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Root Page', async () => {
    render(
      <BrowserRouter>
        <RootPage />
      </BrowserRouter>
    );
    await waitFor(() => expect(screen.getByText('Rick & Morty Browser')).toBeInTheDocument());
  });

  it('should render Root Page with Characters', async () => {
    render(
      <BrowserRouter>
        <RootPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Test Rick')).toBeInTheDocument();
      expect(screen.queryByText('Test Alive')).toBeInTheDocument();
      expect(screen.queryByText('Test Morty')).toBeInTheDocument();

      expect(screen.queryByText('Test Morty')).toBeInTheDocument();
      expect(screen.queryByText('Test Dead')).toBeInTheDocument();
      expect(screen.queryByText('Test Human')).toBeInTheDocument();
    });
  });

  it('should render Root Page with Correct No. of Pages', async () => {
    render(
      <BrowserRouter>
        <RootPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('1')).toBeInTheDocument();
      expect(screen.queryByText('2')).toBeInTheDocument();
      expect(screen.queryByText('3')).toBeNull();
    });
  });

  it('should refetch data on page change', async () => {
    render(
      <BrowserRouter>
        <RootPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      screen.getByText('2').click();
      expect(mockRefetch).toHaveBeenCalledTimes(1);
    });
  });

  it('should have character detail link', async () => {
    render(
      <BrowserRouter>
        <RootPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      const characterLink = screen.getByText('Test Rick').parentElement?.parentElement
        ?.parentElement as HTMLAnchorElement;

      expect(characterLink).toHaveAttribute('href', '/character/1');
    });
  });
});
