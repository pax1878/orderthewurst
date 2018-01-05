import mongoose from 'mongoose';
import Promise from 'bluebird';
import config from './config.json';
mongoose.Promise = Promise;


export default callback => {
    const mongoUri = config.mongo.host;
    mongoose.connect(mongoUri, { keepAlive: 1 });
    mongoose.connection.on('error', () => {
        throw new Error(`unable to connect to database: ${mongoUri}`);
    });
    // print mongoose logs in dev env
    if (config.MONGOOSE_DEBUG) {
        mongoose.set('debug', (collectionName, method, query, doc) => {
            debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
        });
    }
    callback();
}
