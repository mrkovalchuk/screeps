const ROOM_CREEP_SET = {
    main: {
        harvesters_mini: 4,
        harvesters: 6,
        builders: 5,
        transporters: {
            from: 1, in: 2
        },
        upgraders: 4
    },
    energy_room: {explorer_builders: 2, explorer_harvester: 1,  explorer_transporters: 1, transporters: {from: 0, in: 0}}
};

const ROOM_CREEPS = {
    E45N18: ROOM_CREEP_SET.energy_room,
    E44N18: ROOM_CREEP_SET.main
};

module.exports.ROOM_CREEPS = ROOM_CREEPS;
