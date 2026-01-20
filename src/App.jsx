import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SocketIOContextProvider } from "./context/SocketIOContext";
import { Chat } from "./pages/chatPages/Chat";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { AuthContextProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";
import { Blog } from "./pages/blogPages/Blog";
import { Wrapper } from "./component/Wrapper";
import { LandingPage } from "./component/LandingPage";
import { Resume } from "./component/Resume";
import { UserPage } from "./pages/userPages/UserPage";
import { GlobalFooter } from "./component/GlobalFooter";
import { AdminSignup } from "./pages/adminPages/AdminSignup";
import { AdminLogin } from "./pages/adminPages/AdminLogin";
import { AdminPage } from "./pages/adminPages/AdminPage";
import { AdminContextProvider } from "./context/AdminContext";
import { MobileChat } from "./pages/chatPages/MobileChat";

function App() {
  const queryClient = new QueryClient();
  // const router = createBrowserRouter([
  //   {
  //     element: <Wrapper />,
  //     children: [
  //       {
  //         path: "/.well-known/acme-challenge/:token",
  //         element: <div></div>,
  //       },
  //       {
  //         path: "/",
  //         element: <LandingPage />,
  //       },
  //       {
  //         path: "/resume",
  //         element: <Resume />,
  //       },
  //       {
  //         path: "/chat",
  //         element: <MobileChat />,
  //       },
  //       {
  //         path: "/blog",
  //         element: <Blog />,
  //       },
  //       {
  //         path: "/account",
  //         elements: <UserPage />,
  //       },
  //       {
  //         path: "/signup",
  //         element: <Signup />,
  //       },

  //       {
  //         path: "/login",
  //         element: <Login />,
  //       },
  //       {
  //         path: "/_Q8f3aZkadmin",
  //         element: <AdminPage />,
  //       },

  //       {
  //         path: "/_A9x2LmPsignup",
  //         element: <AdminSignup />,
  //       },

  //       {
  //         path: "/_Q8f4ZkNlogin",
  //         element: <AdminLogin />,
  //       },
  //     ],
  //   },
  // ]);

  const router = createBrowserRouter([
    {
      element: <Wrapper />,
      children: [
        // Landing page
        {
          // path: "/X9a3/B7L0/r/Pq4t/G1v8/Zx5k",
          path: "/",
          element: <LandingPage />,
        },

        // Resume page
        {
          path: "/M4p2/Q8V1/z/Lk7r/Nm2s/Pw9d",
          element: <Resume />,
        },

        // Chat page
        {
          path: "/C7k9/R2T8/j/Fi3l/Hv6q/Yp1m",
          element: <MobileChat />,
        },

        // Blog page
        {
          path: "/B8w6/S4L3/p/Qt9m/Vx2k/Ko7r",
          element: <Blog />,
        },

        // User account page
        {
          path: "/U5n7/Y2F1/q/Ax9k/Jv4m/Nt8p",
          element: <UserPage />,
        },

        // Signup page
        {
          path: "/S1x4/H9P7/v/Rz2k/Mq8p/Lj5w",
          element: <Signup />,
        },

        // Login page
        {
          path: "/L2m8/Q5D3/k/Ft9r/Pw6v/Gx1n",
          element: <Login />,
        },

        // Admin page
        {
          path: "/A3c9/F1K4/n/Vq8r/Hp2s/Lt6m",
          element: <AdminPage />,
        },

        // Admin signup
        {
          path: "/AS4j/2B7V/9r/Kl3m/Px6q/Wz1v",
          element: <AdminSignup />,
        },

        // Admin login
        {
          path: "/AL6p/3W8T/1s/Yq7n/Rv2k/Bm4p",
          element: <AdminLogin />,
        },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <AdminContextProvider>
            <SocketIOContextProvider>
              <UserContextProvider>
                <RouterProvider router={router} />
              </UserContextProvider>
            </SocketIOContextProvider>
          </AdminContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
