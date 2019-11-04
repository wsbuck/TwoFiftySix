import React, { useState, useReducer, useContext } from 'react';

const DarkModeStateContext = React.createContext();
const DarkModeDispatchContext = React.createContext();

function darkModeReducer(state, action) {
  switch (action) {
    case true: {
      return true;
    }
    case false: {
      return false;
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

function DarkModeProvider({ children }) {
  const darkModeStatus = useState(
    matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [state, dispatch] = useReducer(darkModeReducer, {
    darkMode: darkModeStatus
  });
  return (
    <DarkModeStateContext.Provider value={state}>
      <DarkModeDispatchContext.Provider value={dispatch}>
        { children }
      </DarkModeDispatchContext.Provider>
    </DarkModeStateContext.Provider>
  );
}

function useDarkModeState() {
  const context = useContext(DarkModeStateContext);
  if (context === undefined) {
    throw new Error('useDarkModeState must be used within Provider');
  }
  if (context) {
    document.querySelector('body').classList.add('bp3-dark');
  } else {
    document.querySelector('body').classList.remove('bp3-dark');
  }
  return context;
}

function useDarkModeDispatch() {
  const context = useContext(DarkModeDispatchContext);
  if (context === undefined) {
    throw new Error(`useDarkModeDispatch must be used with Provider`);
  }
  return context;
}

function useDarkMode() {
  return [useDarkModeState(), useDarkModeDispatch()];
}

export {
  DarkModeProvider,
  useDarkMode,
};