import React, { useState } from 'react';
import queryString from 'query-string';
import { useFirebase } from 'gatsby-plugin-firebase';

import { ReactButton, Button } from '../components';

const Play = (props) => {
  const [playerName, setPlayerName] = useState('');

  useFirebase((firebase) => {
    const db = firebase.fireStore();
    const document = db.collection('sessions').doc('guid');
    console.log('DOCUMENT', document);
  }, []);

  const sessionId = queryString.parse(props.location.search);

  function handleChange(event) {
    const name = event.target.value;
    setPlayerName(name);
  }

  function setPlayerAsReady() {
    if (!playerName) return;
    
  }

  return (
    <div>
      <div>
        <input value={playerName} onChange={handleChange} />
        <Button onClick={playerName ? setPlayerAsReady : null}>Ready</Button>
      </div>
      {sessionId
        ? <ReactButton />
        : <div>Get some friends, loser</div>
      }
    </div>
  );
};

export default Play;
