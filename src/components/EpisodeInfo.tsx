/* eslint-disable camelcase */
import { Chip, Tooltip } from '@mui/material';
import { Episode } from '../types/Episode';

interface EpirsodeInfoProps {
  episode: Episode;
}

const EpisodeInfo = ({ episode: { air_date, episode, name } }: EpirsodeInfoProps) => (
  <div className="cursor-pointer">
    <Tooltip title={`Air Date: ${air_date}`}>
      <Chip label={`${name} - ${episode}`} style={{ margin: 5 }} />
    </Tooltip>
  </div>
);

export default EpisodeInfo;
