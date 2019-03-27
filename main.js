const Creep = require('creep');
let CREEP_MAP = require('global');

const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');


module.exports.loop = function () {
    let upgraders = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'upgrader'});
    let builders = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'builder'});
    let harvesters = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'harvester'});

    for(const i in Game.spawns) {
        if((_.filter(Game.creeps).length) >= Game.spawns[i].memory.maxCreeps){
            break;
        }
        const creepName = 'Ball#'+ Math.floor(Math.random() * 1000);
        console.log('upgraders:  '+ upgraders.length + '\n' + 'builders: ' + builders.length + '\n' + 'harvesters: '+ harvesters.length);

        if(harvesters.length < 4){
            Game.spawns[i].spawnCreep([WORK, WORK, MOVE, CARRY], 'H|'+creepName, {memory: {role: 'harvester'}});
        }
        else if(builders.length < (_.filter(Game.creeps).length/3.5)) {
            let creep = Creep.createCreep('builder');
            CREEP_MAP.set(creep.id, creep)
        }

        else if(upgraders.length < 2) {
            Game.spawns[i].spawnCreep([WORK, MOVE, WORK, CARRY, WORK], 'U|'+creepName, {memory: {role: 'upgrader'}});
        }

        else if(!Game.spawns[i].memory.stopHarvester){

            Game.spawns[i].spawnCreep([WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY], 'H|'+creepName, {memory: {role: 'harvester'}});

        }
    }
    function runRole(value, key, map){
        value.runRole()
    }
    console.log(CREEP_MAP instanceof Map);
    CREEP_MAP.forEach(runRole);

    for(let name in Game.creeps) {
        let creep = Game.creeps[name];

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
