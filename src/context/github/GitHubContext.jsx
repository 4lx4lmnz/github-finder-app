import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import githubReducer from './GitHubReducer';

export const GitHubContext = createContext();
GitHubContext.displayName = 'GitHubContext';

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <GitHubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

GitHubProvider.propTypes = {
  children: PropTypes.node,
};

export default GitHubContext;
