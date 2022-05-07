import axios from 'axios';
import { database, ref, set } from '../firebase/firebase';

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

function getDate() {
  const now = new Date();
  const day = plusZero(now.getDate());
  const month = plusZero(now.getMonth() + 1);

  return `${day} ${month}`;
}

const getStats = async () => {
  let onlinePlayers = 0;

  await axios
    .get('https://api.mcsrvstat.us/2/prp.plo.su')
    .then((res) => (onlinePlayers = res.data.players.online));

  const data = {
    onlinePlayers: onlinePlayers,
    date: getDateTime(),
  };

  await set(ref(database, 'online/' + getDateTimeId()), data);
};

const deleteStats = () => {
  axios
    .get('https://mixlands-3696a-default-rtdb.firebaseio.com/online.json')
    .then((res) => {
      const data = res.data;
      const firstKeyData = Object.keys(data)[0];

      if (getDate() > firstKeyData.slice(0, 5)) {
        set(ref(database, 'online/' + firstKeyData), null);
      }
    });
};

const timeoutGetStats = () =>
  setTimeout(() => {
    getStats();
    deleteStats();
    timeoutGetStats();
  }, 600000);

// timeoutGetStats();
