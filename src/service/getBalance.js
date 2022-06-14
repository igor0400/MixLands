export const getBalance = (item) =>
   item < 64
      ? `${item} MK`
      : item >= 64
      ? item % 64 === 0
         ? `${Math.floor(item / 64)} CMK`
         : `${Math.floor(item / 64)} CMK ${Math.floor(item % 64)} MK`
      : '0 MK';
