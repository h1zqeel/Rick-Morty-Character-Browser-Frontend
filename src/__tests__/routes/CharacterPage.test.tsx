import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import CharacterPage from '../../routes/CharacterPage';

const characterData = {
  character: {
    id: '1',
    name: 'Test Rick',
    image: 'test-rick-image',
    status: 'Alive',
    species: 'Human',
    origin: {
      id: '1',
      name: 'Earth (C-137)',
      type: 'Planet',
      dimension: 'Dimension C-137',
      created: '2017-11-10T12:42:04.162Z',
    },
    location: {
      id: '20',
      name: 'Earth (Replacement Dimension)',
      type: 'Comet',
      dimension: 'Replacement Dimension',
      created: '2017-11-10T12:42:04.162Z',
    },
    episode: [
      {
        id: '1',
        name: 'Pilot',
        episode: 'S01E01',
        air_date: '2013-12-02',
        created: '2017-11-10T12:56:33.798Z',
      },
      {
        id: '2',
        name: 'Lawnmower Dog',
        episode: 'S01E02',
        air_date: '2013-12-09',
        created: '2017-11-10T12:56:33.916Z',
      },
    ],
  },
};

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
  useNavigate: () => mockNavigate,
}));

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: () => ({
    loading: false,
    error: undefined,
    data: characterData,
  }),
}));

describe('CharacterPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Character Page', async () => {
    render(
      <BrowserRouter>
        <CharacterPage />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText('Rick & Morty Browser')).toBeInTheDocument());
  });

  it('should render Character Info', async () => {
    render(
      <BrowserRouter>
        <CharacterPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Rick')).toBeInTheDocument();
      expect(screen.getByText('Status: Alive')).toBeInTheDocument();
      expect(screen.getByText('Species: Human')).toBeInTheDocument();
      expect(screen.getByText('Origin:')).toBeInTheDocument();
      expect(screen.getByText('Name: Earth (C-137)')).toBeInTheDocument();
      expect(screen.getByText('Type: Planet')).toBeInTheDocument();
      expect(screen.getByText('Dimension: Dimension C-137')).toBeInTheDocument();
      expect(screen.getByText('Location:')).toBeInTheDocument();
      expect(screen.getByText('Name: Earth (Replacement Dimension)')).toBeInTheDocument();
      expect(screen.getByText('Type: Comet')).toBeInTheDocument();
      expect(screen.getByText('Dimension: Replacement Dimension')).toBeInTheDocument();
      expect(screen.getByText('Episodes:')).toBeInTheDocument();
      expect(screen.getByText('Pilot - S01E01')).toBeInTheDocument();
      expect(screen.getByText('Lawnmower Dog - S01E02')).toBeInTheDocument();
    });
  });

  it('should go back to Root Page', async () => {
    render(
      <BrowserRouter>
        <CharacterPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      const backButton = screen.getByTestId('ArrowBackIcon').parentElement as HTMLButtonElement;
      backButton.click();
    });
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
