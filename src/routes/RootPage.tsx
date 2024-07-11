import CharacterList from '../components/CharacterList';
import Navbar from '../components/Navbar';

export default function RootPage() {
  return (
    <div className="flex flex-col">
      <Navbar showBackButton={false} />
      <CharacterList />
    </div>
  );
}
