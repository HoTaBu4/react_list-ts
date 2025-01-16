import { Link, Outlet } from "react-router-dom";
import './homestyle.scss'

const Home = () => {
  return (
    <div className="home">
      <header className="home__header">
        <Link to={'/editUsers'} className="home__header-button">Edit Users</Link>
        <Link to={'/users'} className="home__header-button">Users</Link>
      </header>
      <main className="home__main">
        <div className="home__wrapper">
          
          <Outlet/>
        </div>
      </main>
    </div>
  )
}

export default Home;