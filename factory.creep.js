const REGULAR_CREEPS = require('global');

const creepFactory = {
    build: function (role) {
        const creepName = 'Ball#' + Math.floor(Math.random() * 1000);
        switch (role) {
            case 'builder':
                console.log('Arguments: ' + arguments[1]);
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
            case 'transport':
                Game.spawns['PrimeTown'].spawnCreep(
                    REGULAR_CREEPS.REGULAR_UPGRADER_BODY, 'U|'+ creepName, {memory: {role: 'transporter',
                        working_room: arguments[1]}});
                break;
        }
    }
};

module.exports.creepFactory = creepFactory;

