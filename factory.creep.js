const REGULAR_CREEPS = require('global');

const creepFactory = {
    build: function (role) {
        const creepName = 'Ball#' + Math.floor(Math.random() * 1000);
        switch(role) {
            case 'builder':
                return Game.spawns['Main Spawn'].spawnCreep(
                    REGULAR_CREEPS.REGULAR_BUILDER_BODY, 'B|'+ creepName, {memory: {role: 'builder',
                        working_room: arguments[1]}});
                break;
            case 'harvester':
                return Game.spawns['Main Spawn'].spawnCreep(
                    REGULAR_CREEPS.REGULAR_HARVESTER_BODY, 'H|'+ creepName, {memory: {role: 'harvester',
                        working_room: arguments[1]}});
                break;
            case 'harvester_mini':
                return Game.spawns['Main Spawn'].spawnCreep(
                    REGULAR_CREEPS.START_HARVESTER_BODY, 'Hm|'+ creepName, {memory: {role: 'harvester',
                        working_room: arguments[1]}});
                break;
            case 'upgrader':
               return Game.spawns['Main Spawn'].spawnCreep(
                    REGULAR_CREEPS.REGULAR_UPGRADER_BODY, 'U|'+ creepName, {memory: {role: 'upgrader',
                        working_room: arguments[1]}});
                break;
            case 'transporter':
                return Game.spawns['Main Spawn'].spawnCreep(
                    REGULAR_CREEPS.REGULAR_TRANSPORT_BODY, 'T|'+ creepName, {memory: {role: 'transporter',
                        working_room: arguments[1]}});
                break;
            case 'explorer_builder':
                return Game.spawns['Main Spawn'].spawnCreep(
                    REGULAR_CREEPS.EXPLORER_BUILDER_BODY, 'EB|'+ creepName, {memory: {role: 'explorer_builder',
                        working_room: arguments[1], path: new RoomPosition(2, 32, arguments[1])}});
                break;
            case 'explorer_transporter':
                return Game.spawns['Main Spawn'].spawnCreep(
                    REGULAR_CREEPS.EXPLORER_TRANSPORT_BODY, 'ET|'+ creepName, {memory: {role: 'explorer_transporter',
                        working_room: arguments[1], path: new RoomPosition(2, 32, arguments[1]),
                        base_container: arguments[2]}});
                break;
            case 'explorer_harvester':
                return Game.spawns['Main Spawn'].spawnCreep(
                    REGULAR_CREEPS.EXPLORER_HARVESTER_BODY, 'EH|'+ creepName, {memory: {role: 'explorer_harvester',
                        working_room: arguments[1], path: new RoomPosition(2, 32, arguments[1])}});
                break;
            case 'attack_ranger':
                return Game.spawns['Main Spawn'].spawnCreep(
                    REGULAR_CREEPS.REGULAR_RANGE_ATTACKER, 'AR|'+ creepName, {memory: {role: 'attack_ranger',
                        attack_target: arguments[1], path: new RoomPosition(2, 32, arguments[1]),
                        spawn_point: new RoomPosition(44, 14, 'E44N18')}});
                break;
            case 'attack_milli':
                return Game.spawns['Main Spawn'].spawnCreep(
                    REGULAR_CREEPS.REGULAR_MILLI_ATTACKER, 'AM|'+ creepName, {memory: {role: 'attack_milli',
                        attack_target: arguments[1], path: new RoomPosition(2, 32, arguments[1]),
                        spawn_point: new RoomPosition(44, 14, 'E44N18')}});
                break;
        }
    }
};

module.exports.creepFactory = creepFactory;

