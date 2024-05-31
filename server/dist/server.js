"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const articlesRoutes_1 = __importDefault(require("./routes/articlesRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const database_1 = require("./util/database");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, database_1.connectToDb)()
    .then(() => console.log('Database & tables created!'))
    .catch((err) => console.log('Error: ' + err.message));
app.use((0, cors_1.default)({ origin: 'http://localhost:4200' }));
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(categoryRoutes_1.default);
app.use(articlesRoutes_1.default);
app.use(userRoutes_1.default);
app.use(commentRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
