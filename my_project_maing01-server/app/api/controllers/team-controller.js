"use strict";

const TeamAbl = require("../../abl/team-abl");

class TeamController {
    create(ucEnv) {
        return TeamAbl.create(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession())
    }
    get(ucEnv) {
        return TeamAbl.get(ucEnv.getUri(), ucEnv.getDtoIn())
    }
    update(ucEnv) {
        return TeamAbl.update(ucEnv.getUri(), ucEnv.getDtoIn());
    }
};

module.exports = new TeamController();