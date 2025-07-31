import ROUTE_CONSTANTS from "./routes.constants";
import LoginPage from "@/pages/login";
import DashboardPage from "@/pages/dashboard";
import UserSettings from "@/pages/user-settings";
import NotFound from "@/pages/not-found";

const routes = [
  {
    path: ROUTE_CONSTANTS.FALLBACK,
    element: NotFound,
    type: "PUBLIC",
    accessLevel: ["superuser", "admin", "customer", ""],
  },
  {
    path: ROUTE_CONSTANTS.ROOT,
    element: LoginPage,
    type: "PROTECTED",
    accessLevel: ["superuser", "admin", "customer", ""],
  },
  {
    path: ROUTE_CONSTANTS.LOGIN,
    element: LoginPage,
    type: "PROTECTED",
    accessLevel: ["superuser", "admin", "customer", ""],
  },
  {
    path: ROUTE_CONSTANTS.DASHBOARD,
    element: DashboardPage,
    type: "PRIVATE",
    accessLevel: ["superuser", "admin", "customer"],
  },
  {
    path: ROUTE_CONSTANTS.USER_SETTINGS,
    element: UserSettings,
    type: "PRIVATE",
    accessLevel: ["superuser", "admin", "customer"],
  },
];

// Function to use to generate route with ROUTE_CONTANT, params or query params
export const generateRoute = (
  route: string,
  params?: Record<string, string | number>,
  queryParams: Record<string, string | number> = {},
) => {
  let path = route;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value.toString());
    });
  }

  const queryString = new URLSearchParams(
    Object.entries(queryParams).map(([key, value]) => [key, value.toString()]),
  ).toString();

  // If there are query parameters, append them to the path
  if (queryString) {
    path += `?${queryString}`;
  }

  return path;
};

export default routes;
