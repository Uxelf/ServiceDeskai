import express from "express";
import { connectDB } from "./db.js";
import ticketsRoutes from "./tickets/tickets.routes.js";
import usersRoutes from './users/users.routes.js'
import officesRoutes from './offices/offices.routes.js'
import authRoutes from './auth/auth.routes.js'
import cookieParser from "cookie-parser";
import cors from "cors"


const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: "http://localhost:5173", credentials: true,}));
const port = 3000;

app.use("/api/tickets", ticketsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/offices", officesRoutes);
app.use("/api/auth", authRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});


 
//This is just for testing 
/* import bcrypt from "bcrypt";
async function hash() {
  const pass = await bcrypt.hash("admin", 10);
  console.log(pass);
}
hash(); */