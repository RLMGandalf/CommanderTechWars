(function(api) {
    var self = {
        uberId: ko.observable('').extend({ session: 'uberId' }),
        
        startReplay: function(region, mode, replayId) {
            return engine.asyncCall('ubernet.startReplay', region, mode, replayId).then(function(rawData) {
                return JSON.parse(rawData);
            });
        },
        startGame: function(region, mode) {
            return engine.asyncCall('ubernet.startGame', region, mode).then(function(rawData) {
                return JSON.parse(rawData);
            });
        },

        // Tell the network that the user should be added to the given lobby.
        // Note: 
        //      Does not perform connection.  Just presence & host/port lookup 
        //      when appropriate.
        // params:
        //  - lobbyId: Falsy for lan games
        //  - host: When provided, will be filled in if not provided by ubernet.
        //  - port: See above
        // returns:
        //  - Ticket: Connection ticket (optional)
        //  - ServerHostname: Connection host
        //  - ServerPort: Connection port
        joinGame: function(params) {
            var lobbyId = params.lobbyId || '';
            var host = params.host || '';
            var port = params.port || '';
            
            var result;
            if (lobbyId && self.uberId())
                result = engine.asyncCall('ubernet.joinGame', lobbyId).then(function(rawData) { 
                    var data = {};
                    try {
                        data = JSON.parse(rawData);
                    } catch (e) {
                        console.log('Error parsing join game result:', rawData);
                        throw e;
                    }
                    return data;
                });
            else
                result = $.Deferred().resolve({}).promise();
            
            result.then(function(data) { 
                data.ServerHostname = data.ServerHostname || host;
                data.ServerPort = data.ServerPort || port;
                return data;
            });
            return result;
        },

        connect: function(params) {
            var host = params.host || '';
            var port = params.port || 0;
            var displayName = params.displayName || '';
            var ticket = params.ticket || '';
            var clientData = params.clientData || {};
            
            return engine.call('net.connect',
                String(host),
                Number(port),
                String(displayName),
                String(ticket),
                String(JSON.stringify(clientData))
            );
        },
        
        removePlayerFromGame: function() {
            return engine.asyncCall("ubernet.removePlayerFromGame");
        },

        getReplays: function(sortOrder, uberIdFilter) {
            return engine.asyncCall("ubernet.getReplays", sortOrder, uberIdFilter);
        }
    };
    
    api.net = self;
})(window.api);
