const { upgrade_controller, transfer_energy, harvest } = require('./functions')

const WORKS_BY_ROLE = {
    'harvester': [harvest, transfer_energy, upgrade_controller],
    'multiworker': [harvest, transfer_energy, upgrade_controller],
}

module.exports = {
    run: function(creep, spawn) {
        var creep_functions = WORKS_BY_ROLE[creep.memory.role]
        
        for(let i in creep_functions){
            if(creep_functions[i](creep, spawn) === true) break
        }
    }
}
