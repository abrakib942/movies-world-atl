import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import Movies from "../pages/movie/Movies";
import MovieDetails from "../pages/movie/MovieDetails";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import NotFound from "../components/NotFound";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/movies/:id",
        element: <MovieDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
