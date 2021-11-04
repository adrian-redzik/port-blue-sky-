import { FC } from 'react';
import Button from '@mui/material/Button';
import FileDownload from '@mui/icons-material/FileDownload';
import { DateData } from '../types';
import { downloadAsCsv } from './downloadBtn.service';
import { Dayjs } from 'dayjs';

interface Props {
    rows: DateData[];
    selectedDate?: Dayjs | null;
}

export const DownloadBtn: FC<Props> = ({rows, selectedDate}) => (
    <Button
        onClick={() => downloadAsCsv(rows, selectedDate)}
        disabled={!selectedDate}
        variant="contained"
        endIcon={<FileDownload/>}
    >
        Download as csv
    </Button>
);