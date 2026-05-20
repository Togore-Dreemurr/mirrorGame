export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('logo','assets/title.png');
        this.load.spritesheet('startButton','assets/start.png', {frameWidth: 134, frameHeight: 60});
        this.load.image('saveButton','assets/saves.png');
    }

    create() {
        this.add.image(200,100,'logo');
        this.startButton = this.add.sprite(120,200,'startButton').setInteractive();
        this.add.image(280,200,'saveButton').setInteractive();


        this.startButton.on('pointerdown', () => {
            this.scene.start("Game")
        })
    }

    update() {
    }
    
}
