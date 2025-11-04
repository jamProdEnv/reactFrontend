import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SocketIOContextProvider } from "./context/SocketIOContext";
import { Chat } from "./pages/Chat";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { AuthContextProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Chat />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SocketIOContextProvider>
          <UserContextProvider>
            <RouterProvider router={router} />
          </UserContextProvider>
        </SocketIOContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
