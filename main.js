const Creep = require('creep');
let CREEP_MAP = new Map();
let tmp_map = new Map();

const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleTransporter = require('role.transport');


module.exports.loop = function () {
    let upgraders = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'upgrader'});
    let builders = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'builder'});
    let harvesters = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'harvester'});
    let transporters = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'transporter'});
    let spawning_creeps = new Map();

    for(const i in Game.spawns) {
        let spawn = Game.spawns[i];
        function cleaned_spawning_list() {
            spawning_creeps.delete(spawn.id)
        }
        if(!spawn.spawning) {
            cleaned_spawning_list()
        }

        const creepName = 'Ball#'+ Math.floor(Math.random() * 1000);
        console.log('upgraders:  '+ upgraders.length + '\n' + 'builders: ' + builders.length + '\n' + 'harvesters: '+ harvesters.length);

        if(harvesters.length < 8){
            spawn.spawnCreep([WORK, WORK, MOVE, CARRY], 'H|'+creepName, {memory: {role: 'harvester'}});
        }
        else if(transporters.length < 4){
            spawn.spawnCreep([MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                'T|'+creepName, {memory: {role: 'harvester'}});
        }
        else if(builders.length < 5) {
            let creep = Creep.createCreep('builder');
            if(spawning_creeps.has(spawn.id)){
                spawning_creeps.get(spawn.id).push(creep.id)
            }
            else{
                spawning_creeps.set(spawn.id, [creep.id]);
            }

            CREEP_MAP.set(creep.id, creep)
            }

        else if(upgraders.length < 4) {
            spawn.spawnCreep([WORK, MOVE, WORK, CARRY, WORK], 'U|'+creepName, {memory: {role: 'upgrader'}});
        }

        else if(!Game.spawns[i].memory.stopHarvester && harvesters.length < 12){
            spawn.spawnCreep([WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY], 'H|'+creepName, {memory: {role: 'harvester'}});
        }

    }
    console.log(Array.from(CREEP_MAP.keys()))
    for(var {key, value} of CREEP_MAP){
        console.log("BUILDERS: " + key + " value: " + value)
    }
    // for(const i in Game.spawns) {
    //     let spawn = Game.spawns[i];
    //     function runRole(value, key, map) {
    //         console.log("TRY-1 TO WORK: "+value);
    //         if(spawning_creeps){
    //             if (spawning_creeps.get(spawn.id) && spawning_creeps.get(spawn.id).includes(key))
    //                 value.runRole()
    //         }
    //         else{
    //             console.log("TRY-2 TO WORK: "+value);
    //             value.runRole()
    //         }
    //     }
    //     console.log("CREEPS:"+CREEP_MAP.values());
    //     if(CREEP_MAP.values()){
    //         CREEP_MAP.forEach(runRole);
    //     }
    // }


    for(let name in Game.creeps) {
        let creep = Game.creeps[name];

        if(creep.memory.role === 'roleTransporter'){
            roleTransporter.run(creep)
        }
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
