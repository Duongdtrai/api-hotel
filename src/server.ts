
import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as passport from 'passport';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import swaggerDocument from './swagger/doc';
import routes from './routes';
import connect from './configs/database';
const app = express();
const port = process.env.PORT || 3000;
// env
dotenv.config();
/* middleware */
// cors
app.use(cors());
app.options('*', cors());
// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cookie-parser
app.use(cookieParser());

// passport
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect database
connect();

// api-swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);

app.listen(port, () => {
    console.log(`App is running http://localhost:${port}/api-docs`);
});
