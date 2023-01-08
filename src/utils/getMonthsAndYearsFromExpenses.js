import { calcDate } from "./calcDate";

export function getMonthsAndYearsFromExpenses(data, requestedResult) {
    if (requestedResult === 'year') {
        const years = [];

        calcDate(data).forEach(element => {
            years.push(element.year);
        });

        return [...new Set(years)];
    } else {
        const months = [];

        calcDate(data).forEach(element => {
            months.push(element.month);
        });

        return [...new Set(months)];
    }
}