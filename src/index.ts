import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript Node Express!');
});

app.get('/data', async (req, res) => {
  const { time_min, time_max, fare_min, fare_max, distance_min, distance_max, payment_type } = req.query
  const url = 'https://data.cityofnewyork.us/resource/gkne-dk5s.json'
  const filter = []

  if (time_min) filter.push(`pickup_datetime >= '${time_min}'`)
  if (time_max) filter.push(`pickup_datetime <= '${time_max}'`)
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
  res.send(data.data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});