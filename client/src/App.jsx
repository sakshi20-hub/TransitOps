import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";

import DriversPage from "./pages/DriversPage";
import TripsPage from "./pages/TripsPage";
import MaintenancePage from "./pages/MaintenancePage";
import FuelExpensePage from "./pages/FuelExpensePage";
import ReportsPage from "./pages/ReportsPage";

import "./styles/transitops.css";


const NAV_ITEMS = [
  {
    to: "/drivers",
    label: "Drivers",
  },
  {
    to: "/trips",
    label: "Trips",
  },
  {
    to: "/maintenance",
    label: "Maintenance",
  },
  {
    to: "/fuel-expense",
    label: "Fuel & Expense",
  },
  {
    to: "/reports",
    label: "Reports",
  },
];


function Navigation() {
  return (
    <header className="app-nav">

      <span className="app-nav__brand">
        TransitOps
      </span>


      <nav>
        {NAV_ITEMS.map((item)=>(
          <NavLink
            key={item.to}
            to={item.to}
            className={({isActive}) =>
              isActive
              ? "app-nav__link app-nav__link--active"
              : "app-nav__link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

    </header>
  );
}



export default function App(){

  return (

    <BrowserRouter>

      <div className="app-shell">

        <Navigation />


        <main>

          <Routes>

            <Route
              path="/"
              element={
                <Navigate
                  to="/drivers"
                  replace
                />
              }
            />


            <Route
              path="/drivers"
              element={<DriversPage />}
            />


            <Route
              path="/trips"
              element={<TripsPage />}
            />


            <Route
              path="/maintenance"
              element={<MaintenancePage />}
            />


            <Route
              path="/fuel-expense"
              element={<FuelExpensePage />}
            />


            <Route
              path="/reports"
              element={<ReportsPage />}
            />


            <Route
              path="*"
              element={
                <Navigate
                  to="/drivers"
                  replace
                />
              }
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>

  );
}