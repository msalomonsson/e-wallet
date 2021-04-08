import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "./components/card/cardSlice";

const store = configureStore({
  reducer: {
    card: cardSlice,
  },
});

export default store;
