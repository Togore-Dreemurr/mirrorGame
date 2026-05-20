import { Start } from './scenes/Start.js';
import { Game } from './scenes/Game.js';

const config = {
    type: Phaser.AUTO,
    title: 'Overlord Rising',
    description: '',
    parent: 'game-container',
    width: 400,
    height: 300,
    backgroundColor: '#000000',
    pixelArt: true,
    fps: { smoothStep: false },
    scene: [
        Start,
        Game
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
	default: 'arcade',
	arcade: {
    	gravity: { x: 0, y: 0 },

	},
},
}

new Phaser.Game(config);
            