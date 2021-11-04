import { Dayjs } from 'dayjs';
import { DateData, PaymentType } from '../types';

const getSalaryDate = (date: Dayjs) => {
    const lastDay = date.endOf('month');
    const weekday = lastDay.day();

    if ([6, 7].includes(weekday)) {
        return lastDay.add(5 - weekday, 'day');
    }

    return lastDay;
}

const getBonusDate = (date: Dayjs) => {
    const day = date.date(15);
    const weekday = day.day();

    if ([6, 7].includes(weekday)) {
        return day.add(1, 'week').day(3);
    }

    return day;
}

const monthsInFuture = 12;
export const getPaymentDates = (startDate: Dayjs) => {
    const output: DateData[] = [];

    for (let i = 0; i < monthsInFuture; i++) {
        const month = startDate.add(i, 'months');

        const bonusDate = getBonusDate(month);
        if (bonusDate.isAfter(startDate.startOf('day'))) {
            output.push({
                type: PaymentType.BONUS,
                date: bonusDate.format('DD-MM-YYYY'),
            });
        }

        output.push({
            type: PaymentType.SALARY,
            date: getSalaryDate(month).format('DD-MM-YYYY'),
        });
    }

    const endMonth = startDate.add(monthsInFuture, 'months');
    const bonusDate = getBonusDate(endMonth);
    if (bonusDate.isBefore(endMonth.endOf('day'))) {
        output.push({
            type: PaymentType.BONUS,
            date: bonusDate.format('DD-MM-YYYY'),
        });
    }

    return output;
}
