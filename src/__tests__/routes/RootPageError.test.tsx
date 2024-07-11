import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import RootPage from '../../routes/RootPage';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: () => ({
    refetch: jest.fn(),
    loading: false,
    error: true,
    data: [],
  }),
}));

describe('RootPage::Error', () => {
  it('should render error message', async () => {
    render(
      <BrowserRouter>
        <RootPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(
        screen.queryByText('There was an trying to fetch the data. Please try again later.')
      ).toBeInTheDocument();
    });
  });
});
