var HARVESTER = require('role')

module.exports = {
    /** 
     * @param {Array} body
     * @param {StructureSpawn} spawn 
     * @param {String} role
     * */
    build: function(body, spawn, role) {
        var creep_name = 'Ball#' + Math.floor(Math.random() * 1000);
        var creep = spawn.spawnCreep(body, creep_name, {memory: role})

        switch (role) {
            case HARVESTER:
                creep.memory.target = creep.room.find(FIND_SOURCES)[0]
        }
    }
}
