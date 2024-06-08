import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: root, 
});

  function  NavBar() {
    return (
    <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/items" className="[&.active]:font-bold">
         Items
        </Link>
        <Link to="/create-item" className="[&.active]:font-bold">
          CreateItems
        </Link>
      </div>
    )
    
  }

function root() {
    return (
    <>
      <NavBar/>
        <hr />
        <Outlet />
        {/* <TanStackRouterDevtools /> */}
      </>)
}