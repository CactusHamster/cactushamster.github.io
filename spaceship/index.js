function tint (image, color, opacity = 0.5) {
    let { width, height } = image;
    const canvas = new OffscreenCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "destination-atop";
    ctx.globalAlpha = 1;
    ctx.drawImage(image, 0, 0);
    ctx.restore();
    return canvas;
}
/*
class Object {
    constructor () {

    }
}
*/

class Spaceship {
    ax = 0;
    ay = 0;
    scale = 1;
    /**
     * @param {HTMLImageElement} texture 
     * @param {number} x 
     * @param {number} y 
     * @param {number} vx 
     * @param {number} vy 
     */
    constructor (texture, x = 0, y = 0, vx = 0, vy = 0) {
        this.texture = texture;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }
    setScale (scale) {
        this.scale = scale;
        return this;
    }
    update () {
        this.vx += this.ax;
        this.vy += this.ay;

        this.x -= this.vx;
        this.y -= this.vy;
    }
    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw (ctx) {
        let { width, height } = this.texture;
        width *= this.scale;
        height *= this.scale;
        let midpoint = [ this.x + width/2, this.y + height/2 ]
        let angle = Math.atan2(this.vy, this.vx) + (1.5 * Math.PI);
        ctx.save();
        ctx.translate(...midpoint);
        ctx.rotate(angle);
        let velocity = Math.sqrt(this.vx**2 + this.vy**2)
        let texture = tint(this.texture, 'rgb(255, 0, 0)',  velocity > 20 ? 0.3 : (velocity * 0.05) * 0.3)
        //let { texture } = this;
        ctx.drawImage(
            texture,
            -width/2,
            -height/2,
            texture.width * this.scale,
            texture.height * this.scale
        )
        ctx.restore();
    }
}
class Player extends Spaceship {
    // keys should be an array of 4 keyboard keys
    constructor (texture, x=0, y=0) {
        super(texture, x, y);
    }
    registerEvents (keys = ["w", "s", "a", "d"]) {
        if (typeof keys === "string") keys = keys.split("")
        if (keys.length !== 4) throw new Error("Only 4 keys allowed to control spaceship. Please list 4 keys in order up/down/left/right")
        // makes it easier to map keys to their respective movements
        let movements = [ 1, -1, 1, -1 ]
        movements = movements.map(m => m * 0.2)
        // should really use a seperate handler... but this works
        document.addEventListener("keydown", (e) => {
            keys.map((key,i) => {
                if (e.key === key) {
                    if (i < 2) this.ay = movements[i]
                    else this.ax = movements[i]
                }
            })
        })
        document.addEventListener("keyup", (e) => {
            keys.map((key,i) => {
                if (e.key === key) {
                    if (i < 2) this.ay = 0
                    else this.ax = 0
                }
            });
        });
        return this;
    }
}

class Game {
    objects = [];
    constructor (ctx) {
        this.ctx = ctx;
    }
    add (item) {
        this.objects.push(item)
        return this;
    }
    clear () {
        this.spaceships = [];
        return this;
    }
    tick () {
        for (let object of this.objects) {
            object.update();
            if (object.x > this.ctx.canvas.width) object.x -= this.ctx.canvas.width
            if (object.y > this.ctx.canvas.height) object.y -= this.ctx.canvas.height
            if (object.x < 0) object.x += this.ctx.canvas.width
            if (object.y < 0) object.y += this.ctx.canvas.height
        }
        return this;
    }
    render () {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        for (let object of this.objects) object.draw(this.ctx);
        return this;
    }
}

// start of main code
// get an image to use for the spaceships
let spaceshipTexture = new Image();
spaceshipTexture.src = "spaceship.png"
spaceshipTexture.onerror = (e) => { throw e };
spaceshipTexture.onload = () => console.info("Textures loaded.");
// make and set up a canvas to draw on
const canvas = document.getElementById("canvas");
const brush = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// change the canvas so it takes the entire window
canvas.style.position = "absolute";
canvas.style.top = "0px";
canvas.style.left = "0px";
// time to use the framework we made!
const game = new Game(brush);
const player = new Player(spaceshipTexture, canvas.width / 2, canvas.height / 2);
player
    .registerEvents()
    .setScale(0.1);
game.add(player);
// main game loop, causes ticks and frames
;(async function main () {
    while (true) {
        await new Promise(res => window.requestAnimationFrame(res));
        game.tick();
        game.render();
    };
})();