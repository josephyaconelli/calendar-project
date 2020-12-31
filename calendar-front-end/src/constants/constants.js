export let BASE_URL = 'http://ec2-54-188-144-211.us-west-2.compute.amazonaws.com:5000'

// uncomment for local server testing
BASE_URL = 'http://localhost:5000'

const constants = {
  SERVER: {
    LOGIN: `${BASE_URL}/auth/login`,
    REFRESH: `${BASE_URL}/auth/refresh`,
    GET_EVENTS_BY_MONTH: `${BASE_URL}/events/getByMonth`,
    ADD_EVENT: `${BASE_URL}/events/add`,
    EDIT_EVENT: `${BASE_URL}/events/edit`,
    SEARCH_EVENTS: `${BASE_URL}/events/search`,
    REMOVE_EVENT: `${BASE_URL}/events/remove`,
    REGISTER: `${BASE_URL}/auth/register`
  }
}

export default constants