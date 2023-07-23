/* eslint-disable no-unused-vars */

import {
 Outlet,
 Route,
 Routes,
 createBrowserRouter,
 createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import {
 LoginPage,
 SignUpPage,
 ActivationPage,
 Homepage,
 ProductsPage,
 BestSellingPage,
 EventsPage,
 FAQPage,
 ProductDetailsPage,
 ProfilePage,
 CheckoutPage,
 OrderSuccessPage,
 PaymentPage,
 ShopCreatePage,
 SellerActivationPage,
 ShopLoginPage,
 ShopHomePage,
 ShopDashboardPage,
 ShopCreateProduct,
 ShopAllProducts,
 ShopCreateEvents,
 ShopAllEvents,
 ShopAllCoupons,
 ShopPreviewPage,
 OrderDetailsPage,
 ShopOrderDetails,
 ShopAllOrders,
 ShopSettingsPage,
 TrackOrderPage,
 ShopAllRefunds,
 ShopWithDrawMoneyPage,
 UserInbox,
 ShopInboxPage
} from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./components/error/ErrorBoundary";
import { userStore } from "./store/userStore";
import { shallow } from "zustand/shallow";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useEffect, useState } from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { server } from "../server";
import { useSellersStore } from "./store/useSellersStore";
import { useProductStore } from "./store/useProductStore";
import SellerProtectedRoutes from "./SellerProtectedRoutes";
import DashboardHeader from "./components/shop/layout/DashboardHeader";
import DashboardSideBar from "./components/shop/layout/DashboardSideBar";
import { useEventStore } from "./store/useEventStore";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminDashboardUsers from "./pages/admin/AdminDashboardUsers";
import AdminDashboardSellers from "./pages/admin/AdminDashboardSellers";
import AdminDashboardProducts from "./pages/admin/AdminDashboardProducts";
import AdminDashboardEvents from "./pages/admin/AdminDashboardEvents";
import AdminDashboardWithdraw from "./pages/admin/AdminDashboardWithdraw";
import AdminDashboardOrders from "./pages/admin/AdminDashboardOrders";

const Root = () => {
 const loadUser = userStore((state) => state.loadUser);
 const loadSeller = useSellersStore(
  (state) => state.loadSeller
 );
 const loadAllProducts = useProductStore(
  (state) => state.loadAllProducts
 );
 const loadAllEvents = useEventStore(
  (state) => state.loadAllEvents
 );

 useEffect(() => {
  loadUser();
  loadSeller();
  loadAllProducts();
  loadAllEvents();
 }, []);

 return (
  <>
   <Outlet />
   <ToastContainer
    position="bottom-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    className="w-full p-2"
   />
  </>
 );
};

const LayoutRoot = () => {
 const seller = useSellersStore((state) => state.seller);

 return (
  <>
   <Header />
   <Outlet />
   <Footer />
  </>
 );
};

// eslint-disable-next-line react/prop-types
const StripeKeyFunc = ({ children }) => {
 return (
  <Elements
   stripe={loadStripe(
    "pk_test_51MaxshGvCUGGo5ii6iKofbT0lsMCbaco9aiw4WqHif9novxzqURmJwvZI9GMCVISbCTCRrfpjetLtG81NEZafuIw00DCZqYzYw"
   )}
  >
   <Routes>
    <Route
     path="/"
     element={
      <ProtectedRoutes>
       <PaymentPage />
      </ProtectedRoutes>
     }
    />
   </Routes>
  </Elements>
 );
};

export const router = createBrowserRouter(
 createRoutesFromElements(
  <Route element={<Root />}>
   <Route element={<LayoutRoot />}>
    <Route path="/" element={<Homepage />}></Route>
    <Route
     path="/products"
     element={<ProductsPage />}
    ></Route>
    <Route
     path="/best-selling"
     element={<BestSellingPage />}
    ></Route>
    <Route path="/events" element={<EventsPage />}></Route>
    <Route path="/faq" element={<FAQPage />}></Route>
    <Route
     path="/product/:id"
     element={<ProductDetailsPage />}
    ></Route>
    <Route
     path="/profile"
     element={
      <ProtectedRoutes>
       {" "}
       <ProfilePage />
      </ProtectedRoutes>
     }
    ></Route>
    <Route
     path="/checkout"
     element={
      <ProtectedRoutes>
       <CheckoutPage />
      </ProtectedRoutes>
     }
    />
    <Route
     path="/order/success"
     element={<OrderSuccessPage />}
    />
    <Route
     path="/profile"
     element={
      <ProtectedRoutes>
       <ProfilePage />
      </ProtectedRoutes>
     }
    />

      <Route
          path="/inbox"
          element={
            <ProtectedRoutes>
              <UserInbox />
            </ProtectedRoutes>
          }
        />
    <Route
     path="/user/track/order/:id"
     element={
      <ProtectedRoutes>
       <TrackOrderPage />
      </ProtectedRoutes>
     }
    />
    <Route
     path="/user/order/:id"
     element={
      <ProtectedRoutes>
       <OrderDetailsPage />
      </ProtectedRoutes>
     }
    />

    <Route path="/payment/*" element={<StripeKeyFunc />} />
   </Route>

   {/* shop routes */}
   <Route
    path="/shop-create"
    element={<ShopCreatePage />}
   />
   <Route path="/shop-login" element={<ShopLoginPage />} />
   <Route
    path="/shop/:id"
    element={
     <SellerProtectedRoutes>
      <ShopHomePage />
     </SellerProtectedRoutes>
    }
   />
   <Route
    path="/shop/preview/:id"
    element={<ShopPreviewPage />}
   />
   <Route
    path="/dashboard"
    element={
     <SellerProtectedRoutes>
      <ShopDashboardPage />
     </SellerProtectedRoutes>
    }
   />

   <Route
    path="/dashboard-create-product"
    element={
     <SellerProtectedRoutes>
      <ShopCreateProduct />
     </SellerProtectedRoutes>
    }
   />

   <Route
    path="/dashboard-products"
    element={
     <SellerProtectedRoutes>
      <ShopAllProducts />
     </SellerProtectedRoutes>
    }
   />

   <Route
    path="/dashboard-create-event"
    element={
     <SellerProtectedRoutes>
      <ShopCreateEvents />
     </SellerProtectedRoutes>
    }
   />

   <Route
    path="/dashboard-events"
    element={
     <SellerProtectedRoutes>
      <ShopAllEvents />
     </SellerProtectedRoutes>
    }
   />

   <Route
    path="/dashboard-orders"
    element={
     <SellerProtectedRoutes>
      <ShopAllOrders />
     </SellerProtectedRoutes>
    }
   />

   <Route
    path="/order/:id"
    element={
     <SellerProtectedRoutes>
      <ShopOrderDetails />
     </SellerProtectedRoutes>
    }
   />

   <Route
    path="/dashboard-refunds"
    element={
     <SellerProtectedRoutes>
      <ShopAllRefunds />
     </SellerProtectedRoutes>
    }
   />
   <Route
    path="/dashboard-coupouns"
    element={
     <SellerProtectedRoutes>
      <ShopAllCoupons />
     </SellerProtectedRoutes>
    }
   />
  <Route
          path="/dashboard-messages"
          element={
            <SellerProtectedRoutes>
              <ShopInboxPage />
            </SellerProtectedRoutes>
          }
        />
   <Route
    path="/dashboard-withdraw-money"
    element={
     <SellerProtectedRoutes>
      <ShopWithDrawMoneyPage />
     </SellerProtectedRoutes>
    }
   />
   <Route
    path="/settings"
    element={
     <SellerProtectedRoutes>
      <ShopSettingsPage />
     </SellerProtectedRoutes>
    }
   />

   {/* admin routes */}
   <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-users"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardUsers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-sellers"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardSellers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardOrders />
            </ProtectedAdminRoute>
          }
        />
         <Route
          path="/admin-products"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardProducts />
            </ProtectedAdminRoute>
          }
        />
         <Route
          path="/admin-events"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardEvents />
            </ProtectedAdminRoute>
          }
        />
         <Route
          path="/admin-withdraw-request"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardWithdraw />
            </ProtectedAdminRoute>
          }
        />

   {/* auth */}
   <Route path="/login" element={<LoginPage />}></Route>
   <Route path="/sign-up" element={<SignUpPage />}></Route>
   <Route
    path="/user/activation/:activation_token"
    element={<ActivationPage />}
    errorElement={<ErrorBoundary />}
   ></Route>
   <Route
    path="/seller/activation/:activation_token"
    element={<SellerActivationPage />}
    errorElement={<ErrorBoundary />}
   ></Route>
  </Route>
 )
);
