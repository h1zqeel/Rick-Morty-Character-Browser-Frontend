/* eslint-disable camelcase */
import { FormControl, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';

interface FiltersProps {
  sort: string;
  setSort: (sort: string) => void;
  status: string;
  setStatus: (status: string) => void;
  species: string;
  setSpecies: (species: string) => void;
  name: string;
  setName: (name: string) => void;
}

const Filters = ({
  sort,
  setSort,
  status,
  setStatus,
  species,
  setSpecies,
  name,
  setName,
}: FiltersProps) => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        id="search-input"
        label="Name"
        onChange={(event) => setName(event.target.value)}
        value={name}
        size="small"
        fullWidth
        variant="outlined"
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <FormControl fullWidth>
        <InputLabel id="sorting-label">Sorting</InputLabel>
        <Select
          labelId="sorting-label"
          id="sorting-select"
          value={sort}
          label="Sorting"
          onChange={(event) => setSort(event.target.value as string)}
          size="small"
        >
          <MenuItem value="None">Default</MenuItem>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <FormControl fullWidth>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="statuslabel"
          id="status-select"
          value={status}
          label="Status"
          onChange={(event) => setStatus(event.target.value as string)}
          size="small"
        >
          <MenuItem value=" ">All</MenuItem>
          <MenuItem value="Alive">Alive</MenuItem>
          <MenuItem value="Dead">Dead</MenuItem>
          <MenuItem value="unknown">Unknown</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        id="search-input"
        label="Species"
        onChange={(event) => setSpecies(event.target.value)}
        value={species}
        size="small"
        fullWidth
        variant="outlined"
      />
    </Grid>
  </Grid>
);

export default Filters;
