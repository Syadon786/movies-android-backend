import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';

export default function createServer() {
    const app = express();

    app.use(express.static(`${__dirname}/public`));
    app.use(bodyParser.urlencoded({extended: true}));
    app.set('view engine', 'ejs');

    return app;
}
