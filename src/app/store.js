import { configureStore } from "@reduxjs/toolkit";
import vendorsReducer from "../features/vendors/vendorsSlice";
import userReducer from "../features/user/userSlice";
import itemUnitsReducer from "../features/items/units/unitsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    vendors: vendorsReducer,
    itemUnits: itemUnitsReducer,
  },
});
