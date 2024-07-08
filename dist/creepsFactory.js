var HARVESTER = require('role')

module.exports = {
    /** 
     * @param {Array} body
     * @param {StructureSpawn} spawn 
     * @param {String} role
     * */
    build: function(body, spawn, role) {
        var creep_name = 'Ball#' + Math.floor(Math.random() * 1000);
        
        let memory = {'role': role}
        spawn.spawnCreep(body, creep_name, {'memory': memory})

        
    }
}
