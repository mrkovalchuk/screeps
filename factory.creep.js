const REGULAR_CREEPS = require('global');

const creepFactory = {
    build: function (role) {
        const creepName = 'Ball#' + Math.floor(Math.random() * 1000);
        switch (role) {
            case 'builder':
                Game.spawns['PrimeTown'].spawnCreep(
                    REGULAR_CREEPS.REGULAR_BUILDER_BODY, 'B|'+ creepName, {memory: {role: 'builder',
                        working_room: arguments[1]}});
                break;
            case 'harvester':
                Game.spawns['PrimeTown'].spawnCreep(
                    REGULAR_CREEPS.REGULAR_HARVESTER_BODY, 'H|'+ creepName, {memory: {role: 'harvester',
                        working_room: arguments[1]}});
                break;
            case 'upgrader':
                Game.spawns['PrimeTown'].spawnCreep(
                    REGULAR_CREEPS.REGULAR_BUILDER_BODY, 'U|'+ creepName, {memory: {role: 'upgrader',
                        working_room: arguments[1]}});
                break;
            case 'transporter':
                Game.spawns['PrimeTown'].spawnCreep(
                    REGULAR_CREEPS.REGULAR_TRANSPORT_BODY, 'U|'+ creepName, {memory: {role: 'transporter',
                        working_room: arguments[1]}});
                break;
            case 'explorer_builder':
                Game.spawns['PrimeTown'].spawnCreep(
                    REGULAR_CREEPS.EXPLORER_BUILDER_BODY, 'E|'+ creepName, {memory: {role: 'explorer_builder',
                        working_room: arguments[1], path: new RoomPosition(2, 32, arguments[1])}});
        }
    }
};

module.exports.creepFactory = creepFactory;

