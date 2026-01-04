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
  const router = createBrowserRouter([
    {
      element: <Wrapper />,
      children: [
        {
          path: "/.well-known/acme-challenge/:token",
          element: <div></div>, // Just render an empty div
        },
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/resume",
          element: <Resume />,
        },
        {
          path: "/chat",
          element: <MobileChat />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
        {
          path: "/account",
          elements: <UserPage />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },

        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/_Q8f3aZkadmin",
          element: <AdminPage />,
        },

        {
          path: "/_A9x2LmPsignup",
          element: <AdminSignup />,
        },

        {
          path: "/_Q8f4ZkNlogin",
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
