
export type Travel = {
    origin: Coords,
    destination: Coords,
    distance: string,
    duration: string,
    options: Driver[],
    routeResponse: RouteResponse,
}

export type Coords = {
    latitude: number,
    longitude: number
}

export type Driver = {
    id: number,
    name: string,
    description: string,
    vehicle: string,
    review: Review,
    value: number
}

type Review = {
    rating: number,
    comment: string
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

export type Ride = {
    id: number,
    date: Date,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    driver: {
        id: number,
        name: string
    },
    value: number
}