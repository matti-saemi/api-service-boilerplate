import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import { connectDB } from './repositories/mongoRepository';
import controller from './controllers';
import cors from 'cors';
import { config } from './Config';
import bodyParser from 'body-parser';
import { createServer } from 'http';

const app = express();

app.use(express.json());

const corsOption = {
  origin :'https://example.com',
  optionSuccessStatus: 200
}

app.use(cors(corsOption));
app.use(
  mongoSanitize({
    allowDots: true,
  }),
);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/', controller);

const server = createServer(app);

server.listen(config.port, async () => {
  await connectDB();
  console.log(`api-service is running on port ${config.port}`);
});

export default app;
