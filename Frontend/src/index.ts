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
const stage_width = window.innerWidth;
const stage_height = window.innerHeight;

//create cell from new class

//inital params
const x = 200;
const y = 200;
let speed = 2;
let heading = Math.PI*0.4; //RADIANS DO NOT FORGET
let red = {
	r: 255,
	g: 0,
	b: 0
};

let blue = {
	r: 0,
	g: 0,
	b: 255
};

let size = 50;
//create cells
let obj1 = new CellBasic(x,y,speed,heading, red, size, stage_width,stage_height);
let obj2 = new CellBasic(100,500,7,Math.PI*1.6, blue,80,stage_width,stage_height);

let num_rendered = 0;
let objs:CellBasic[] = [obj1,obj2];

//start connnection to db
let db = new getData();
let data = db.getRows(2);


//add cell to stage
for(let i = 0; i < objs.length; i++){
	app.stage.addChild(objs[i].get_graphic());
	num_rendered++; 
}

requestAnimationFrame(update);


// Performs 1 pt crossover on 2 parent cells
// For Now: returns a new cell
function crossover(parent1: CellBasic, parent2: CellBasic) {

	let parent1Traits = parent1.get_traits();
	let parent2Traits = parent2.get_traits();

	// Random int between 0 & 1
	let traitToSwap: number = Math.floor((Math.random() * (1 - 0 + 1)))

	// Only swap between speed & size traits, colour will be a mix
	// For now, only swaps opposite traits (NOTE: Need to add more traits for variety)
	let newCellData = {
		size: (traitToSwap === 1 ? parent1Traits.size : parent2Traits.size),
		speed: (traitToSwap === 0 ? parent1Traits.speed : parent2Traits.speed),
		color: blendColours(parent1Traits.color, parent2Traits.color)
	}
	console.log(newCellData.color);
	

	// Generate a ranom direction to go in
	// NOTE: random() * (max - min + 1)
	let randAngle = Math.PI * (Math.random() * (2 - 0 + 1))

	return new CellBasic(x, y, newCellData.speed, randAngle, newCellData.color, newCellData.size, stage_width, stage_height)

}


// Blends 2 colours
function blendColours(colour1: any, colour2: any) {	
	return {
		r: (colour1.r + colour2.r) / 2,
		g: (colour1.g + colour2.g) / 2,
		b: (colour1.b + colour2.b) / 2
	};
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

	objs.push(crossover(objs[randParent1], objs[randParent2]));

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

		for(let i = 0; i < objs.length; i++){
			data.then(response => objs[i].set_color(response[i].color ));
			//data.then(response => console.log(response[i].color ));
		}
		
		

		//request new data
		data = db.getRows(2);
	}
	


	//update cell position internaly
	for(let i = 0; i < objs.length; i++){
		objs[i].update_position();
	}

	// add new cells to the stage
	for(let i = num_rendered; i < objs.length; i++){
		app.stage.addChild(objs[i].get_graphic());
	}

	
	app.render();

	requestAnimationFrame(update);

}