import { Typography } from '@mui/material';
import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'; // Import dayjs for formatting

const DatePickerGlobal = () => {
    const [value, setValue] = React.useState(null);

    return (
        <div>
            <Typography variant="h5">
                Date Picker Global : {value ? dayjs(value).format('DD-MM-YYYY') : ' No date selected'}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        slotProps={{ field: { clearable: true } }}
                        label="Select a Date"
                    />
                </DemoContainer>
            </LocalizationProvider>
        </div>
    );
};

export default DatePickerGlobal;
