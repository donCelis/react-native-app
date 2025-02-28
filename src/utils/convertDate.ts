import {format} from 'date-fns';

export const converDate = (entry: Date): string => {
  const date = new Date(entry);
  return format(date, 'dd/MM/yyyy');
};
