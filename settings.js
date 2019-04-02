const ROOM_CREEP_SET = {
    main: {
        harvesters_mini: 4,
        harvesters: 6,
        builders: 0,
        transporters: {
            from: 0, in: 4
        },
        upgraders: 0,
        attack_milli: 4,
        attack_rangers: 7,
    },
    energy_room: {explorer_builders: 0, explorer_harvester: 0,  explorer_transporters: 0, transporters: {from: 0, in: 0}}
};

const ROOM_CREEPS = {
    E45N18: ROOM_CREEP_SET.energy_room,
    E44N18: ROOM_CREEP_SET.main
};

module.exports.ROOM_CREEPS = ROOM_CREEPS;
