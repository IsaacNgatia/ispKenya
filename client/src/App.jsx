import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./pages/404";
import Dashboard from "./pages/Dashboard";
import AddNewUser from "./pages/Isp/AddNewUser";
import AddBulkUsers from "./pages/Isp/AddBulkUsers";
import ViewAllUsers from "./pages/Isp/ViewAllUsers";
import AddNewMikrotik from "./pages/Mikrotiks/AddNewMikrotik";
import ViewAllMikrotiks from "./pages/Mikrotiks/ViewAllMikrotiks";
import AddRadiusVouchers from "./pages/Hotspot/AddRadiusVouchers";
import ViewAllVouchers from "./pages/Hotspot/ViewAllVouchers";
import GroupedVouchers from "./pages/Hotspot/GroupedVouchers";
import ComposeNewSms from "./pages/SMS/ComposeNewSms";
import SentSms from "./pages/SMS/SentSms";
import ExpirySms from "./pages/SMS/ExpirySms";
import AcknowledgementSms from "./pages/SMS/AcknowledgementSms";
import MPesaTransactions from "./pages/Payments/M-PesaTransactions";
import Invoice from "./pages/Payments/Invoice";
import WalletTransactions from "./pages/Payments/WalletTransactions";
import MPesaAlerts from "./pages/Payments/M-PesaAlerts";
import Tickets from "./pages/Tickets";
import ActivityLogs from "./pages/Settings/ActivityLogs";
import AdmList from "./pages/Settings/AdmList";
import SysSettings from "./pages/Settings/SysSettings";
import AdmLoginLogs from "./pages/Settings/AdmLoginLogs";
import HspTransactions from "./pages/Payments/Hsp-Transactions";
import DataGridProDemo from "./pages/GridPro";
import RetryComponent from "./pages/test";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/grid" element={<RetryComponent />} />
      <Route path="/isp">
        <Route path="add-new-user" element={<AddNewUser />} />
        <Route path="add-bulk-users" element={<AddBulkUsers />} />
        <Route path="view-all-users" element={<ViewAllUsers />} />
      </Route>
      <Route path="/mikrotiks">
        <Route path="new-mikrotik" element={<AddNewMikrotik />} />
        <Route path="all-mikrotiks" element={<ViewAllMikrotiks />} />
      </Route>
      <Route path="/hotspot">
        <Route path="add-radius-vouchers" element={<AddRadiusVouchers />} />
        <Route path="view-all-vouchers" element={<ViewAllVouchers />} />
        <Route path="grouped-vouchers" element={<GroupedVouchers />} />
      </Route>
      <Route path="/sms">
        <Route path="new-message" element={<ComposeNewSms />} />
        <Route path="sent-sms" element={<SentSms />} />
        <Route path="expiry-sms" element={<ExpirySms />} />
        <Route path="acknowledge-sms" element={<AcknowledgementSms />} />
      </Route>
      <Route path="/payments">
        <Route path="mpesa-transactions" element={<MPesaTransactions />} />
        <Route path="hsp-transactions" element={<HspTransactions />} />
        <Route path="wallet-transactions" element={<WalletTransactions />} />
        <Route path="invoice" element={<Invoice />} />
        <Route path="mpesa-alerts" element={<MPesaAlerts />} />
      </Route>
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/settings">
        <Route path="sys-settings" element={<SysSettings />} />
        <Route path="adm-list" element={<AdmList />} />
        <Route path="adm-logs" element={<AdmLoginLogs />} />
        <Route path="logs" element={<ActivityLogs />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
