import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import breakfast from './breakfast.resource';
import breakfastRoutes from './breakfast.routes';

export default ({ config, db }) => {
    let api = Router();

    // mount the facets resource
    api.use('/facets', facets({ config }));

    api.use('/breakfast', breakfast({ config }));

    // perhaps expose some API metadata at the root
    api.get('/', (req, res) => {
        res.json({ version });
    });

    return api;
}