const transfer_energy_only_to_container = require("./functions").transfer_energy_only_to_container;
const harvest_energy = require("./functions").harvest_energy;
const upgrade_controller = require("./functions").upgrade_controller;
const transfer_energy = require("./functions").transfer_energy;

const functions = [harvest_energy, transfer_energy_only_to_container, transfer_energy, upgrade_controller];

const roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.working && creep.carry.energy === 0) {
            creep.memory.working = false;
            creep.say('harvest');
        }
        else if (!creep.memory.building && creep.carry.energy > 0) {
            creep.memory.working = true;
            creep.say('build');
        }

        for(let i in functions){
            if(functions[i](creep) === true){
                break;
            }
        }
    }
};

module.exports = roleHarvester;

