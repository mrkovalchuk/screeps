const creepFactory = {
    build: function (role) {
        const creepName = 'Ball#' + Math.floor(Math.random() * 1000);
        switch (role) {
            case 'builder':
                Game.spawns['PrimeTown'].spawnCreep(
                    REGULAR_CREEPS.REGULAR_BUILDER_BODY, 'B|'+ creepName, {memory: {role: 'builder'}});
                break;
            case 'harvester':
                Game.spawns['PrimeTown'].spawnCreep(
                    REGULAR_CREEPS.REGULAR_HARVESTER_BODY, 'H|'+ creepName, {memory: {role: 'harvester'}});
                break;
            case 'upgrader':
                Game.spawns['PrimeTown'].spawnCreep(
                    REGULAR_CREEPS.REGULAR_BUILDER_BODY, 'U|'+ creepName, {memory: {role: 'upgrader'}});
                break;
            case 'transport':
                Game.spawns['PrimeTown'].spawnCreep(
                    REGULAR_CREEPS.REGULAR_UPGRADER_BODY, 'U|'+ creepName, {memory: {role: 'transporter'}});
                break;
        }
    }
};

module.exports.creepFactory = creepFactory;

