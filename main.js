const roleHarvester = require('harvester');
const roleUpgrader = require('upgrader');
const roleBuilder = require('builder');

module.exports.loop = function () {
    for(const i in Game.spawns) {
        Game.spawns[i].spawnCreep([WORK, MOVE, MOVE, CARRY], {'role': 'harvest'});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
    }
};