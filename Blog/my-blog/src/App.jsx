import {createBrowserRouter,RouterProvider,Outlet,} from "react-router-dom";
import './index.css'
import { Register } from "./Pages/Register";  
import { Login } from "./Pages/Login";  
import { Write } from "./Pages/Write";  
import { Home } from "./Pages/Home";  
import { Single } from "./Pages/Single";  
import { MyBlog } from "./Pages/MyBlog";
import { Navbar } from "./Components/Navbar"; 
import { Footer } from "./Components/Footer";  


const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },{
        path: "/myblog",
        element: <MyBlog />,
      }
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;