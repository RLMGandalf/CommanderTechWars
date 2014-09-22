require({
    waitSeconds: 0,
    baseUrl: 'coui://ui/main/game/galactic_war',
    paths: {
        shared: 'coui://ui/main/game/galactic_war/shared/js',
        cards: 'coui://ui/main/game/galactic_war/cards',
        pages: 'coui://ui/main/game/galactic_war',
        main: 'coui://ui/main'
    }
});

define('shared/gw_common', [
    'shared/gw_balance', 
    'shared/gw_bank', 
    'shared/gw_game', 
    'shared/gw_manifest',
    'shared/gw_specs'
], function(
    balance,
    bank,
    game, 
    manifest,
    specs
) {
    return {
        balance: balance,
        bank: bank,
        Game: game,
        manifest: manifest,
        specs: specs
    };
});
