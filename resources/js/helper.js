export const userDateFormat = (date, format = 'd-m-Y') => {
    if (!date) return null;

    const clean = String(date).trim();
    let d;

    if (/^\d{2}-\d{2}-\d{4}$/.test(clean)) {
        const [day, month, year] = clean.split('-').map(Number);
        d = new Date(year, month - 1, day);
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(clean.split('T')[0].split(' ')[0])) {
        const [year, month, day] = clean.split('T')[0].split(' ')[0].split('-').map(Number);
        d = new Date(year, month - 1, day);
    } else {
        d = new Date(clean);
    }

    if (Number.isNaN(d.getTime())) return null;

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear());

    return format
        .replace('d', day)
        .replace('m', month)
        .replace('Y', year);
};