const ROOM_CREEP_SET = {
    main: {
        harvesters_mini: 4,
        harvesters: 6,
        builders: 6,
        transporters: {
            from: 1, in: 2
        },
        upgraders: 3
    },
    energy_room: {harvesters: 3, explorer_builder: 2, transporters: {in: 2}}
};

const ROOM_CREEPS = {
    E45N18: ROOM_CREEP_SET.energy_room,
    E44N18: ROOM_CREEP_SET.main
};

module.exports.ROOM_CREEPS = ROOM_CREEPS;
