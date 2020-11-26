import * as dayjs from 'dayjs';

export const validDate = (date) => {
  return dayjs(date, 'YYYY-MM-DD').format('YYYY-MM-DD') === date;
};
