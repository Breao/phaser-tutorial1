function preload ()
{
//   this.load.setBaseURL('http://labs.phaser.io');

  //   this.load.image('sky', 'assets/skies/space3.png');
  this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  //   this.load.image('red', 'assets/particles/red.png');
  this.load.image('sky', 'phaser3-tutorial-src/assets/sky.png');
  this.load.image('ground', 'phaser3-tutorial-src/assets/platform.png');
  this.load.image('star', 'phaser3-tutorial-src/assets/star.png');
  this.load.image('bomb', 'phaser3-tutorial-src/assets/bomb.png');
  this.load.spritesheet('dude', 
    'phaser3-tutorial-src/assets/dude.png',
    { frameWidth: 32, frameHeight: 48 }
  );
}
let player = {};
const platform = {};
const controls = {};

function create ()
{
  this.add.image(400, 300, 'sky');
  this.add.image(400, 300, 'star');


  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');


  // Player
  player = this.physics.add.sprite(100, 450, 'dude');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  
  this.anims.create({
	  key: 'left',
	  frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
	  frameRate: 10,
	  repeat: -1
  });
  
  this.anims.create({
	  key: 'turn',
	  frames: [ { key: 'dude', frame: 4 } ],
	  frameRate: 20
  });
  
  this.anims.create({
	  key: 'right',
	  frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
	  frameRate: 10,
	  repeat: -1
  });
  // Player END

  this.physics.add.collider(player, platforms);

  // Hello world 
  const particles = this.add.particles('red');

  const emitter = particles.createEmitter({
    speed: 100,
    scale: { start: 1, end: 0 },
    blendMode: 'ADD'
  });

  const logo = this.physics.add.image(400, 100, 'star');

  logo.setVelocity(100, 200);
  logo.setBounce(1, 1);
  logo.setCollideWorldBounds(true);
  this.physics.add.collider(logo, platforms);
  this.physics.add.collider(logo, player);

  emitter.startFollow(logo);
  // Hello world END
}

function update() {

  cursors = this.input.keyboard.createCursorKeys();

  // Player controls
  if (cursors.left.isDown)
  {
	  console.log('run cursor');
	  player.setVelocityX(-160);
  
	  player.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
	  player.setVelocityX(160);
  
	  player.anims.play('right', true);
  }
  else
  {
	  player.setVelocityX(0);
  
	  player.anims.play('turn');
  }
  
  if (cursors.up.isDown && player.body.touching.down)
  {
	  player.setVelocityY(-330);
  }

  // Player controls END
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
	  gravity: { y: 300 },
	  debug: false,
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};

const game = new Phaser.Game(config);
