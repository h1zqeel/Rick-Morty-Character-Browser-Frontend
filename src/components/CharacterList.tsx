import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useEffect } from 'react';
import CharacterCard from './CharacterCard';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';

export default function CharacterList() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const charactersPerPage = 20; // FIXED by RickMorty API

  const charactersQuery = gql`
    query Query($page: Int, $filter: CharacterFilter) {
      characters(page: $page, filter: $filter) {
        info {
          count
          next
          prev
        }
        results {
          id
          name
          image
          status
          species
        }
      }
    }
  `;

  const { loading, data, error, refetch } = useQuery(charactersQuery, {
    variables: {
      page: page,
      filter: {},
    },
  });

  useEffect(() => {
    if (data?.characters?.info?.count) {
      const totalPagesCount = Math.ceil(data.characters.info.count / charactersPerPage);
      setTotalPages(totalPagesCount);
    }
  }, [data]);

  const handlePageChange = (event: any, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    refetch();
  }, [page]);

  if (error) {
    return <div className="flex justify-center items-center h-screen">
        There was an trying to fetch the data. Please try again later.
      </div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row justify-center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
          size="medium"
          className="mb-4"
        />
      </div>
      <Grid container spacing={2} className="justify-center">
          {data &&
            data.characters.results.map((character: any) => (
              <Grid item xs={8} sm={6} md={5} lg={4} key={character.id} className="flex justify-center">
                <Link to={`character/${character.id}`}>
                  <CharacterCard
                    id={character.id}
                    name={character.name}
                    image={character.image}
                    status={character.status}
                    species={character.species}
                  />
                </Link>
              </Grid>
            ))}
        </Grid>
    </div>
  );
}
