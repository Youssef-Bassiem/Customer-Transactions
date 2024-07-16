import jsonServer from "json-server";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
// in dev mode use npm run dev to run jsonServer and vite redirect /api/customers, /api/transactions to jsonServer
// in production use vercel route to redirect /api/customers, /api/transactions to jsonServer
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use("/api", router);
server.listen(5000, () => {
  console.log("JSON Server is running on http://localhost:5000");
});

export default server;
