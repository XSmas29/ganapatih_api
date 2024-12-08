"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: '*',
}));
app.get('/', (req, res) => {
    res.send('Hello, TypeScript Node Express!');
});
app.get('/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pickup_datetime_min, pickup_datetime_max, dropoff_datetime_min, dropoff_datetime_max, fare_min, fare_max, distance_min, distance_max, payment_type } = req.query;
    const url = 'https://data.cityofnewyork.us/resource/gkne-dk5s.json';
    const filter = [];
    if (pickup_datetime_min)
        filter.push(`pickup_datetime >= '${pickup_datetime_min}'`);
    if (pickup_datetime_max)
        filter.push(`pickup_datetime <= '${pickup_datetime_max}'`);
    if (dropoff_datetime_min)
        filter.push(`dropoff_datetime >= '${dropoff_datetime_min}'`);
    if (dropoff_datetime_max)
        filter.push(`dropoff_datetime <= '${dropoff_datetime_max}'`);
    if (fare_min)
        filter.push(`total_amount >= ${fare_min}`);
    if (fare_max)
        filter.push(`total_amount <= ${fare_max}`);
    if (distance_min)
        filter.push(`trip_distance >= ${distance_min}`);
    if (distance_max)
        filter.push(`trip_distance <= ${distance_max}`);
    if (payment_type)
        filter.push(`payment_type = '${payment_type}'`);
    const where = filter.join(' and ');
    const data = yield axios_1.default.get(url, {
        params: {
            $where: where,
        },
        headers: {
            'X-App-Token': process.env.APP_TOKEN,
        },
    });
    console.log(data.data.length);
    // const arr: string[] = []
    // data.data.map((item: any) => {
    //   if (arr.findIndex((i) => i === item.payment_type) === -1) {
    //     arr.push(item.payment_type)
    //   }
    // })
    // console.log(arr)
    res.send(data.data);
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
