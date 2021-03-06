//Foursquare api: https://developer.foursquare.com/docs/api/venues/details
//react-foursquare: https://github.com/foursquare/react-foursquare
class Helper {
    static baseURL() {
        return "https://api.foursquare.com/v2"
    }

    static auth() {
        const keys = {
            client_id: "AXADPCJATX1X1RMA1ZCVBIXBTIJ2Y41SIP0TYR4G1AH2GOJF",
            client_secret: "YN2BY2IUKZHZXI1VUUXBR2FSBBPMTO5EXSV5SESSRMFNWAA5",
            v: "20181026"
        }
        return Object.keys(keys).map(key => `${key}=${keys[key]}`).join(('&'));
    }

    static urlBuilder(urlPrams) {
        if (!urlPrams) {
            return ""
        }
        return Object.keys(urlPrams).map(key => `${key}=${urlPrams[key]}`).join(('&'));
    }

    static headers() {
        return {
            Accept: "application/json"
        }
    }

    //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    static simpleFetch(endPoint, method, urlPrams) {
        let requestData = {
            method,
            headers: Helper.headers()
        }
        return fetch(
            `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
                urlPrams
            )}`,
            requestData
        ).then(res => res.json());
    }
}

//Foursquare api: Search Venues
export default class SquareAPI {
    //Search venues: https://developer.foursquare.com/docs/api/venues/search
    static searchVenues(urlPrams) {
        return Helper.simpleFetch("/venues/search", "GET", urlPrams);
    }
    //Search venues details: https://developer.foursquare.com/docs/api/venues/details
    static getVenueDetails(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
    }
}