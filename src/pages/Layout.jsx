import { Link, Outlet } from "react-router-dom"

function Layout() {
    return (
        <>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/create">Create Post</Link>
        </nav>
        <Outlet/>
        </>
    )
}

export default Layout