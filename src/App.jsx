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

function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      element: <Wrapper />,
      children: [
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
          element: <Chat />,
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
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <SocketIOContextProvider>
            <UserContextProvider>
              <RouterProvider router={router} />
            </UserContextProvider>
          </SocketIOContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
