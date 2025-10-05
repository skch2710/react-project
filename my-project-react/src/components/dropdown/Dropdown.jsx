import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Dropdown = (props) => {
  const { label, options, getOptionLabel, onChange } = props;

  return (
    <Box sx={{ width: 300 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Autocomplete
        disablePortal
        {...props} // Spread all other props here
        onChange={onChange}
        options={options}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Box>
  );
};

export default Dropdown;
