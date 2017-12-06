const PROXY_CONFIG = [
  {
    context: [
      "/api"
    ],
    target: "http://localhost:8090",
    secure: false
  },
  {
    context: [
      "/ws"
    ],
    target: "http://localhost:8090",
    secure: false,
    "ws":true
  }
]

module.exports = PROXY_CONFIG;
