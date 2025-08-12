import './App.css'

import TodoUstate from './pages/TodoUstate'
import TodoZustand from './pages/TodoZustand'
import PostPage from './pages/post'
import Home from './home'
import DetailPage from './pages/detail'
import MainPage from './pages/main'
import SellingPage from './pages/selling'

import PokemonPage from './pages/pokemon'
import PokemonDetail from './pages/pokemon/PokemonDetailPage'
import ComparePokemon from './pages/pokemon/ComparePokemonPage'
import {

  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
 
const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Home/>,
      children: [
        {
          index: true,
          element: <MainPage/>
        },
        {
          path: "detail",
          element: <DetailPage/>
        }
      ]
    }
    ,{
      path:"/TodoUstate",
      element: <TodoUstate/>
    }
    ,{
      path:"/TodoZustand",
      element: <TodoZustand/>
    }
    ,{
      path:"/post",
      element: <PostPage/>
    }
    ,{
      path:"/pokemon",
      element: <PokemonPage/>
    },
    {
      path: "/pokemon/detail/",
      element: <PokemonDetail/>
    },
    {
      path: "/compare",
      element: <ComparePokemon/>
    },
    {
      path: "/selling",
      element: <SellingPage/>
    }
  ]);

  return (

    <RouterProvider router={router} />
   


  )


}

export default App