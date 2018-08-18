import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import craigslistScraper from './utils/craigslistScrapper';

const PORT = process.env.API_PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

const apiRoutes = express.Router(); // eslint-disable-line new-cap
app.use('/api', apiRoutes);

apiRoutes.post('/getListings', async (req, res) => {
  console.log(req.body);
  const options = {};
  let data = await craigslistScraper(options);
  const {minLat, minLong, maxLat, maxLong} = req.body;
  if (minLat) data = data.filter(d => d.Latitude >= minLat);
  if (maxLat) data = data.filter(d => d.Latitude <= maxLat);
  if (minLong) data = data.filter(d => d.Longitude >= minLong);
  if (maxLong) data = data.filter(d => d.Longitude <= maxLong);
  return res.json({data});
});

app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
