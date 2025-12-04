import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Home } from './pages/Home';
import { CheckName } from "./pages/CheckName";
import { CheckInfo } from "./pages/form/CheckInfo";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="check-name" element={<CheckName />} />
          <Route path="check-info" element={<CheckInfo  />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
  );
}

function Layout() {
  return (
    <>
      <nav className="nav-bar">
        <img src="./photos/tomato.png" alt="No" className="nav-logo" />
        <Link to="/">Home</Link>
        {/* <Link to="/check-name">Check Name</Link> */}
        <Link to="/check-info">Check Info</Link>
      </nav>
      <div className="page-background">
        <Outlet />
      </div>
    </>
  );
}




function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}