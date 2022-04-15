import { Graphics, Application  } from 'pixi.js';
import '@pixi/graphics-extras';
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

//get stage size
const stage_width = window.innerWidth;
const stage_height = window.innerHeight;


//create cell from new class

//inital params
const x = 200;
const y = 200;
let speed = 2;
let heading = Math.PI*0.4; //RADIANS DO NOT FORGET

//create cells
//let body = [7,60,0x116644,5,30,0x551100,2,20,0x11AA22,3,10,0x334400,3,10,0x330088,4,60,0x712624,3,30,0x3511c0,2,20,0x112222,3,10,0x834400];
//hex or dec works, dec preferable for mysql
let body = [4,40,16711680];
let obj1 = new CellBasic(x,y,speed,heading, body, stage_width,stage_height);

//body = [4,60,0x712624,3,30,0x3511c0,2,20,0x112222,3,10,0x834400];
body = [6,60,255];

let obj2 = new CellBasic(100,500,7,Math.PI*1.6, body, stage_width,stage_height);

let num_rendered = 0;
let objs:CellBasic[] = [obj1,obj2];

//start connnection to db
let db = new getData();
let data = db.getRows();


//add cell to stage
for(let i = 0; i < objs.length; i++){
	app.stage.addChild(objs[i].get_graphic());
	num_rendered++; 
}

requestAnimationFrame(update);


// Performs 1 pt crossover on 2 parent cells
// For Now: returns a new cell
function coitus(p1: CellBasic, p2: CellBasic){

	let body1 = p1.get_body();
	let body2 = p2.get_body();

	//set lenght of body randomly
	let bodynew = (Math.floor((Math.random() * (1 - 0 + 1))) === 0 ? body1 : body2);
	let end = Math.min(body1.length,body2.length);
	
	for (let i = 0; i < bodynew.length; i++){
		if(i < end){
			switch (i%3){
				case 0:
					bodynew[i] = (Math.floor((Math.random() * (1 - 0 + 1))) === 0 ? body1[i] : body2[i]);
					//1:10 times to go up one or down one
					bodynew[i] += Math.floor((Math.random() * (11)-1)/9)
					bodynew[i] = bodynew[i] < 1 ? 1: bodynew[i];
					break;
				case 1:
					bodynew[i] = (Math.floor((Math.random() * (1 - 0 + 1))) === 0 ? body1[i] : body2[i]);
					bodynew[i] += 2*Math.floor((Math.random() * (13)-2)/9);
					break;
				case 2:
					//mix two colors 
					bodynew[i] = (body1[i]&0x1fefeff)/2+(body2[i]&0x1fefeff)/2;
			}
			
		}
	}
	let randAngle = Math.PI * (Math.random() * (2 - 0 + 1))
	let speednew = (Math.floor((Math.random() * (1 - 0 + 1))) === 0 ? p1.get_speed() : p2.get_speed());

	return new CellBasic(x,y,speednew,randAngle, bodynew, stage_width, stage_height);
}

// mates 2 random parents
// NOTE: eventually replace with proper selection algorithm
function crossoverButton(){

	let randParent1: number = Math.floor(Math.random() * ((objs.length - 1) - 0 + 1));
	let randParent2: number = Math.floor(Math.random() * ((objs.length - 1) - 0 + 1));

	// make sure the parents arent the same
	while (objs.length > 1 && randParent2 === randParent1){

		randParent2 = Math.floor(Math.random() * ((objs.length - 1) - 0 + 1));

	}

	console.log("Mating cells " + randParent1 + " & " + randParent2);

	objs.push(coitus(objs[randParent1], objs[randParent2]));

}

// where stuff happens
function update() {
	//grab data from db
	
	let btn = document.getElementById('crossoverButton');
	if (btn != null){
		btn.onclick = () => {
			crossoverButton();
		}
	} else {
		console.log('no buttons? ò_ô');
	}

	

	if(db.isfresh()){
		//let cleanData: MyRootObj = JSON.parse(data.toString());
		//let colors:number = 0;

		//for(let i = 0; i < objs.length; i++){
		//	data.then(response => objs[i].set_color(response[i].color ));
			//data.then(response => console.log(response[i].color ));
		//}  JSON.parse(response[0].body).levels

		//data.then(response => console.log(response[0].x_pos));
		data.then(response => objs.push(new CellBasic(response[0].x_pos,response[0].y_pos,response[0].speed,response[0].dir, JSON.parse(response[0].body).levels, stage_width, stage_height)));
		//console.log(data.);
		db.stop();

		//request new data
		//data = db.getRows();
	}
	


	//update cell position internaly
	for(let i = 0; i < objs.length; i++){
		objs[i].update_position();
	}

	// add new cells to the stage
	for(let i = num_rendered; i < objs.length; i++){
		app.stage.addChild(objs[i].get_graphic());
	}

	
	//change pos of test cell


	app.render();

	requestAnimationFrame(update);

}