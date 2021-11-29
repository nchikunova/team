"use strict";

const ProjectMainUseCaseError = require("./project-main-use-case-error");
const TEAM_ERROR_PREFIX = `${ProjectMainUseCaseError.ERROR_PREFIX}team/`;

const Create = {
    UC_CODE: `${TEAM_ERROR_PREFIX}create/`,

    InvalidDtoIn: class extends ProjectMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Create.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },

    CreateTeamDaoFailed: class extends ProjectMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Create.UC_CODE}createTeamDaoFailed`;
            this.message = "Create Team by DAO Team failed.";
        }
    },
};

const Get = {
    UC_CODE: `${TEAM_ERROR_PREFIX}get/`,

    InvalidDtoIn: class extends ProjectMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Get.UC_CODE}invalidDtoIn`;
            this.message = "DtoIn is not valid.";
        }
    },
    TeamDoesNotExist: class extends ProjectMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Get.UC_CODE}teamDoesNotExist`;
            this.message = "Team does not exist.";
        }
    },
};
const Update = {
    UC_CODE: `$ { TEAM_ERROR_PREFIX }/update`,

    InvalidDtoIn: class extends ProjectMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `$ {Update.UC_CODE}invalidDtoIn`
                // invalidDtoIn;
            this.message = "DtoIn is not valid.";
        }
    },

    TeamDoesNotExist: class extends ProjectMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `$ {Update.UC_CODE}teamDoesNotExist`
                // invalidDtoIn;
            this.message = "Team does not exist.";
        }
    },

    UpdateTeamDaoFailed: class extends ProjectMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `$ {Update.UC_CODE}updateTeamDaoFailed`
                // invalidDtoIn;
            this.message = "Update Team by DAO failed.";
        }
    },
};


module.exports = {
    Create,
    Get,
    Update
};