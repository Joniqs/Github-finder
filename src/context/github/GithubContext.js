import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const Server_URL = process.env.REACT_APP_SERVER_URL

export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
    loading: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get initial users (testing purposes)
  const searchUsers = async (text) => {
    setLoading()
  
    const params = new URLSearchParams({
      q: text,
    })
  
    console.log('Search text:', text);
  
    const response = await fetch(`${Server_URL}/search/users?${params}`, {
      credentials: 'include',
    })
  
    const { items } = await response.json();
  
    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }

  // Clear users from state
  const clearUsers = () => dispatch({type: 'CLEAR_USERS'})

  // Set Loading
  const setLoading = () => dispatch({type: 'SET_LOADING'})

  return <GithubContext.Provider value={{
    users: state.users,
    loading: state.loading,
    searchUsers,
    clearUsers
  }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext


