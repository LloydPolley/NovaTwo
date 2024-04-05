import React, { createContext, useContext, useReducer } from "react";

// Define initial states for each context
const initialAudioState = {
  isPlaying: false,
  volume: 50,
};

const initialLikesState = {
  likes: 0,
};

const initialLoginState = {
  isLoggedIn: false,
  username: null,
};

// Define actions for each context
const audioActions = {
  play: "PLAY",
  pause: "PAUSE",
  setVolume: "SET_VOLUME",
};

const likesActions = {
  increment: "INCREMENT",
  decrement: "DECREMENT",
};

const loginActions = {
  login: "LOGIN",
  logout: "LOGOUT",
};

// Reducer for audio context
const audioReducer = (state, action) => {
  switch (action.type) {
    case audioActions.play:
      return { ...state, isPlaying: true };
    case audioActions.pause:
      return { ...state, isPlaying: false };
    case audioActions.setVolume:
      return { ...state, volume: action.payload };
    default:
      return state;
  }
};

// Reducer for likes context
const likesReducer = (state, action) => {
  switch (action.type) {
    case likesActions.increment:
      return { ...state, likes: state.likes + 1 };
    case likesActions.decrement:
      return { ...state, likes: state.likes - 1 };
    default:
      return state;
  }
};

// Reducer for login context
const loginReducer = (state, action) => {
  switch (action.type) {
    case loginActions.login:
      return { ...state, isLoggedIn: true, username: action.payload };
    case loginActions.logout:
      return { ...state, isLoggedIn: false, username: null };
    default:
      return state;
  }
};

// Combine reducers
const combineReducers = (reducers) => (state, action) => {
  return Object.keys(reducers).reduce((acc, key) => {
    acc[key] = reducers[key](state[key], action);
    return acc;
  }, {});
};

// Combine all reducers
const rootReducer = combineReducers({
  audio: audioReducer,
  likes: likesReducer,
  login: loginReducer,
});

// Create context for combined state and dispatch
const CombinedContext = createContext();

// Custom hook to access the combined context
const useCombinedContext = () => useContext(CombinedContext);

// Provider component to wrap the entire application
const CombinedContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, {
    audio: initialAudioState,
    likes: initialLikesState,
    login: initialLoginState,
  });

  return (
    <CombinedContext.Provider value={{ state, dispatch }}>
      {children}
    </CombinedContext.Provider>
  );
};

// Example usage
const AudioComponent = () => {
  const { state, dispatch } = useCombinedContext();
  // Access audio state and dispatch actions
};

const LikesComponent = () => {
  const { state, dispatch } = useCombinedContext();
  // Access likes state and dispatch actions
};

const LoginComponent = () => {
  const { state, dispatch } = useCombinedContext();
  // Access login state and dispatch actions
};

const App = () => {
  return (
    <CombinedContextProvider>
      <div>
        <AudioComponent />
        <LikesComponent />
        <LoginComponent />
      </div>
    </CombinedContextProvider>
  );
};

export default App;
