import React, { createContext, useState } from 'react';

import { GlobalStyles } from './globalStyles';
import { Header, MainContent, Footer } from './components';

export const appContext = createContext();

const App = ({ children, ...props }) => {
  const [context, setContext] = useState({
    gameId: null,
    playerName: '',
  });

  return (
    <appContext.Provider value={{
      ...context,
      updateContext: (update) => setContext({
        ...context,
        ...update,
      }),
    }}>
      <GlobalStyles />
      <Header {...props} />
      <MainContent>{children}</MainContent>
      <Footer />
    </appContext.Provider>
  );
};

export default App;
