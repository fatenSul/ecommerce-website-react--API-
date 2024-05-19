import React from 'react'
import { Cart } from "./pages/Cart/cart";
import Root from './Root/Root.jsx'
import Home from './pages/Home/Components/Home.jsx';
// import  Product  from './pages/Products/products.jsx;
import SignUp from './pages/SignUp/signup.jsx'
import SignIn from './pages/SignIn/signin.jsx'
import Forgot from './pages/SignIn/forget.jsx';
import Protectrouters from './componets/protectrouters.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './pages/NotFound.jsx'
import Navbar from './componets/Navbar.jsx'
import CategoryProducts from './pages/categories/CategoryProducts.jsx'
import { Shop } from "./pages/shop/shop.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import { children } from 'react'
import UserContextProvider from './context/User.jsx'
import ContactPage from './pages/contact/contact.jsx'
import { ShopContextProvider } from './context/shop-context.jsx'
import Products from './pages/categories/products.jsx';
import OrderPage from './pages/orderPage.jsx';
import profile from './pages/profile/profile.jsx'
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/Shop",
          element:
         ///   <Protectrouters>
            <Shop />
          //</Protectrouters>
        },

        {
          path: "/cart",
          element:
          //<Protectrouters>
            <Cart />
          //</Protectrouters>
        },
        {
          path: '/categories/:id',
          element: <CategoryProducts />
        },
        {
          path: '/products/:id',
          element: <Products />
        },
        {
          path: "/forgot",
          element: <Forgot/>
        },
        {
          path: "/orderPage",
          element: <OrderPage/>
        },
        
        {
          path: "/SignIN",
          element: < SignIn />
        },
        {
          path: "/SignUp",
          element:
            < SignUp />,
        },
        {
          path: "/Contact",
          element:
            < ContactPage />,
        },

        {
          path: "/Profile",
          element:
            < profile/>,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <>
      <ShopContextProvider>
        <UserContextProvider>
          <RouterProvider router={router} />;
        </UserContextProvider>
        <ToastContainer />
      </ShopContextProvider>
    </>
  )
}
// return (

//         <Route index element={<Home />} />
//         <Route path="/SignIn" element={<SignIn />} />
//         <Route path="/SignUp" element={<SignUp />} />
//         <Route path="/" element={<ProtectRouters><Home /></ProtectRouters>} />
//         <Route path="/Cart" element={<Cart />} />
//         <Route path="*" element={<NotFound />} />
//       </Route>
//     </Routes>
//   </Router>
// );
//}

