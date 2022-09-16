import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import { connect } from './db/database';
import routes from './routes';
import logger from './logger';

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.listen(process.env.PORT, () => {  
    logger.info(`Server is running on port ${process.env.PORT}.`); 
    connect();
    routes(app);
});
