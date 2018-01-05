import resource from 'resource-router-middleware';
import Breakfast from '../models/breakfast.model';
import facets from "../models/facets";
import ParticipantSchema from "../models/participant.schema";

export default ({ config }) => resource({

    /** Property name to store preloaded entity on `request`. */
    id: 'breakfast',

    load(req, id, callback) {
        Breakfast.findOne({_id: id}).then(
            breakfast => {
                let err = breakfast ? null : 'Not found';
                callback(err, breakfast)
            }
        );
    },

    /** GET / - List all entities */
    list({ query }, res) {
        let sort = '-date';
        sort = query.sort && !query.latest ? query.sort : sort;
        Breakfast.find().sort(sort).then(
            breakfasts => {
                let result;
                if(query.latest) {
                    result = breakfasts[0];
                } else {
                    result = breakfasts;
                }

                res.json(result);
            }
        );
    },

    /** POST / - Create a new entity */
    create({ body }, res) {
        let breakfast = new Breakfast();
        breakfast.title = body.title;
        breakfast.date = new Date();
        breakfast.created = new Date();
        breakfast.updated = new Date();
        breakfast.save().then((breakfast) => {
            console.log(breakfast);
            res.sendStatus(200);
        });
    },

    /** GET /:id - Return a given entity */
    read({ breakfast }, res) {
        res.json(breakfast);
    },

    /** PUT /:id - Update a given entity */
    update({ breakfast, body }, res) {
        body.updated = new Date();
        Object.assign(breakfast, body);
        breakfast.save().then(
            breakfast => {
                res.json(breakfast);
            }
        );
    },

    /** DELETE /:id - Delete a given entity */
    delete({ facet }, res) {
        facets.splice(facets.indexOf(facet), 1);
        res.sendStatus(204);
    }
});
