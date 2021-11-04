import { FC, useEffect, useState } from 'react';
import { DatesList } from '../DatesList';
import { Box, Grid } from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { DateData } from '../types';
import { DownloadBtn } from '../DownloadBtn';
import { Dayjs } from 'dayjs';
import { getPaymentDates } from './paymentDates.service';


export const PaymentDates: FC = () => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [paymentData, setPaymentData] = useState<DateData[]>([]);

    useEffect(() => {
        setPaymentData(startDate ? getPaymentDates(startDate) : []);
    }, [startDate]);

    return (
        <Grid container justifyContent="space-between" spacing={3} alignItems="center">
            <Grid item>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DesktopDatePicker
                        label="Start Date"
                        inputFormat="DD/MM/YYYY"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item>
                <DownloadBtn rows={paymentData} selectedDate={startDate}/>
            </Grid>
            <Grid item xs={12}>
                <Box ml="auto" mr="auto" maxWidth="500px">
                    <DatesList rows={paymentData}/>
                </Box>
            </Grid>
        </Grid>
    );
};