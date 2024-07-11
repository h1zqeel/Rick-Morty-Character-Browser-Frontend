import { Chip, Tooltip } from '@mui/material';

interface EpirsodeInfoProps {
  name: string;
  air_date: string;
  episode: string;
}

const EpisodeInfo = ({ name, air_date, episode }: EpirsodeInfoProps) => {
  return (
    <div className="cursor-pointer">
      <Tooltip title={`Air Date: ${air_date}`}>
        <Chip label={`${name} - ${episode}`} style={{ margin: 5 }} />
      </Tooltip>
    </div>
  );
};

export default EpisodeInfo;
