const teamCreateDtoInType = shape({
    name: string().isRequired(),
    year: number(),
    coachCode: code(),
    country: oneOf("UA", "CZ", "UK").isRequired()
});

const teamGetDtoInType = shape({
    id: id().isRequired()
});

const teamUpdateDtoInType = shape({
    id: id().isRequired(),
    name: string(),
    year: number(),
    coachCode: code(),
    country: oneOf("UA", "CZ", "UK")
});