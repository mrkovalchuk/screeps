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
    
    for(const i in towers){
        roleTower(towers[i])
    }
    let allowOnlyHarvest = false

    for(const room_name in ROOM_CREEPS){
        const creepsCount = ROOM_CREEPS[room_name];

        if(actualCreeps.harvesters < creepsCount.harvesters){
            allowOnlyHarvest = true
            const result = creepFactory.build('harvester', room_name);
            if (result == 0) {
                actualCreeps.harvesters += 1;
            }
            else if (result == ERR_NOT_ENOUGH_ENERGY) {
              const result = creepFactory.build('harvester_mini', room_name);
            }
            
            if (result == 0) {
              actualCreeps.harvesters += 1;
            }
            
        }
        else{
            allowOnlyHarvest = false
        }
        if(actualCreeps.harvesters > 1) {
            if(actualCreeps.transporters < creepsCount.transporters){
                const result = creepFactory.build('transporter', room_name, 'in');
                if (result == 0) {
                    allowOnlyHarvest = false
                    actualCreeps.transporters += 1;
                }
                else {
                  break;
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
        else{
            allowOnlyHarvest = true
        }
    }



    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if(creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role === 'transporter'){
            roleTransporter.run(creep)
        }
        
        if(!allowOnlyHarvest){
            if(creep.memory.role === 'upgrader') {
                roleUpgrader.run(creep);
            }
            else if(creep.memory.role === 'builder') {
                roleBuilder.run(creep);
            }
            else if(creep.memory.role === 'explorer_builder'){
                roleExplorer.run(creep)
            }
            else if(creep.memory.role === 'explorer_transporter'){
                roleExplorerTransporter.run(creep)
            }
            else if(creep.memory.role === 'explorer_harvester'){
                roleExplorerHarvester.run(creep)
            }
            else if((creep.memory.role === 'attack_ranger') || creep.memory.role === 'attack_milli'){
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
        
    }
};
