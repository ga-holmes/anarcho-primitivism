import { Application, Graphics } from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});

let obj = new Graphics();
obj.beginFill(0xff0000);
obj.drawCircle(300, 300, 20);

let obj2 = new Graphics();
obj2.beginFill(0xffff00);
obj2.drawCircle(300, 300, 20);

app.stage.addChild(obj);
app.stage.addChild(obj2);

let xSpeed = 0;
let ySpeed = 1;

let xSpeed2 = 1;
let ySpeed2 = 0;

requestAnimationFrame(update);

// where stuff happens
function update() {

	obj.position.x += xSpeed;
	obj.position.y += ySpeed;

	obj2.position.x += xSpeed2;
	obj2.position.y += ySpeed2;
	
	app.render();

	requestAnimationFrame(update);

}