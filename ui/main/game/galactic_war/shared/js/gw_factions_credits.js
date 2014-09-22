define([
    'shared/gw_faction_credits_player',
    'shared/gw_faction_credits_management',
    'shared/gw_faction_credits_engineering',
    'shared/gw_faction_credits_design',
    'shared/gw_faction_credits_production',
    'shared/gw_faction_credits_art',
    'shared/gw_faction_credits_art2',
    'shared/gw_faction_credits_audio',
    'shared/gw_faction_credits_kickstarter',
    'shared/gw_faction_credits_thanks'
], function(
    factionPlayer,
    factionManagement,
    factionEngineering,
    factionDesign,
    factionProduction,
    factionArt,
    factionArt2,
    factionAudio,
    factionKickstarter,
    factionThanks
) {

    return [
        factionPlayer,
        factionManagement,
        factionEngineering,
        factionDesign,
        factionProduction,
        factionArt,
        factionArt2,
        factionAudio,
        factionKickstarter,
        factionThanks
    ];
});