const {
  REACT_APP_DEADLINE,
} = process.env;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  dashboard_api: {
    http: "http://ec2-16-16-182-215.eu-north-1.compute.amazonaws.com",
    websocket: "wss://ec2-16-16-182-215.eu-north-1.compute.amazonaws.com",
  },
  deadline: REACT_APP_DEADLINE ?? "2024-11-09T16:00:00",
};
