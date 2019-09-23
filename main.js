const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleTransporter = require('role.transport');
const roleExplorerTransporter = require('role.explorer.transport');
const roleExplorerHarvester = require('role.explorer.harvester');
const roleAttacker = require('role.attacker');
const roleTower = require('tower');
const roleExplorer = require("./role.explorer_builder");
const ROOM_CREEPS = require("./settings").ROOM_CREEPS;
const creepFactory = require("./factory.creep").creepFactory;
const getCreepByRole = require('./utils').getCreepByRole
const tickTime = require('./settings').tickTime


module.exports.loop = function () {
    let spawn = Game.spawns['Main Spawn'];

    const current_tick = Game.time % tickTime.regularTime
    if(current_tick == 0){
        spawn.memory.actualCreeps = {}
        spawn.memory.actualCreeps.upgraders = getCreepByRole('upgrader');
        spawn.memory.actualCreeps.builders = getCreepByRole('builder');
        spawn.memory.actualCreeps.harvesters = getCreepByRole('harvester');
        spawn.memory.actualCreeps.transporters = getCreepByRole('transporter');
    }

    spawn.memory.creepsSet = ROOM_CREEPS;
    const actualCreeps = spawn.memory.actualCreeps

    const towers = spawn.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType === STRUCTURE_TOWER
        }
    });
    console.log("Towers:" + towers);
    for(const i in towers){
        roleTower(towers[i])
    }

    for(const room_name in ROOM_CREEPS){
        // let explorer_builders = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'explorer_builder'
        //     && (creep.memory.working_room === room_name)
        // });
        // let explorer_transporters = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'explorer_transporter'
        //     && (creep.memory.working_room === room_name)
        // });
        // let explorer_harvesters = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'explorer_harvester'
        //     && (creep.memory.working_room === room_name)
        // });
        // let attack_ranger = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'attack_ranger'});
        // let attack_milli = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'attack_milli'});

        const creepsCount = ROOM_CREEPS[room_name];
        console.log('roomName: ' + room_name);
        console.log('upgraders:  '+ actualCreeps.upgraders + '\n' + 'builders: ' + actualCreeps.builders + '\n'
            + 'harvesters: '+ actualCreeps.harvesters + '\ntransporters: ' + actualCreeps.transporters);

        if(actualCreeps.harvesters < creepsCount.harvesters_mini){
            const result = creepFactory.build('harvester_mini', room_name);
            if (result == 0) {
                actualCreeps.harvesters += 1;
            }
        }
        if(actualCreeps.harvesters < creepsCount.harvesters){
            const result = creepFactory.build('harvester', room_name);
            if (result == 0) {
                actualCreeps.harvesters += 1;
            }
        }
        if(actualCreeps.harvesters > 3) {
            if(actualCreeps.transporters < creepsCount.transporters.in){
                const result = creepFactory.build('transporter', room_name, 'in');
                if (result == 0) {
                    actualCreeps.transporters += 1;
                }
            }
            else if(actualCreeps.transporters < creepsCount.transporters.from){
                const result = creepFactory.build('transporter', room_name, 'from');
                if (result == 0) {
                    actualCreeps.transporters += 1;
                }
            }
            if(actualCreeps.builders < creepsCount.builders) {
                const result = creepFactory.build('builder', room_name);
                if (result == 0) {
                    actualCreeps.builders += 1;
                }
            }
            else if(actualCreeps.upgraders < creepsCount.upgraders) {
                const result = creepFactory.build('upgrader', room_name);
                if (result == 0) {
                    actualCreeps.upgraders += 1;
                }
            }
        }
        
        //if(transporters >= 2){
            // if(attack_ranger < creepsCount.attack_rangers){
            //     creepFactory.build('attack_milli', 'E45N19');
            // }
            // if(attack_milli < creepsCount.attack_milli){
            //     creepFactory.build('attack_ranger', 'E45N19');
            // }
            // if((attack_milli + attack_ranger) === 11)
            //     spawn.room.memory.attack = true;

        
            // if(explorer_builders < creepsCount.explorer_builders) {
            //     creepFactory.build('explorer_builder', room_name);
            // }
            // if(explorer_harvesters < creepsCount.explorer_harvester) {
            //     creepFactory.build('explorer_harvester', room_name);
            // }
            // if(explorer_transporters < creepsCount.explorer_transporters) {
            //     const storage = spawn.room.find(FIND_MY_STRUCTURES, {
            //         filter: (structure) => {
            //             return structure.structureType === STRUCTURE_STORAGE
            //         }
            //     })[0];
            //     creepFactory.build('explorer_transporter', room_name, storage.id);
            // }
        //}

    }



    for(let name in Game.creeps) {
        let creep = Game.creeps[name];

        if(creep.memory.role === 'transporter'){
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
        if(creep.memory.role === 'explorer_builder'){
            roleExplorer.run(creep)
        }
        if(creep.memory.role === 'explorer_transporter'){
            roleExplorerTransporter.run(creep)
        }
        if(creep.memory.role === 'explorer_harvester'){
            roleExplorerHarvester.run(creep)
        }
        if((creep.memory.role === 'attack_ranger') || creep.memory.role === 'attack_milli'){
            if(spawn.room.memory.attack){
                roleAttacker.run(creep)
            }
            else {
                if(!creep.spawning){
                    roleAttacker.to_spawn_point(creep)
                }
            }
        }
    }
};
