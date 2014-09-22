// General game balance variables

define([
], function(
) {

    return {
        initialCardSlots: 3,

        numberOfSystems: [
                18, // Small
                24, // Medium
                36, // Large
                54, // Uber
                78 // Rediq
        ],

        difficultyInfo: [
            {
                rampDifficulty: true,
                econMod: 0.5,
                goForKill: false,
                microType: 0,
                neuralDataMod: 1.75,
                mandatoryMinions: 0,
                minionMod: 0,
                bossDemandCheckMod: 1.75,
                priority_scout_metal_spots: false
            },
            {
                rampDifficulty: true,
                econMod: 1.0,
                goForKill: false,
                microType: 1,
                neuralDataMod: 1.25,
                mandatoryMinions: 0,
                minionMod: 0.75,
                bossDemandCheckMod: 1.25,
                priority_scout_metal_spots: false
            },
            {
                rampDifficulty: true,
                econMod: 1.5,
                goForKill: true,
                microType: 2,
                neuralDataMod: 1.0,
                mandatoryMinions: 0,
                minionMod: 1,
                bossDemandCheckMod: 1.0,
                priority_scout_metal_spots: true
            },
            {
                rampDifficulty: false,
                econMod: 2.0,
                goForKill: true,
                microType: 2,
                neuralDataMod: 1.0,
                mandatoryMinions: 1,
                minionMod: 1,
                bossDemandCheckMod: 1.0,
                priority_scout_metal_spots: true
            }
        ],

        workerEconRate: [0.5, 1.5],
        workerMetalDrainCheck: [0.75, 0.6],
        workerEnergyDrainCheck: [0.85, 0.7],
        workerMetalDemandCheck: [0.9, 0.75],
        workerEnergyDemandCheck: [1.00, 0.85],
    };
});
