const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// Get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const resp = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  const { items } = await resp.json();
  return items;
};

// Get a single user
export const getUser = async (login) => {
  const resp = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  if (resp.status === 404) {
    window.location = '/notfound';
  } else {
    const data = await resp.json();
    return data;
  }
};

// Get user repos
export const getUserRepos = async (login) => {
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
  return data;
};
