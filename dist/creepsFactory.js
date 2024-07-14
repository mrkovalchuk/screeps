const { CREEP_MODES } = require('./constants');

module.exports = {
    build: function(body, spawn, role) {
        var creep_name = 'Ball#' + Math.floor(Math.random() * 1000);
        
        let memory = {
            'role': role,
            'mode': CREEP_MODES.IDLE
        }
        spawn.spawnCreep(body, creep_name, {'memory': memory})
    }
}