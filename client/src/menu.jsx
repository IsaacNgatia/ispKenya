import paymentmethod from "/payment-method.png";
import dashboard from "/dashboard.png";
import isp from "/employees.png";
import addUser from "/add-user.png";
import addgroup from "/add-group.png";
import viewAllUsers from "/marketing.png";
import mikrotik from "/hub.png";
import allMikrotiks from "/router.png";
import hotspot from "/hotspot.png";
import radiusVouchers from "/gps.png";
import allVouchers from "/coupon.png";
import groupedVouchers from "/voucher.png";
import sms from "/sms.png";
import newMessage from "/new-message.png";
import sentSms from "/sent.png";
import expirySms from "/pending.png";
import acknowledgementSms from "/deal.png";
import payments from "/money.png";
import hspTransactions from "/mobile-banking.png";
import walletTrasanctions from "/money-transfer.png";
import invoice from "/bill.png";
import mpesaAlerts from "/payment.png";
import ticket from "/ticket.png";
import settings from "/settings.png";
import sysSettings from "/settings (1).png";
import administrator from "/administrator.png";
import log from "/log.png";
import login from "/log-in.png";
export const menu = [
  {
    id: 1,
    name: "Dashboard",
    url: "/",
    icon: dashboard,
  },
  {
    id: 2,
    name: "isp",
    icon: isp,
    subMenu: [
      {
        id: 1,
        name: "Add New User",
        url: "/isp/add-new-user",
        icon: addUser,
      },
      {
        id: 2,
        name: "Add Bulk Users",
        url: "/isp/add-bulk-users",
        icon: addgroup,
      },
      {
        id: 3,
        name: "View All Users",
        url: "/isp/view-all-users",
        icon: viewAllUsers,
      },
    ],
  },
  {
    id: 3,
    name: "Mikrotiks",
    icon: mikrotik,
    subMenu: [
      {
        id: 1,
        name: "Add New Mikrotik",
        url: "/mikrotiks/new-mikrotik",
        icon: mikrotik,
      },
      {
        id: 2,
        name: "All Mikrotiks",
        url: "/mikrotiks/all-mikrotiks",
        icon: allMikrotiks,
      },
    ],
  },
  {
    id: 4,
    name: "Hotspot",
    icon: hotspot,
    subMenu: [
      {
        id: 1,
        name: "Add Radius Vouchers",
        url: "/hotspot/add-radius-vouchers",
        icon: radiusVouchers,
      },
      {
        id: 2,
        name: "All Vouchers",
        url: "/hotspot/view-all-vouchers",
        icon: allVouchers,
      },
      {
        id: 3,
        name: "Grouped Vouchers",
        url: "/hotspot/grouped-vouchers",
        icon: groupedVouchers,
      },
    ],
  },
  {
    id: 5,
    name: "SMS",
    icon: sms,
    subMenu: [
      {
        id: 1,
        name: "Compose New Message",
        url: "/sms/new-message",
        icon: newMessage,
      },
      {
        id: 2,
        name: "Sent SMS",
        url: "/sms/sent-sms",
        icon: sentSms,
      },
      {
        id: 3,
        name: "Expiry SMS",
        url: "/sms/expiry-sms",
        icon: expirySms,
      },
      {
        id: 4,
        name: "Acknowledgement SMS",
        url: "/sms/acknowledge-sms",
        icon: acknowledgementSms,
      },
    ],
  },
  {
    id: 6,
    name: "Payments",
    icon: payments,
    subMenu: [
      {
        id: 1,
        name: "M-PESA Transactions",
        url: "/payments/mpesa-transactions",
        icon: paymentmethod,
      },
      {
        id: 2,
        name: "HSP Transactions",
        url: "/payments/hsp-transactions",
        icon: hspTransactions,
      },
      {
        id: 3,
        name: "Wallet Transactions",
        url: "/payments/wallet-transactions",
        icon: walletTrasanctions,
      },
      {
        id: 4,
        name: "Invoice",
        url: "/payments/invoice",
        icon: invoice,
      },
      {
        id: 5,
        name: "M-PESA Alerts",
        url: "/payments/mpesa-alerts",
        icon: mpesaAlerts,
      },
    ],
  },
  {
    id: 7,
    name: "Tickets",
    url: "/tickets",
    icon: ticket,
  },
  {
    name: "Settings",
    icon: settings,
    subMenu: [
      {
        id: 1,
        name: "System Settings",
        url: "/settings/sys-settings",
        icon: sysSettings,
      },
      {
        id: 2,
        name: "Admin List",
        url: "/settings/adm-list",
        icon: administrator,
      },
      {
        name: "Admin Login Logs",
        url: "/settings/adm-logs",
        icon: log,
      },
      {
        id: 3,
        name: "Activity Logs",
        url: "/settings/logs",
        icon: login,
      },
    ],
  },
];
