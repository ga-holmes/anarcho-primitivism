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
    #skin_color: number;
    #size: number

    stage_width: number;
    stage_height: number;
    #hitbox_range: number;

	constructor(pos_x: number, pos_y: number, s: number, dir: number, color: number, radius: number, max_width: number, max_height: number) {
		this.#position_x = pos_x;
		this.#position_y = pos_y;
		this.#speed = s;
		this.#heading = dir;
        this.#skin_color = color;
        this.#size = radius;

        this.stage_width = max_width;
        this.stage_height = max_height;
        this.#hitbox_range = 1;

        this.#graphic = new Graphics();
        this.#graphic.beginFill(this.#skin_color);
        this.#graphic.drawCircle(0,0,this.#size);
	}

    check_border() {
        //check if hitting wall x
        if(this.#position_x-this.#size-this.#hitbox_range < 0 || this.#position_x+this.#size+this.#hitbox_range > this.stage_width) {
            //bounce
            this.#heading = Math.PI-this.#heading;
        }
        //check if hitting wall y
        if(this.#position_y-this.#size-this.#hitbox_range < 0 || this.#position_y+this.#size+this.#hitbox_range > this.stage_height) {
            //bounce
            this.#heading = 2*Math.PI-this.#heading;
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

	get_pos_x() {
		return this.#position_x;
	}

	get_pos_y() {
		return this.#position_y;
	}

    get_size() {
        return this.#size;
    }

    get_graphic() {
        return this.#graphic;
    }

    set_color(color: number){
        if(color != this.#skin_color){
            this.#skin_color = color;
            this.#graphic.beginFill(this.#skin_color);
            this.#graphic.drawCircle(0,0,this.#size);
        }
            
    }
}