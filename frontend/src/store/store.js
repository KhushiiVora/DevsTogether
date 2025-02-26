import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import userReducer from "../state/userSlice";
import themeReducer from "../state/themeSlice";
import socketReducer from "../state/socketSlice";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  socket: socketReducer,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

const persistor = persistStore(store);

export { store, persistor };
