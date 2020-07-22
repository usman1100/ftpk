const simpleDateFormat = (date) => {
    let dayName =  ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][date.getDay()] || '';
    let month = date.toLocaleString('default', { month: 'long' });
}
