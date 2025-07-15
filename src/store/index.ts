import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import ThemeCustomize from "@/store/ThemeCustomize";
import AuthReducers from "@/store/auth";
import TourReducers from "@/store/tours";
import ProductReducers from "@/store/products";
import DestinationsReducers from "@/store/destination";
import BookingReducers from "@/store/booking";
import ContactReducers from "@/store/contacts";
import FinancialReducers from "@/store/financial";
import EmployeeReducers from "@/store/employee";
import OperationsReducers from "@/store/operations";
import TravelAgentReducers from "@/store/travelAgent";
import ReportsReducers from "@/store/report";
import OtaReducers from "@/store/ota";

export const store = configureStore({
  reducer: {
    ThemeCustomize,
    AuthReducers,
    TourReducers,
    ProductReducers,
    DestinationsReducers,
    BookingReducers,
    ContactReducers,
    FinancialReducers,
    EmployeeReducers,
    OperationsReducers,
    TravelAgentReducers,
    ReportsReducers,
    OtaReducers,
  },
  devTools: true,
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
