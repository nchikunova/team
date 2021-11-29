"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class TeamMongo extends UuObjectDao {
    async createSchema() {}

    async create(uuObject) {
        return await super.insertOne(uuObject);
    }

    async get(awid, id) {
        const filter = {
            awid,
            id
        };
        return await super.findOne(filter);
    }

    async update(uuObject) {
        const filter = {
            awid: uuObject.awid,
            id: uuObject.id
        };

        return await super.findOneAndUpdate(filter, uuObject, "NONE");
    }
}

module.exports = TeamMongo;