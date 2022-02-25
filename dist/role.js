var roleHarvester = require('role.harvester');

const HARVESTER = 'harvester'

module.exports = {
    run: function(creep) {
        const creep_role = creep.memory.role
        switch(creep_role) {
            case HARVESTER:
                roleHarvester.run(creep)
                
        }
    }

}
