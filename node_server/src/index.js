"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cloudinary_1 = __importDefault(require("cloudinary"));
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var db_1 = __importDefault(require("./config/db"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var orgRoutes_1 = __importDefault(require("./routes/orgRoutes"));
var graphRoutes_1 = __importDefault(require("./routes/graphRoutes"));
var multer = require('multer');
// loads environment variables from a `.env` file into `process.env`. 
dotenv_1.default.config({ path: "./.env" });
var upload = multer({
    dest: './public/upload'
});
// define port
var PORT = process.env.PORT || 8080;
console.log("Port is : ", process.env.PORT);
console.log("CLOUDINARY_API_SECRET is : ", process.env.CLOUDINARY_API_SECRET);
// initialize express
var app = (0, express_1.default)();
// initialize helmet to secure express app
app.use((0, helmet_1.default)());
app.use(upload.any()); // 文件上传
//connect to db
(0, db_1.default)();
// configure cloudinary 
// cloudinary.v2.config({
//   cloud_name: "social-network-101",
//   api_key: "397828424674875",
//   api_secret: "ZRMnO8CC7-SY-kUOXU9sjGRRNNc",
// });
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// initialize cors 处理跨域问题
app.use((0, cors_1.default)({ origin: "*", credentials: true, }));
// Other Middlewares
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)('dev'));
// app.use(express.json());
app.use(express_1.default.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(express.urlencoded({  }));
// Routes
app.get("/api", function (req, res) {
    res.send('<h1>Join3 Network API...</h1>');
});
app.use("/api/user", userRoutes_1.default);
app.use("/api/org", orgRoutes_1.default);
app.use("/api/graph", graphRoutes_1.default);
// initialize server
app.listen(PORT, function () {
    console.log("Server is running in port ".concat(PORT));
});
