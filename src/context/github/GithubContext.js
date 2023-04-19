import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const Server_URL = process.env.REACT_APP_SERVER_URL

export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get search users
  const searchUsers = async (text) => {
    setLoading()
  
    const params = new URLSearchParams({
      q: text,
    })
  
    const response = await fetch(`${Server_URL}/search/users?${params}`, {
      credentials: 'include',
    })
  
    const { items } = await response.json();
  
    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }

  // Get single user
  const getUser = async (login) => {
    setLoading()
  
    const response = await fetch(`${Server_URL}/user/${login}`, {
      credentials: 'include',
    })

    if(response.status === 404) {
      window.location = '/notfound'
    } else {

    const data = await response.json()
  
    dispatch({
      type: 'GET_USER',
      payload: data,
    })
  }
}

// Get user repos
const getUserRepos = async (login) => {
  setLoading()

  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10
  })

  const response = await fetch(`${Server_URL}/user/${login}/repos?${params}`, {
    credentials: 'include',
  })

  const data = await response.json();

  dispatch({
    type: 'GET_REPOS',
    payload: data,
  })
}

  // Clear users from state
  const clearUsers = () => dispatch({type: 'CLEAR_USERS'})

  // Set Loading
  const setLoading = () => dispatch({type: 'SET_LOADING'})

  return <GithubContext.Provider value={{
    users: state.users,
    loading: state.loading,
    user: state.user,
    repos: state.repos,
    searchUsers,
    clearUsers,
    getUser,
    getUserRepos
  }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext


