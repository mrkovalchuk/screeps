var harvest = require('function')

const WORKS_BY_ROLE = {
    'harvester': [harvest]
}

module.exports = {
    run: function(creep) {
        var creep_functions = WORKS_BY_ROLE[creep.memory.role]
        
        for(let i in creep_functions){
            functions[i](creep)
        }
    }

}
