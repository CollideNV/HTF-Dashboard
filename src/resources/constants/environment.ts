const {
  REACT_APP_DEADLINE,
  REACT_APP_DASHBOARD_API_URL,
  REACT_APP_DASHBOARD_WEBSOCKET_URL

} = process.env;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  dashboard_api: {
    http: REACT_APP_DASHBOARD_API_URL ?? "https://htf.collide.be",
    websocket: REACT_APP_DASHBOARD_WEBSOCKET_URL ?? "wss://htf.collide.be",
  },
  deadline: REACT_APP_DEADLINE ?? "2024-11-19T16:00:00",
};
