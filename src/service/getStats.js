import axios from 'axios';
import { database, ref, set } from '../firebase/firebase';

const getStats = async () => {
  let onlinePlayers = 0;

  function plusZero(value) {
    if (value < 10) {
      value = '0' + value;
    }
    return value;
  }

  function getDateTime() {
    const now = new Date();
    const day = plusZero(now.getDate());
    const month = plusZero(now.getMonth() + 1);
    const hours = plusZero(now.getHours());
    const minutes = plusZero(now.getMinutes());

    return `${day}.${month} ${hours}:${minutes}`;
  }
  function getDateTimeId() {
    const now = new Date();
    const day = plusZero(now.getDate());
    const month = plusZero(now.getMonth() + 1);
    const hours = plusZero(now.getHours());
    const minutes = plusZero(now.getMinutes());

    return `${day} ${month} ${hours} ${minutes}`;
  }

  await axios
    .get('https://api.mcsrvstat.us/2/prp.plo.su')
    .then((res) => (onlinePlayers = res.data.players.online));

  const data = {
    onlinePlayers: onlinePlayers,
    date: getDateTime(),
  };

  await set(ref(database, 'online/' + getDateTimeId()), data);
};

const timeoutGetStats = () =>
  setTimeout(() => {
    getStats();
    timeoutGetStats();
  }, 600000);

// timeoutGetStats();
