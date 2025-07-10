import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemsSlice";
import fetchStatusSlice from "./fetchStatusSlice";
import bagSlice from "./bagSlice";

const MyntraStore = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    fetch: fetchStatusSlice.reducer,
    bag: bagSlice.reducer,
  },
});

export default MyntraStore;
