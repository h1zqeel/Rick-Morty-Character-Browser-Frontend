import { useState, useEffect, ChangeEvent } from 'react';
import { useQuery, gql } from '@apollo/client';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';
import CharacterCard from './CharacterCard';
import { Character } from '../types/Character';
import Filters from './Filters';
import searchByName from '../helpers';

export default function CharacterList() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('None');
  const [status, setStatus] = useState(' ');
  const [species, setSpecies] = useState('');
  const [name, setName] = useState('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filter, setFilter] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const charactersPerPage = 20; // FIXED by RickMorty API

  const charactersQuery = gql`
    query Query($page: Int, $filter: CharacterFilter, $order: String) {
      characters(page: $page, filter: $filter, order: $order) {
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
      page,
      filter,
      order: sort,
    },
  });

  useEffect(() => {
    if (data?.characters?.info?.count) {
      const totalPagesCount = Math.ceil(data.characters.info.count / charactersPerPage);
      setTotalPages(totalPagesCount);
    }

    if (data && data.characters) {
      setCharacters(data.characters.results);
    }
  }, [data]);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  useEffect(() => {
    if (data && data.characters) setCharacters(searchByName(data.characters.results, name));
  }, [name]);

  useEffect(() => {
    refetch();
  }, [page, filter, sort]);

  useEffect(() => {
    setPage(1);
    setFilter({ status, species });
  }, [status, species]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        There was an trying to fetch the data. Please try again later.
      </div>
    );
  }

  if (loading) {
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
        <div className="flex flex-row justify-center">
          <Filters
            sort={sort}
            setSort={setSort}
            status={status}
            setStatus={setStatus}
            species={species}
            setSpecies={setSpecies}
            name={name}
            setName={setName}
          />
        </div>
        <div className="flex flex-row justify-center mt-5">
          <CircularProgress />
        </div>
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
      <div className="flex flex-row justify-center">
        <Filters
          sort={sort}
          setSort={setSort}
          status={status}
          setStatus={setStatus}
          species={species}
          setSpecies={setSpecies}
          name={name}
          setName={setName}
        />
      </div>
      <Grid container spacing={2} className="justify-center">
        {!!characters.length &&
          characters.map((character: Character) => (
            <Grid
              item
              xs={8}
              sm={6}
              md={5}
              lg={4}
              key={character.id}
              className="flex justify-center"
            >
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
