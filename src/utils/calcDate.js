export function calcDate(data) {
    const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return data.map(expense => {
        const month = new Date(expense.date.seconds * 1000).getUTCMonth();
        const year = new Date(expense.date.seconds * 1000).getFullYear();

        return {
            year,
            month: monthsArray[month]
        }
    });
}