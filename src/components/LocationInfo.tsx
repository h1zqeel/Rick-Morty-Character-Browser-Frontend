import React from 'react';
import Typography from '@mui/material/Typography';

interface LocationInfoProps {
  title: string;
  location: {
    name: string;
    type: string;
    dimension: string;
    created: string;
  };
}

const LocationInfo = ({ title, location }: LocationInfoProps) => {
  const isUnknown = location.name === 'unknown';

  return (
    <div>
      <Typography variant="body1" color="text.primary" gutterBottom>
        {title}: {isUnknown}
      </Typography>
      <div className="ml-2">
        {isUnknown ? (
          <Typography variant="body2" color="text.secondary">
            Unknown {title}
          </Typography>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Name: {location.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Type: {location.type}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Dimension: {location.dimension}
            </Typography>
          </>
        )}
      </div>
    </div>
  );
};

export default LocationInfo;
