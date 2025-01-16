import { Link, Outlet } from "react-router-dom";
import './homestyle.scss'
import PopUp from "./PopUp/PopUp";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Home = () => {
  const { openModal } = useSelector((state: RootState) => state.users);
  return (
    <div className="home" style={{ overflow: openModal ? 'hidden' : 'auto' }}>
      <header className="home__header">
        <Link to={'/editUsers'} className="home__header-button">Edit Users</Link>
        <Link to={'/users'} className="home__header-button">Users</Link>
      </header>
      <main className="home__main">
        {openModal && <PopUp/>}
        <div className="home__wrapper">
          <Outlet/>
        </div>
      </main>
    </div>
  )
}

export default Home;