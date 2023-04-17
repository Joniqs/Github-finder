import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const Server_URL = process.env.REACT_APP_SERVER_URL

export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
    loading: true
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const fetchUsers = async() => {
    const response = await fetch(`${Server_URL}/users`, { credentials: 'include' });

    const data = await response.json()
    
    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
  }

  return <GithubContext.Provider value={{
    users: state.users,
    loading: state.loading,
    fetchUsers,
  }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext


