import React, { useState } from 'react';
import { Link } from 'gatsby';
import Chance from 'chance';

import { Button } from '../components';

const chance = new Chance();

const Create = () => {
  const [sessionId, setSessionId] = useState(null);

  const handleClick = () => {
    const randomGuid = chance.guid();
    setSessionId(randomGuid);
  };

  return (
    <div>
      <Button onClick={handleClick}>Start New Game</Button>
      <div>Session ID: <Link to={`/play?sessionId=${sessionId}`}>{sessionId}</Link></div>
    </div>
  );
};

export default Create;
