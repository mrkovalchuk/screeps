var harvest = require('functions').harvest
var transfer_energy = require('functions').transfer_energy

const WORKS_BY_ROLE = {
    'harvester': [harvest, transfer_energy],
}

module.exports = {
    run: function(creep, spawn) {
        var creep_functions = WORKS_BY_ROLE[creep.memory.role]
        
        for(let i in creep_functions){
            if(creep_functions[i](creep, spawn) === true) break
        }
    }
}
