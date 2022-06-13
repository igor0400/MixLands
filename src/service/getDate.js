function plusZero(value) {
   if (value < 10) {
      value = '0' + value;
   }
   return value;
}

export function getDateTime() {
   const now = new Date();
   const day = plusZero(now.getDate());
   const month = plusZero(now.getMonth() + 1);
   const year = now.getFullYear();
   const hours = plusZero(now.getHours());
   const minutes = plusZero(now.getMinutes());

   return `${hours}:${minutes} ${day}.${month}.${year}`;
}
export function getClearDateTime() {
   const now = new Date();
   const day = plusZero(now.getDate());
   const month = plusZero(now.getMonth() + 1);
   const year = now.getFullYear();
   const hours = plusZero(now.getHours());
   const minutes = plusZero(now.getMinutes());
   const seconds = plusZero(now.getSeconds());

   return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
