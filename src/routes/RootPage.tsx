import { useQuery, gql } from '@apollo/client';
import { useEffect } from 'react';
import CharacterList from '../components/CharacterList';
import Navbar from '../components/Navbar';

export default function RootPage() {
  const charactersQuery = gql`
    query Query {
      characters(page: 1, filter: {}) {
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

  const { data } = useQuery(charactersQuery);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <CharacterList />
      </div>
    </>
  );
}
