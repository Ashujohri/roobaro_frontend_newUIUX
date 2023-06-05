import { Link, useLocation } from "react-router-dom";
import "./breadcrumbs.css";

const Bread = () => {
  const location = useLocation();

  // Extract the matched routes from the location
  const matchedRoutes = location.pathname
    .split("/")
    .filter(Boolean)
    .map((route) => decodeURIComponent(route));

  // Render the breadcrumbs
  return (
    <div className="breadcrumbs-section">
      <ul className="breadcrumbs">
        <li className="breadcrumb-item disabled">
          <Link to="/">Home</Link>
        </li>
        {matchedRoutes.map((route, index) => (
          <li className="breadcrumb-item" key={route}>
            {index === matchedRoutes.length - 1 ? (
              route.split("-").join(" ")
            ) : (
              <Link to={`/${encodeURIComponent(route)}`} className="disabled">
                {route}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bread;
