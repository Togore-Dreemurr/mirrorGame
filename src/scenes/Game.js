export class Game extends Phaser.Scene {

    constructor() {
        super('Game');
    }

    preload() {
        this.load.spritesheet('mirrorSide', 'assets/mirror.png', {frameWidth:200,frameHeight:300});
        this.load.spritesheet('player','assets/player.png',{frameWidth:22,frameHeight:23});
        this.load.spritesheet('mirrorPlayer','assets/mirrorPlayer.png',{frameWidth: 22, frameHeight: 23});
    }

    create() {
        this.add.sprite(300,150,'mirrorSide');
        const {LEFT,RIGHT,UP,DOWN,W,A,S,D} = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            down: DOWN,
            w: W,
            a: A,
            s: S,
            d: D
        })

        this.player = this.physics.add.sprite(100,50,'player');
        this.mirrorPlayer = this.physics.add.sprite(300,50,'mirrorPlayer');
        this.player.body.setCollideWorldBounds(true);
        this.mirrorPlayer.body.setCollideWorldBounds(true);
        
        const animFrameRate = 8
        this.anims.create({
            key: 'playerDown',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 2
            }),
            frameRate: animFrameRate,
            repeat: -1
        })
        this.anims.create({
            key: 'playerLeft',
            frames: this.anims.generateFrameNumbers('player', {
                start: 6,
                end: 8
            }),
            frameRate: animFrameRate,
            repeat: -1
        })
        this.anims.create({
            key: 'playerRight',
            frames: this.anims.generateFrameNumbers('player', {
                start: 9,
                end: 11
            }),
            frameRate: animFrameRate,
            repeat: -1
        })
        this.anims.create({
            key: 'playerUp',
            frames: this.anims.generateFrameNumbers('player', {
                start: 3,
                end: 5
            }),
            frameRate: animFrameRate,
            repeat: -1
        })

        this.anims.create({
            key: 'mirrorPlayerDown',
            frames: this.anims.generateFrameNumbers('mirrorPlayer', {
                start: 0,
                end: 2
            }),
            frameRate: animFrameRate,
            repeat: -1
        })
        this.anims.create({
            key: 'mirrorPlayerLeft',
            frames: this.anims.generateFrameNumbers('mirrorPlayer', {
                start: 6,
                end: 8
            }),
            frameRate: animFrameRate,
            repeat: -1
        })
        this.anims.create({
            key: 'mirrorPlayerRight',
            frames: this.anims.generateFrameNumbers('mirrorPlayer', {
                start: 9,
                end: 11
            }),
            frameRate: animFrameRate,
            repeat: -1
        })
        this.anims.create({
            key: 'mirrorPlayerUp',
            frames: this.anims.generateFrameNumbers('mirrorPlayer', {
                start: 3,
                end: 5
            }),
            frameRate: animFrameRate,
            repeat: -1
        })

        this.idleFrame = {
            down: 0,
            left: 6,
            right: 9,
            up: 3
        }
        this.player.setFrame(this.idleFrame.down);
        this.mirrorPlayer.setFrame(this.idleFrame.down);
    }

    update() {
        const {keys} = this;
        const speed = 50;
        const previousVelocity = this.player.body.velocity.clone();
        const mirrorPreviousVelocity = this.mirrorPlayer.body.velocity.clone();

        this.player.body.setVelocity(0);
        this.mirrorPlayer.body.setVelocity(0);
        if (keys.left.isDown || keys.a.isDown) {
            this.player.body.setVelocityX(-speed);
            this.mirrorPlayer.body.setVelocityX(speed);
        } else if (keys.right.isDown || keys.d.isDown) {
            this.player.body.setVelocityX(speed);
            this.mirrorPlayer.body.setVelocityX(-speed);
        }

        if (keys.up.isDown || keys.w.isDown) {
            this.player.body.setVelocityY(-speed);
            this.mirrorPlayer.body.setVelocityY(-speed);
        } else if (keys.down.isDown || keys.s.isDown) {
            this.player.body.setVelocityY(speed);
            this.mirrorPlayer.body.setVelocityY(speed);
        }

        this.player.body.velocity.normalize().scale(speed);
        this.mirrorPlayer.body.velocity.normalize().scale(speed);


        if (keys.up.isDown || keys.w.isDown) {
            this.player.anims.play('playerUp', true);
            this.mirrorPlayer.anims.play('mirrorPlayerUp', true);
        } else if (keys.down.isDown || keys.s.isDown) {
            this.player.anims.play('playerDown', true);
            this.mirrorPlayer.anims.play('mirrorPlayerDown', true);
        } else
        if (keys.left.isDown || keys.a.isDown) {
            this.player.anims.play('playerLeft', true);
            this.mirrorPlayer.anims.play('mirrorPlayerRight', true);
        } else if (keys.right.isDown || keys.d.isDown) {
            this.player.anims.play('playerRight', true);
            this.mirrorPlayer.anims.play('mirrorPlayerLeft', true);
        } else {
            this.player.anims.stop();
            this.mirrorPlayer.anims.stop();
        }
 

        if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
            if (previousVelocity.x < 0) {
                this.player.setFrame(this.idleFrame.left);
            } else if (previousVelocity.x > 0) {
                this.player.setFrame(this.idleFrame.right);
            } else if (previousVelocity.y < 0) {
                this.player.setFrame(this.idleFrame.up);
            } else if (previousVelocity.y > 0) {
                this.player.setFrame(this.idleFrame.down);
            }
        }

        if (this.mirrorPlayer.body.velocity.x === 0 && this.mirrorPlayer.body.velocity.y === 0) {
            if (mirrorPreviousVelocity.x < 0) {
                this.mirrorPlayer.setFrame(this.idleFrame.left);
            } else if (mirrorPreviousVelocity.x > 0) {
                this.mirrorPlayer.setFrame(this.idleFrame.right);
            } else if (mirrorPreviousVelocity.y < 0) {
                this.mirrorPlayer.setFrame(this.idleFrame.up);
            } else if (mirrorPreviousVelocity.y > 0) {
                this.mirrorPlayer.setFrame(this.idleFrame.down);
            }
        }
    }
    
}
