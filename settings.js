const ROOM_CREEP_SET = {
    main: {
        harvesters_mini: 2,
        harvesters: 5,
        builders: 1,
        transporters: {
            from: 0, in: 3
        },
        upgraders: 2,
        attack_milli: 0,
        attack_rangers: 0,
    },
    energy_room: {explorer_builders: 0, explorer_harvester: 0,  explorer_transporters: 0, transporters: {from: 0, in: 0}}
};

const ROOM_CREEPS = {
    W44N49: ROOM_CREEP_SET.main
};

const tickTime = {
    regularTime: 25,
    warTime: 2,
}

module.exports.ROOM_CREEPS = ROOM_CREEPS;
module.exports.tickTime = tickTime;