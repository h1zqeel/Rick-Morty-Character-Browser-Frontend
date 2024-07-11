import { useQuery, gql } from '@apollo/client';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Character from '../components/Character';
import { useParams } from 'react-router-dom';

export default function CharacterPage() {
  const { id } = useParams();
  return (
    <>
      <div className="flex flex-col">
        <Navbar showBackButton={true} />
        <Character id={id} />
      </div>
    </>
  );
}
