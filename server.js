import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import SERVER_CONFIG from './server/config';

import routes from './server/routes/index'

var app = express();

app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(SERVER_CONFIG.port, (err) => {
    if (err) throw err;

    console.log(`listening on port ${SERVER_CONFIG.port}`); 
})

app.use('/', routes);

export default app
