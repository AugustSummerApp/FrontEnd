import { Outlet, Link } from "react-router-dom"

function Layout() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Homepage</Link>
          <Link to="/Training">Training</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        © 2025 Super Duper Mega Fitness
      </footer>
    </div>  )
}

export default Layout