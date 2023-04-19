import axios from 'axios'
const Server_URL = process.env.REACT_APP_SERVER_URL

const github = axios.create({
  baseURL: Server_URL,
  withCredentials: true
})

// Get search users
export const searchUsers = async (text) => {

  const params = new URLSearchParams({
    q: text,
  })

  const response = await github.get(`/search/users?${params}`)

  return response.data.items
}

// Get user and repos
export const getUserAndRepos = async(login) => {
  try {
    const [user, repos] = await Promise.all([
      github.get(`/user/${login}`),
      github.get(`/user/${login}/repos`)
    ]);
    return { user: user.data, repos: repos.data };
  } catch (error) {
    console.log(error.response.config.url);
    throw error;
  }
};