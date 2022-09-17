import { connect } from './db/database';
import logger from './logger';
import createServer from './utils/server';

const app = createServer();

app.listen(process.env.PORT, async () => {  
    logger.info(`Server is running on port ${process.env.PORT}.`); 
    await connect();
});
