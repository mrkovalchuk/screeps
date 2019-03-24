const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');

module.exports.loop = function () {
    var upgraders = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'upgrader'})
    var builders = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'builder'})

    for(const i in Game.spawns) {
        const creepName = 'Ball#'+ Math.floor(Math.random() * 1000)

        if(builders.length < Game.creeps.length/2) {
            Game.spawns[i].spawnCreep([WORK, WORK, MOVE, CARRY], creepName, {memory: {role: 'builder'}});
        }

        else if(upgraders.length < 2) {
            Game.spawns[i].spawnCreep([WORK, MOVE, MOVE, CARRY], creepName, {memory: {role: 'upgrader'}});
        }

        else{
            if(Game.spawns[i].energyCapacity === 300){
                Game.spawns[i].spawnCreep([WORK, MOVE, MOVE, CARRY, CARRY], creepName, {memory: {role: 'harvester'}});
            }
        }
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