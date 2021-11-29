"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/team-error");

const WARNINGS = {
    initUnsupportedKeys: {
        code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    },

    getUnsupportedKeys: {
        code: `${Errors.Get.UC_CODE}unsupportedKeys`,
    },

    updateUnsupportedKeys: {
        code: `${Errors.Update.UC_CODE}unsupportedKeys`,
    },

};

class TeamAbl {
    constructor() {
        this.validator = Validator.load();
        this.dao = DaoFactory.getDao("team");
    }

    async create(uri, dtoIn, session, uuAppErrorMap = {}) {
        const awid = uri.getAwid();

        // HDS 1 - data validation
        const validationResult = this.validator.validate("teamCreateDtoInType", dtoIn);
        uuAppErrorMap = ValidationHelper.processValidationResult(
            dtoIn,
            validationResult,
            WARNINGS.initUnsupportedKeys.code,
            Errors.Create.InvalidDtoIn
        );

        // HDS 2 - default values (coachCode, year)
        const uuObject = {...dtoIn, awid };

        if (!uuObject.coachCode) {
            uuObject.coachCode = session.getIdentity().getUuIdentity();
        }
        if (!uuObject.year) {
            uuObject.year = new Date().getFullYear();
        }

        // HDS 3 - create a team via DAO
        let uuTeam = null;

        try {
            uuTeam = await this.dao.create(uuObject);
        } catch (err) {
            throw new Errors.Create.CreateTeamDaoFailed({ uuAppErrorMap }, err);
        }

        // HDS 4 - return the team
        return {
            ...uuTeam,
            uuAppErrorMap
        };
    }

    async get(uri, dtoIn, uuAppErrorMap = {}) {
        // Validation data 
        const validationResult = this.validator.validate("teamGetDtoInType", dtoIn);
        uuAppErrorMap = ValidationHelper.processValidationResult(
            dtoIn,
            validationResult,
            WARNINGS.getUnsupportedKeys.code,
            Errors.Get.InvalidDtoIn
        );
        // find a Team
        const awid = uri.getAwid();
        const uuTeam = await this.dao.get(awid, dtoIn.id);
        if (!uuTeam) {
            throw new Errors.Get.TeamDoesNotExist({ uuAppErrorMap }, { team: dtoIn.id })
        }
        // return
        return {...uuTeam, uuAppErrorMap }
    }

    async update(uri, dtoIn, uuAppErrorMap = {}) {
        const awid = uri.getAwid();
        // HDS 1 - validation
        const validationResult = this.validator.validate("teamUpdateDtoInType", dtoIn);
        uuAppErrorMap = ValidationHelper.processValidationResult(
            dtoIn,
            validationResult,
            WARNINGS.updateUnsupportedKeys.code,
            Errors.Update.InvalidDtoIn
        );

        // HDS 2 - find(check existance) "=> Update"
        const uuObject = {...dtoIn, awid }
        let uuTeam = await this.dao.get(awid, dtoIn.id)
        if (!uuTeam) {
            throw Errors.Update.TeamDoesNotExist({ uuAppErrorMap }, { tema: dtoIn.id })
        }
        // HDS 3 - update

        try {
            uuTeam = await this.dao.update(uuObject);
        } catch (err) {
            throw new Errors.Update.UpdateTeamDaoFailed({ uuAppErrorMap }, err);
        }

        // HDS 4 - return the team
        return {
            ...uuTeam,
            uuAppErrorMap
        };
    }

}

module.exports = new TeamAbl();