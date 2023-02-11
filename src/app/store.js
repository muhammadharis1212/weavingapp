import { configureStore } from "@reduxjs/toolkit";
import suppliersReducer from "../features/suppliers/suppliersSlice";
import userReducer from "../features/user/userSlice";
import itemUnitsReducer from "../features/items/units/unitsSlice";
import chartOfAccountsReducer from "../features/chartofaccounts/chartOfAccountsSlice";
import partyReducer from "../features/party/partySlice";
import itemsReducer from "../features/items/itemsSlice";
import billsReducer from "../features/bills/billsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    party: partyReducer,
    suppliers: suppliersReducer,
    items: itemsReducer,
    itemUnits: itemUnitsReducer,
    bills: billsReducer,
    chartOfAccounts: chartOfAccountsReducer,
  },
});
