import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import LocationInfo from './LocationInfo';
import EpisodeInfo from './EpisodeInfo';

const GET_CHARACTER = gql`
  query GetCharacter($id: Int!) {
    character(id: $id) {
      id
      name
      image
      status
      species
      location {
        name
        type
        dimension
      }
      origin {
        name
        type
        dimension
      }
      episode {
        id
        name
        episode
        air_date
      }
    }
  }
`;

const Character = ({ id }: any) => {
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id: parseInt(id) },
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  if (error) return <Typography variant="body1">Error fetching character data</Typography>;

  const character = data.character;

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} md={8}>
        <div style={{ maxWidth: 600, margin: 'auto', marginTop: 20, padding: '0 20px' }}>
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
          <LocationInfo title="Origin" location={character.origin} />
          <LocationInfo title="Location" location={character.location} />
          <Typography variant="body1" color="text.primary" gutterBottom>
            Episodes:
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', padding: '10px 0' }}>
            {character.episode.map((episode: any) => (
              <EpisodeInfo
                key={episode.id}
                name={episode.name}
                air_date={episode.air_date}
                episode={episode.episode}
              />
            ))}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Character;
