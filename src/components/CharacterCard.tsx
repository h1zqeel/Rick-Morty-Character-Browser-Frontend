import { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CircularProgress } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

export interface CharacterCardProps {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
}

export default function CharacterCard({ name, image, status, species }: CharacterCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false); // State to track image loading

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Card
      className="cursor-pointer"
      sx={{
        maxWidth: 345,
        m: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Box position="relative" minHeight={300} minWidth={300}>
        <CardMedia
          component="img"
          src={image}
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageLoaded ? 1 : 0,
            transition: 'visibility 0s, opacity 0.1s linear',
          }}
          onLoad={handleImageLoad}
        />
        {!imageLoaded && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="rgba(255, 255, 255, 0.1)"
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          {status === 'Alive' && <CircleIcon color="success" sx={{ fontSize: '10px' }} />}
          {status === 'Dead' && <CircleIcon color="error" sx={{ fontSize: '10px' }} />}
          {status === 'unknown' && <CircleIcon color="disabled" sx={{ fontSize: '10px' }} />}
          <Typography variant="body2" color="text.secondary" ml={1}>
            {status}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="body2" color="text.secondary" ml={1}>
            {species}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
