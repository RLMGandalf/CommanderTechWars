var constants = (function () {
 
    var watch_types = [ /* the order of these items is important */
        'ready', // 0
        'damage', // 1 
        'death', // 2
        'ping', // 3
        'sight', // 4
        'projectile', // 5
        'first_contact', // 6
        'target_destroyed', //7,
        'allied_death' //8
    ];

    var event_types = [
        'low_metal', // 8
        'low_energy', // 9
        'full_metal', // 10
        'full_energy', // 11
        'under_attack',
        'commander_under_attack',
        'commander_healed',
        'commander_low_health',
        'commander_under_attack_very_low_health',
        'commander_destroyed',
        'asteroid_incoming',
        'asteroid_imminent', /* maps to self_guided. event system and the sim have different concepts of imminent */
        'asteroid_impact',
        'new_enemy_contact',
        'enemy_commander_sighted',
        'enemy_commander_destroyed',
        'in_combat',
        'enemy_metal_destroyed',
        'metal_lost',
        'thrust_control_established',
        'weapon_control_established',
        'allied_commander_destroyed',
    ];

    var unit_types = [
        'Commander',
        'Fabber',
        'Debug',
        'Tank',

        'Bot',
        'Bomber',
        'Fighter',
        'Gunship',

        'Transport',
        'Teleporter',
        'Scout',
        'Structure',

        'Mobile',
        'Wall',
        'Sub',
        'Nuke',

        'NukeDefense',
        'Heavy',
        'Artillery',
        'Tactical',

        'LaserPlatform',
        'AirDefense',
        'SurfaceDefense',
        'OrbitalDefense',

        'MetalProduction',
        'EnergyProduction',
        'Construction',
        'Land',

        'Naval',
        'Air',
        'Orbital',
        'Basic',

        'Advanced',
        'CmdBuild',
        'FabBuild',
        'FabAdvBuild',

        'FabOrbBuild',
        'FactoryBuild',
        'CombatFabBuild',
        'CombatFabAdvBuild',

        'Economy',
        'Factory',
        'Defense',
        'Offense',

        'Recon',
        'NoBuild',
    ];

    function generateMap(array) {
        var result = {};

        _.forEach(array, function (element, index) {
            result[element] = index;
        });

        return result;
    }

    return {
        watch_type: generateMap(watch_types),
        event_type: generateMap(watch_types.concat(event_types)),
        unit_type: generateMap(unit_types)
    };
})();
    
    
