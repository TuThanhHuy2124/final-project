import { Link, Outlet } from "react-router-dom"
import "./Layout.css"

function Layout() {
    return (
        <>
            <div className="navbar">
                <h1>🎬FilmThread</h1>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/create">Create Post</Link>
                </nav>
            </div>
            <Outlet/>
        </>
    )
}

export default Layout