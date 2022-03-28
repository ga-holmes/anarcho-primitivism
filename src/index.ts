import { Application } from 'pixi.js';
import CellBasic from './cells';
import getData from './dblink';
//const util = require("util")


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
let num_objs: number = 2;
let obj1 = new CellBasic(x,y,speed,heading,color,size,stage_width,stage_height);
let obj2 = new CellBasic(100,500,7,Math.PI*1.6,0XDD9787,80,stage_width,stage_height);

let objs:CellBasic[] = [obj1,obj2];

//start connnection to db
let db = new getData();
let data = db.getRows(num_objs);


//add cell to stage
for(let i = 0; i<num_objs; i++){
	app.stage.addChild(objs[i].get_graphic());
}

requestAnimationFrame(update);


// where stuff happens
function update() {
	//grab data from db
	

	if(db.isfresh()){
		//let cleanData: MyRootObj = JSON.parse(data.toString());
		//let colors:number = 0;

		for(let i = 0; i<num_objs; i++){
			data.then(response => objs[i].set_color(response[i].color ));
			//data.then(response => console.log(response[i].color ));
		}
		
		

		//request new data
		data = db.getRows(num_objs);
	}
	


	//update cell position internaly
	for(let i = 0; i<num_objs; i++){
		objs[i].update_position();
	}

	
	app.render();

	requestAnimationFrame(update);

}