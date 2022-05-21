import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import alertReducer from './AlertReducer';

export const AlertContext = createContext();
AlertContext.displayName = 'AlertContext';

export const AlertProvider = ({ children }) => {
  const initialState = null;
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg, type) => {
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type },
    });

    setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }, 5000));
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

AlertContext.propTypes = {
  children: PropTypes.node,
};

export default AlertContext;
