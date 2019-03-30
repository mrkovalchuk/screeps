const REGULAR_BUILDER_BODY = [WORK, WORK, WORK, MOVE, CARRY];
const REGULAR_UPGRADER_BODY = [WORK, WORK, WORK, MOVE, CARRY, CARRY];
const REGULAR_HARVESTER_BODY = [WORK, WORK, WORK, MOVE, CARRY];
const REGULAR_TRANSPORT_BODY = [MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];

const START_HARVESTER_BODY = [WORK, WORK, MOVE, CARRY];

const ROOM_CREEP_SET = {
    main: {
        harvesters_mini: 4,
        harvesters: 6,
        builders: 5,
        transporters: {
            from: 1, in: 2
        },
        upgraders: 6
    },
    energy_room: {harvesters: 3, builders: 2, transporters: {in: 2}}
};


module.exports = {REGULAR_BUILDER_BODY, REGULAR_HARVESTER_BODY, REGULAR_UPGRADER_BODY,
    REGULAR_TRANSPORT_BODY, START_HARVESTER_BODY, ROOM_CREEP_SET};
