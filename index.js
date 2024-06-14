import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import emailTemplateRoutes from "./routes/emailTemplateRoutes.js";
import userRoleRoutes from "./routes/userRoleRoutes.js";
import chequeWriterRoute from "./routes/chequeWriterRoutes.js";
import chequeTemplateRoute from "./routes/chequeTemplateRoutes.js";
import bankMasterRoute from "./routes/bankMasterRoutes.js";
import countryRoute from "./routes/countryRoutes.js";
import customerMasterRoute from "./routes/customerMasterRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import voucherMasterRoute from "./routes/voucherMasterRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  "/api",
  emailTemplateRoutes,
  userRoleRoutes,
  chequeWriterRoute,
  chequeTemplateRoute,
  bankMasterRoute,
  countryRoute,
  customerMasterRoute,
  userRoutes,
  voucherMasterRoute
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
