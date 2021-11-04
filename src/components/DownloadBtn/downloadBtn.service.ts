import { DateData } from '../types';
import { Dayjs } from 'dayjs';

const parseDataToCSV = (rows: DateData[]) => {
    const csvRows = rows.map(({type, date}) => `${type},${date}`);
    const csvContent = ['Type,Date', ...csvRows].join('\n')

    return `data:text/csv;charset=utf-8,${encodeURI(csvContent)}\n`
}

export const downloadAsCsv = (rows: DateData[], date?: Dayjs | null) => {
    const link = document.createElement('a');
    if (link.download !== undefined) {
        link.setAttribute('href', parseDataToCSV(rows));
        link.setAttribute('download', `paydays_${date?.format('DD_MM_YYYY')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}