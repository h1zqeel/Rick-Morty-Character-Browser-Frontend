import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CharacterInfo from '../components/CharacterInfo';

export default function CharacterPage() {
  const { id } = useParams();
  return (
    <div className="flex flex-col">
      <Navbar showBackButton />
      <CharacterInfo id={id!} />
    </div>
  );
}
