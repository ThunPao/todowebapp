// FILE - ./src/app-context/user-context.tsx
// ----------------------------------

import React from 'react'

export interface UserContract {
  id?: number
  username?: string
  firstName?: string
  email?: string
}

// The dummy user object used for this example
export const DummyUser: UserContract = {
  id: 1,
  username: 'MyUserName',
  firstName: 'John',
  email: 'john@doe.com',
}

/**
 * Application state interface
 */
export interface AppState {
  user?: UserContract
  updateState: (newState: Partial<AppState>) => void
}

/**
 * Default application state
 */
const defaultState: AppState = {
  user: {},
  updateState: (newState?: Partial<AppState>) => {},
}

/**
 * Creating the Application state context for the provider
 */
export const UserContext = React.createContext<AppState>(defaultState)