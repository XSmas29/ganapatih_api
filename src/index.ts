import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
  origin: '*',
}))

app.get('/', (req, res) => {
  res.send('Hello, TypeScript Node Express!');
});

app.get('/data', async (req, res) => {
  const { pickup_datetime_min, pickup_datetime_max, dropoff_datetime_min, dropoff_datetime_max, fare_min, fare_max, distance_min, distance_max, payment_type } = req.query
  const url = 'https://data.cityofnewyork.us/resource/gkne-dk5s.json'
  const filter = []

  if (pickup_datetime_min) filter.push(`pickup_datetime >= '${pickup_datetime_min}'`)
  if (pickup_datetime_max) filter.push(`pickup_datetime <= '${pickup_datetime_max}'`)
  if (dropoff_datetime_min) filter.push(`dropoff_datetime >= '${dropoff_datetime_min}'`)
  if (dropoff_datetime_max) filter.push(`dropoff_datetime <= '${dropoff_datetime_max}'`)
  if (fare_min) filter.push(`total_amount >= ${fare_min}`)
  if (fare_max) filter.push(`total_amount <= ${fare_max}`)
  if (distance_min) filter.push(`trip_distance >= ${distance_min}`)
  if (distance_max) filter.push(`trip_distance <= ${distance_max}`)
  if (payment_type) filter.push(`payment_type = '${payment_type}'`)

  const where = filter.join(' and ')
  const data = await axios.get(url,
    {
      params: {
        $where: where,
      },
      headers: {
        'X-App-Token': process.env.APP_TOKEN,
      },
    }
  )
  console.log(data.data.length)
  // const arr: string[] = []
  // data.data.map((item: any) => {
  //   if (arr.findIndex((i) => i === item.payment_type) === -1) {
  //     arr.push(item.payment_type)
  //   }
  // })
  // console.log(arr)
  res.send(data.data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});