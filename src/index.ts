import { Application } from 'pixi.js';
import CellBasic from './cells';


const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	resizeTo: window
});

/*  old definition of a cell
let obj = new Graphics();
obj.beginFill(0xff0000);
obj.drawCircle(300, 300, 20);

app.stage.addChild(obj);

let xSpeed = 0;
let ySpeed = 1;
*/


//get stage size
let stage_width =  window.innerWidth;
let stage_height = window.innerHeight;


//create cell from new class

//inital params
let x = 200;
let y = 200;
let speed = 2;
let heading = Math.PI*0.4; //RADIANS DO NOT FORGET
let color = 0x4C2C72;
let size = 50;
//create cells
let obj1 = new CellBasic(x,y,speed,heading,color,size,stage_width,stage_height);
let obj2 = new CellBasic(100,500,7,Math.PI*1.6,0XDD9787,80,stage_width,stage_height);

//add cell to stage
app.stage.addChild(obj1.get_graphic());
app.stage.addChild(obj2.get_graphic());

requestAnimationFrame(update);

// where stuff happens
function update() {
	//update cell position internaly
	obj1.update_position();
	obj2.update_position();
	
	app.render();

	requestAnimationFrame(update);

}