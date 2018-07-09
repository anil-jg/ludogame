var WIDTH = 640;
var HEIGHT = 1136;
var LUDO_HEIGHT = 640;
class Dot extends PIXI.Container{
	constructor(renderer,color) {
		super();
		var buttonImageUrl;
		switch(color){
			case "red":
				buttonImageUrl = "assets/images/red1-sheet0.png";
				break;
			case "blue":
				buttonImageUrl = "assets/images/blue1-sheet0.png";
				break;
			case "green":
				buttonImageUrl = "assets/images/green1-sheet0.png";
				break;
			case "yellow":
				buttonImageUrl = "assets/images/yellow1-sheet0.png";
				break;
		}
		var dotBg = PIXI.Sprite.fromImage(buttonImageUrl);
		this.addChild(dotBg);
	}
}
class Game extends PIXI.Application{
	constructor() {
        super(WIDTH, HEIGHT, {backgroundColor: 0x000000, legacy: true});
        document.body.appendChild(this.view);
        this.stage = this.stage;
        this.preload();
    }
    preload(){
    	PIXI.loader.add("assets/images/sprites.json");
    	PIXI.loader.load(this.setup.bind(this));
    }
    setup(){
    	const ludoArea = PIXI.Sprite.fromImage("assets/images/tiledbackground.png");
    	const bg = PIXI.Sprite.fromImage("assets/images/ludo-sheet0.png");
    	bg.y = 246;
    	var unitLength = LUDO_HEIGHT / 15;
    	var padding = 15;
    	this.stage.addChild(ludoArea);
    	this.stage.addChild(bg);
    	window.addEventListener("resize", this.resize.bind(this));

    	var positionMatrix = {
    		red:{
    			1:{
    				x:2,y:13
    			},
    			2:{
    				x:4,y:13
    			},
    			3:{
    				x:2,y:11
    			},
    			4:{
    				x:4,y:11
    			}
    		},
    		blue:{
    			1:{
    				x:11,y:13
    			},
    			2:{
    				x:13,y:13
    			},
    			3:{
    				x:11,y:11
    			},
    			4:{
    				x:13,y:11
    			}
    		},
    		green:{
    			1:{
    				x:2,y:4
    			},
    			2:{
    				x:4,y:4
    			},
    			3:{
    				x:2,y:2
    			},
    			4:{
    				x:4,y:2
    			}
    		},
    		yellow:{
    			1:{
    				x:11,y:4
    			},
    			2:{
    				x:13,y:4
    			},
    			3:{
    				x:11,y:2
    			},
    			4:{
    				x:13,y:2
    			}
    		},
    	}
    	var buttonArr = ['red','blue','green','yellow'];
    	buttonArr.forEach((color)=>{
    		this[color+"Dots"] = {};
    		for(var i=1;i<=4;i++){
    			var newDot = new Dot(this.renderer,color);
    			console.log(positionMatrix[color][i]);
    			newDot.x = positionMatrix[color][i].x*unitLength - padding;
    			newDot.y = 246 + positionMatrix[color][i].y*unitLength - padding;
    			this[color+"Dots"][i] = newDot;
    			this.stage.addChild(newDot);		
    		}
    	})
    	this.resize.call(this)
    }
    resize() {
        const ratio = Math.min(window.innerWidth / WIDTH, window.innerHeight / HEIGHT);
        this.stage.scale.set(ratio, ratio);
        this.renderer.resize(WIDTH * ratio, HEIGHT * ratio);
    }
}

window.onload = function(){
	const game = new Game();
}