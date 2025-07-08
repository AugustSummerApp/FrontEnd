import { Outlet, Link } from "react-router-dom"

function Layout() {
  return (
    <div className="container">
      <header className="Header">
        <nav>
          <Link to="/">Homepage</Link>
          <Link to="/Training">Training</Link>
          <Link to="/Progress">Progress</Link>
          <Link to="/Macros">Progress</Link>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <div className="Footer">
        <p>© 2025 Super Duper Mega Fitness</p>

      </div>
    </div>  )
}

export default Layout