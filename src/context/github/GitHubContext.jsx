import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import githubReducer from './GitHubReducer';

export const GitHubContext = createContext();
GitHubContext.displayName = 'GitHubContext';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: true,
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  const fetchUsers = async () => {
    const resp = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await resp.json();
    dispatch({ type: 'GET_USERS', payload: data });
  };

  return (
    <GitHubContext.Provider
      value={{ users: state.users, loading: state.loading, fetchUsers }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

GitHubProvider.propTypes = {
  children: PropTypes.node,
};

export default GitHubContext;
