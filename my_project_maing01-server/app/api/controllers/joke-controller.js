class JokeController {

    helloWorld(ucEnv) {
        let dtoOut = {
            text: "Hello World!",
            uuAppErrorMap: {}
        };
        return dtoOut;
    }

}

module.exports = new JokeController();