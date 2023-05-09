import dayjs from 'dayjs';
export const dayCount = (date: string | undefined | null) => dayjs(date).diff(dayjs().startOf('day'), 'day');
