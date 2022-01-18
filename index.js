import express from 'express';
import cors from 'cors';

const app = express();

app.listen(3006);
app.use(cors());


// The function that returns a JSON string
const readJsonFromFile = async remoteFilePath => new Promise((resolve, reject) => {
  let buf = ''
  bucket.file(remoteFilePath)
    .createReadStream()
    .on('data', d => (buf += d))
    .on('end', () => resolve(buf))
    .on('error', e => reject(e))
})

// Handle GET requests to / route
app.get('/', (req, res) => {
  res.json({ message: 'No results' });
});

app.get('/metadata/:id', async(req, res) => {
  const data = await readJsonFromFile('metadata/' + req.params.id + '.json');

  console.log(data);
  if (!data) {
    res.json({ message: 'No results' });
    return;
  }

  const parsedJson = JSON.parse(data);
  const currentDate = new Date();
  const mysteryDate = new Date('Nov 16, 2021 17:00:00');

  console.log(currentDate);

  if (currentDate.getTime() < mysteryDate.getTime()) {
    parsedJson.image = 'https://ipfs.io/ipfs/QmU9CQJ1BMgS93f96VH77AsoCaDEErfGRdDTPfFqp9KTsH';
    parsedJson.attributes.map(attribute => {
        attribute.value = '?';
    });
  }

  res.json(parsedJson);
});