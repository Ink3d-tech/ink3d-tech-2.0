export const getRoute = (route: string, params: Record<string, string | number>) => {
    let updatedRoute = route;
      Object.keys(params).forEach((key) => {
        updatedRoute = updatedRoute.replace(`:${key}`, params[key].toString());
    });
    return updatedRoute;
};