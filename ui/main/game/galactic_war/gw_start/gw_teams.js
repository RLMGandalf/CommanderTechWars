define([
    'main/shared/js/star_system_templates',
    'shared/gw_factions'
], function(
    sst_dummy,
    GWFactions
) {
    var StarSystemTemplates = star_system_templates;

    return {
        getTeam: function(index) {
            var faction = GWFactions[index];
            var team = _.sample(faction.teams);
            return _.extend({}, team, { color: faction.color, faction: faction });
        },

        makeBoss: function(star, ai, team) {
            if (team.boss) {
                _.assign(ai, team.boss);
            }
            else {
                ai.econ_rate = ai.econ_rate * 2;
            }
            if (team.bossCard) {
                star.card(team.bossCard);
            }
            if (team.systemTemplate) {
                var generatorConfig = {
                    name: team.systemTemplate.name,
                    template: {
                        Planets: team.systemTemplate.Planets
                    }
                };
                return StarSystemTemplates.generate(generatorConfig)
                    .then(function(system) {
                        if (team.systemDescription)
                            system.description = team.systemDescription;
                        system.biome = system.planets[0].generator.biome;
                        star.system(system);
                        return ai;
                    });
            }
            else
                return $.when(ai);
        },

        makeWorker: function(star, ai, team) {
            if (team.workers) {
                _.assign(ai, _.sample(team.workers));
            }
            else {
                if (team.faction && team.faction.minions) {
                    _.assign(ai, _.sample(team.faction.minions));
                }
            }
            return $.when(ai);
        }
    };
});
