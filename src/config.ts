
const config = {
    websocketUrl: import.meta.env.VITE_APP_WEBSOCKET_URL,
    mapboxToken: import.meta.env.VITE_APP_MAPBOX_KEY,
    positionsClusterMember: 10,
    mapBoxStyle: "mapbox://styles/yliu0141/cl4ozqtzo000915qh7e5vhdll"
};
console.log(import.meta.env)
export default config;
