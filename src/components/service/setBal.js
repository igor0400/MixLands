import { useState, useEffect } from 'react';
import axios from 'axios';
import { database, ref, set } from '../../firebase/firebase';

import './setBal.scss';

const Bal = () => {
  const [input, setInput] = useState(null);
  const [player, setPlayer] = useState([]);
  const [online, setOnline] = useState(0);
  const [maxOnline, setMaxOnline] = useState(0);
  const [serverActive, setServerActive] = useState(false);
  const domInput = document.querySelector('#set-mcoins');

  useEffect(() => {
    setChanges();
    axios.get('https://api.mcsrvstat.us/2/hypixel.net').then((res) => {
      setServerActive(res.data.online);
      setOnline(res.data.players.online);
      setMaxOnline(res.data.players.max);
    });
  }, []);

  const chengeCoins = (value, player) => {
    set(ref(database, 'users/' + player.name + '/mcoins'), +player.mcoins + +value);
  };

  const setChanges = () => {
    axios
      .get('https://mixlands-3696a-default-rtdb.firebaseio.com/users.json')
      .then((res) => {
        for (let key in res.data) {
          if (res.data[key].name.toLowerCase() === 'MrBen4710'.toLowerCase()) {
            setPlayer(res.data[key]);
          }
        }
      });
  };

  return (
    <div
      className="bal"
      style={{ padding: '50px 0', maxWidth: '1400px', margin: '0 auto' }}
    >
      <h2 style={{ color: '#fff' }}>
        player: {player.name} mcoins: {player.mcoins}
      </h2>
      <input
        id="set-mcoins"
        type="number"
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={() => {
          chengeCoins(input, player);
          domInput.value = '';
          setPlayer({name: player.name, mcoins: 'Loading...'});
          setTimeout(() => {
            setChanges();
          }, 1000);
        }}
      >
        Изменить
      </button>
      <div style={{ display: 'flex' }}>
        <p style={{ color: '#fff' }}>
          Онлайн {online}/{maxOnline}
        </p>
        <div
          className="ball"
          style={{ background: serverActive ? 'green' : 'red' }}
        ></div>
      </div>
    </div>
  );
};

export default Bal;
