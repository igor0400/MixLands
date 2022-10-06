export interface LocationType {
   pathname: string;
   search: string;
   hash: string;
   state: null | [];
   key: string;
}

export interface NavItemType {
   linkTo: string;
   label: string;
   id: number;
}

export const navsItems = [
   {
      linkTo: '/',
      label: 'Главная',
      id: 0,
   },
   {
      linkTo: '/stats',
      label: 'Статистика',
      id: 1,
   },
   {
      linkTo: '/wiki',
      label: 'Вики',
      id: 2,
   },
];
