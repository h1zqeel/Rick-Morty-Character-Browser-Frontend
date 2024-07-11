import { useQuery, gql } from '@apollo/client';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import LocationInfo from './LocationInfo';
import EpisodeInfo from './EpisodeInfo';
import { Episode } from '../types/Episode';
import { Character } from '../types/Character';

export interface CharacterInfoProps {
  id: string;
}

const GET_CHARACTER = gql`
  query GetCharacter($id: Int!) {
    character(id: $id) {
      id
      name
      image
      status
      species
      location {
        id
        name
        type
        dimension
        created
      }
      origin {
        id
        name
        type
        dimension
        created
      }
      episode {
        id
        name
        episode
        air_date
        created
      }
    }
  }
`;

const CharacterInfo = ({ id }: CharacterInfoProps) => {
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id: parseInt(id, 10) },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) return <Typography variant="body1">Error fetching character data</Typography>;

  const { character }: { character: Character } = data;

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} md={8}>
        <div
          style={{
            maxWidth: 600,
            margin: 'auto',
            marginTop: 20,
            padding: '0 20px',
          }}
        >
          <img
            src={character.image}
            alt={character.name}
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
          <Typography gutterBottom variant="h5" component="div" style={{ marginTop: 10 }}>
            {character.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Status: {character.status}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Species: {character.species}
          </Typography>
          {character.origin && <LocationInfo title="Origin" location={character.origin} />}
          {character.location && <LocationInfo title="Location" location={character.location} />}
          <Typography variant="body1" color="text.primary" gutterBottom>
            Episodes:
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', padding: '10px 0' }}>
            {character.episode &&
              character.episode.map((episode: Episode) => (
                <EpisodeInfo key={episode.id} episode={episode} />
              ))}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default CharacterInfo;
