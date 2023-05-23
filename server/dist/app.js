"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_router_1 = require("./routes/login/login.router");
const signup_router_1 = require("./routes/signup/signup.router");
const bookings_router_1 = require("./routes/bookings/bookings.router");
const facilities_router_1 = require("./routes/facilities/facilities.router");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/login', login_router_1.loginRouter);
app.use('/api/signup', signup_router_1.signupRouter);
app.use('/api/bookings', bookings_router_1.bookingsRouter);
app.use('/api/facilities', facilities_router_1.facilitiesRouter);
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.get('/*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
exports.default = app;
