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
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get a single user
  const getUser = async (login) => {
    setLoading();

    const resp = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (resp.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await resp.json();
      dispatch({ type: 'GET_USER', payload: data });
    }
  };

  // Get user repos
  const getRepos = async (login) => {
    setLoading();

    // list latest ten
    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    });

    const resp = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await resp.json();

    dispatch({ type: 'GET_REPOS', payload: data });
  };

  const setLoading = () => {
    dispatch({ type: 'SET_LOADING' });
  };

  return (
    <GitHubContext.Provider
      value={{
        ...state,
        dispatch,
        getUser,
        getRepos,
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
