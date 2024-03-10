import { RouteObject } from "react-router-dom";
import { MainLayout } from "./widget/MainLayout";
import { IconMail } from "@tabler/icons-react";
import { Reports } from "./pages/Reports/Reports";
import { ReportDetailed } from "./pages/ReportDetailed";

/**
 * Маршруты приложения
 * @enum
 */
export enum RoutesEnum {
  AllReports = "/",
  MyReports = "/my/reports/",
  Report = "/reports/",
}

export interface IAppRoute {
  label?: string;
  path: string;
  index?: boolean;
  icon?: JSX.Element;
  element: JSX.Element;
  children?: IAppRoute[];
}

export interface ISimpleRouteObject {
  label?: string;
  icon?: JSX.Element;
  path: string;
}

/**
 * Кастомные объекты маршрутов (с label и icon для sidebar)
 * @const IAppRoute[]
 */
export const routes: IAppRoute[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        label: "Все отчеты",
        path: RoutesEnum.AllReports,
        index: true,
        element: <Reports />,
        icon: <IconMail size="18" stroke={1.5} key={RoutesEnum.AllReports} />,
      },
      {
        path: RoutesEnum.Report + ":id",
        element: <ReportDetailed />,
      },
    ],
  },
  /*  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  }, */
];

export const realRoutes: RouteObject[] = convertRoutes(routes);

export const smallRoutes = selectRoutes(routes);

/**
 * @param routes IAppRoute[] - Массив объектов маршрутов.
 * @returns RouteObject[] - Массив объектов маршрутов для router dom
 */
function convertRoutes(routes: IAppRoute[]): RouteObject[] {
  return routes.map((route) => {
    const convertedRoute: RouteObject = {
      path: route.path,
      element: route.element,
    };
    if (route.children) {
      convertedRoute.children = convertRoutes(route.children);
    }
    return convertedRoute;
  });
}

/**
 * @param routes IAppRoute[] - Массив объектов маршрутов.
 * @returns ISimpleRouteObject[] - Массив простых объектов маршрутов для sidebar и тд.
 */
export function selectRoutes(routes: IAppRoute[]) {
  const selected: ISimpleRouteObject[] = [];

  routes.forEach((route) => {
    if (Object.prototype.hasOwnProperty.call(route, "children")) {
      route.children && selected.push(...selectRoutes(route.children));
    } else {
      route.label &&
        selected.push({
          path: route.path,
          label: route.label,
          icon: route.icon,
        });
    }
  });

  return selected;
}
