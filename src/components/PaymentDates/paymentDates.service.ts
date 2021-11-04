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
const dateFormat = 'DD-MM-YYYY';

const isDayInBounds = (startDate: Dayjs, day: Dayjs) => {
    const endDate = startDate.add(monthsInFuture, 'months');

    return day.isAfter(startDate.startOf('day')) && day.isBefore(endDate.endOf('day'));
}

export const getPaymentDates = (startDate: Dayjs) => {
    const output: DateData[] = [];

    for (let i = 0; i <= monthsInFuture; i++) {
        const month = startDate.add(i, 'months');
        const bonusDate = getBonusDate(month);
        const salaryDate = getSalaryDate(month);

        if (isDayInBounds(startDate, bonusDate)) {
            output.push({
                type: PaymentType.BONUS,
                date: bonusDate.format(dateFormat),
            });
        }

        if (isDayInBounds(startDate, salaryDate)) {
            output.push({
                type: PaymentType.SALARY,
                date: salaryDate.format(dateFormat),
            });
        }
    }

    return output;
}
