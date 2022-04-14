import { Graphics } from 'pixi.js';


/**
 * Contians all data relating to a cell
 * Position internally stored and calculated
 */
export  default class CellBasic {
	#graphic: Graphics;
	
	#position_x: number;
	#position_y: number;

	#speed: number;
	#heading: number;

    #body: any;


    stage_width: number;
    stage_height: number;
    #hitbox_range: number;

	constructor(pos_x: number, pos_y: number, s: number, dir: number, body: any, max_width: number, max_height: number) {
		this.#position_x = pos_x;
		this.#position_y = pos_y;
		this.#speed = s;
		this.#heading = dir;
        this.#body = body;


        this.stage_width = max_width;
        this.stage_height = max_height;
        this.#hitbox_range = 1;

        this.#graphic = new Graphics();
        //this.#graphic.beginFill(this.#skin_color);
        //this.#graphic.drawCircle(0,0,this.#size);

        //new drawing alg
        this.draw(this.#graphic,this.#body);
	}

    check_border() {
        //check if hitting wall x
        if(this.#position_x-this.#body[1]-this.#hitbox_range < 0 || this.#position_x+this.#body[1]+this.#hitbox_range > this.stage_width) {
            //bounce
            this.#heading = Math.PI-this.#heading;
            this.#graphic.rotation = this.#heading;
        }
        //check if hitting wall y
        if(this.#position_y-this.#body[1]-this.#hitbox_range < 0 || this.#position_y+this.#body[1]+this.#hitbox_range > this.stage_height) {
            //bounce
            this.#heading = 2*Math.PI-this.#heading;
            this.#graphic.rotation = this.#heading; 
        }
    }


	update_position() {
		//increment position by speed in each dimension
		this.#position_x += this.#speed*Math.cos(this.#heading);
		this.#position_y -= this.#speed*Math.sin(this.#heading); //negative since y goes up in cartesian
        //check for collision
        this.check_border();
        //update graphics
        this.#graphic.position.x = this.#position_x
        this.#graphic.position.y = this.#position_y
	}

    drawRecursive(cell: Graphics, data: any, x_off: number, y_off: number, theta: number, level: number){
        for (let i = 0; i < data[3*level-3]; i++)
            {	
                let mag = (data[3*level-2]+data[3*level+1]+2*data[3*level-3])/2.5;
                (data[3*level-3] === 3) ? mag *= 0.8: 0 ;
                let x = mag* Math.cos((i*360/data[3*level-3]+theta)*Math.PI/180);
                let y = mag* Math.sin((i*360/data[3*level-3]+theta)*Math.PI/180);
    
    
                let magN = (data[3*level-2]+data[3*level+1]+2*data[3*level-3])/2;
                (data[level*3-3] === 3) ? magN *= 0.8: 0 ;
                if ((level*3+3) < data.length){
                    let phi = (i*360/data[3*level-3])*Math.PI/180
                    //magN*Math.cos(phi)+	magN*Math.sin(phi)+
                    this.drawRecursive(cell,data,x_off+x,y_off+y,i*360/data[level*3-3]+(data[level*3]-2)*180/data[level*3]+theta,level+1);
                }
    
                cell.beginFill(data[level*3+2]);
                //cell.drawRect(x+x_off,y+y_off,300,2);
                //cell.drawRect(x+x_off,y+y_off,2,300);
                if (data[3*level]<3)
                {
                    cell.drawCircle(x+x_off,y+y_off,data[3*level+1]);
                }
                else{
                    cell.drawRegularPolygon?.(x+x_off,y+y_off,data[3*level+1],data[3*level],(i*360/data[3*level-3]-(90-180/data[3*level])+theta)*Math.PI/180);
                }
            }
    }
    
    draw(cell: Graphics, data: any){
        this.drawRecursive(cell,data,0,0,0,1);
    
        cell.beginFill(data[2]);
        //cell.endFill();
        if (data[0] < 3)
        {
            cell.drawCircle(0, 0, data[1]);
        }
        else
        {
            cell.drawRegularPolygon?.(0,0,data[1],data[0],(90-180/data[0])*Math.PI/180);
        }
    }

	get_pos_x() {
		return this.#position_x;
	}

	get_pos_y() {
		return this.#position_y;
	}



    get_speed(){
        return this.#speed;
    }

    get_graphic() {
        return this.#graphic;
    }



    get_body(){
        return this.#body;
    }

    set_color(color: any){
        color;
        /*
        if(color != this.#skin_color){
            this.#skin_color = color;
            this.#graphic.beginFill(this.#skin_color);
            this.#graphic.drawCircle(0,0,this.#size);
        }
          */  
    }
}
