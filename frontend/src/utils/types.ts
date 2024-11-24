
export type Travel = {
    routeResponse: RouteResponse,
    origin: Coords,
    destination: Coords
}

export type Coords = {
    latitude: number,
    longitude: number
}

type RouteResponse = {
    routes: Route[]
}

type Route = {
    legs: Leg[]
}

type Leg = {
    polyline: Polyline
}

type Polyline = {
    encodedPolyline: string
}