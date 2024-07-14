const { harvest, transfer_energy, upgrade_controller, build } = require('./functions');
const { CREEP_ROLES, CREEP_MODES } = require('./constants');

const WORKS_BY_ROLE = {
    [CREEP_ROLES.HARVESTER]: [harvest, transfer_energy, upgrade_controller],
    [CREEP_ROLES.MULTIWORKER]: [harvest, transfer_energy, build, upgrade_controller],
}

module.exports = {
    run: function(creep, spawn) {
        var creep_functions = WORKS_BY_ROLE[creep.memory.role]
        
        for(let i in creep_functions){
            let new_mode = creep_functions[i](creep, spawn);
            if(new_mode !== CREEP_MODES.IDLE) {
                creep.memory.mode = new_mode;
                break;
            }
        }
    }
}