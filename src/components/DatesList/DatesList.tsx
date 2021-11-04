import { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DateData } from '../types';
import { Typography } from '@mui/material';

interface Props {
    rows: DateData[];
}

export const DatesList: FC<Props> = ({rows}) => {
    if (rows.length) {
        return (
            <>
                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Payment Calendar
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell align="right">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(({date, type}) => (
                                <TableRow
                                    key={date}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell>{type}</TableCell>
                                    <TableCell align="right">{date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }

    return (
        <Typography textAlign="center" typography="h5">Please select the date</Typography>
    );
};