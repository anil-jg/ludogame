const WIDTH = 640;
const HEIGHT = 1136;
const LUDO_HEIGHT = 640;
const UNIT_LENGTH = LUDO_HEIGHT / 15;

const positionConfig = {
    1:[6,14],
    2:[6,13],
    3:[6,12],
    4:[6,11],
    5:[6,10],
    7:[6,9],
    7:[5,8],
    8:[4,8],
    9:[3,8],
    10:[2,8],
    11:[1,8],
    12:[0,8],
    13:[0,7],
    14:[0,6],
    15:[1,6],
    16:[2,6],
    17:[3,6],
    18:[4,6],
    19:[5,6],
    20:[6,5],
    21:[6,4],
    22:[6,3],
    23:[6,2],
    24:[6,1],
    25:[6,0],
    26:[7,0],
    27:[8,0],
    28:[8,1],
    29:[8,2],
    30:[8,3],
    31:[8,4],
    32:[8,5],
    33:[9,6],
    34:[10,6],
    35:[11,6],
    36:[12,6],
    37:[13,6],
    38:[14,6],
    39:[14,7],
    40:[14,8],
    41:[13,8],
    42:[12,8],
    43:[11,8],
    44:[10,8],
    45:[9,8],
    46:[8,9],
    47:[8,10],
    48:[8,11],
    49:[8,12],
    50:[8,13],
    51:[8,14],
    52:[7,14],
    53:[7,13],
    54:[7,12],
    55:[7,11],
    56:[7,10],
    57:[7,9],
    58:[7,9],
    59:[7,9],
    60:[7,9],
    61:[1,7],
    62:[2,7],
    63:[3,7],
    64:[4,7],
    65:[5,7],
    69:[7,1],
    70:[7,2],
    71:[7,3],
    72:[7,4],
    73:[7,5],
    77:[13,7],
    78:[12,7],
    79:[11,7],
    80:[10,7],
    81:[9,7],
    "home1":[7,8],
    "home2":[6,7],
    "home3":[7,6],
    "home4":[8,7]
}
function getCoordinate(position){
    return positionConfig[position];
}
class Dot extends PIXI.Container{
	constructor(renderer,color) {
		super();
        this.animating = false;
        this.interactive = false;
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
        dotBg.anchor.set(0.5);
		this.addChild(dotBg);
	}
    activate(){
        this.animating = true;
        this.interactive = true;
    }
    deActivate(){
        this.interactive = false;
        this.animating = false;
        this.scale(1.0,1.0)
    }
    move(position){
        var coordinates = getCoordinate(position);
        var pos_x = coordinates[0];
        var pos_y = coordinates[1];
        this.x = UNIT_LENGTH*pos_x + 20;
        this.y = 246 + UNIT_LENGTH*pos_y + 20;
    }
}
class Dice extends PIXI.Container{
    constructor(renderer) {
        super();

        this.numbers = [1,2,3,4,5,6]
        this.interactive = true;
        var diceSides = PIXI.Sprite.fromImage("assets/images/play-sheet0.png");
        this.on("pointerdown",()=>{
            this.roll();
        })
        this.addChild(diceSides);
    }
    roll(){
        var random = Math.random();
        var outcome = Math.floor(random*6+1);
        this.emit("rollend",outcome)
    }

}
class Game extends PIXI.Application{
	constructor() {
        super(WIDTH, HEIGHT, {backgroundColor: 0x000000, legacy: true});
        document.getElementById("app").appendChild(this.view);
        this.stage = this.stage;
        this.preload();
    }
    preload(){
    	PIXI.loader.add("assets/images/sprites.json");
        PIXI.loader.load(this.setup.bind(this));
    }
    setup(){
        
        const UNIT_LENGTH = LUDO_HEIGHT / 15;
        const padding = 2;
        
        const ludoArea = PIXI.Sprite.fromImage("assets/images/tiledbackground.png");
        
        const bg = PIXI.Sprite.fromImage("assets/images/ludo-sheet0.png");
        bg.y = 246;
        
        this.dice = new Dice(this.renderer);
        this.dice.x = 50;
        this.dice.y = 890;

        
        this.stage.addChild(ludoArea);
        this.stage.addChild(bg);
        this.stage.addChild(this.dice);

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
        this.dots = {};
        buttonArr.forEach((color)=>{
            this.dots[color] = {};
            for(var i=1;i<=4;i++){
                var newDot = new Dot(this.renderer,color);
                newDot.x = positionMatrix[color][i].x*UNIT_LENGTH ;
                newDot.y = 246 + positionMatrix[color][i].y*UNIT_LENGTH + padding;
                newDot.interactive = true;
                newDot.on("pointerdown",()=>{
                    var position = prompt("Enter new position e.g 45");
                    if(position){
                        // var arr = position.split(",")
                        // var x = parseInt(arr[0]);
                        // var y = parseInt(arr[1]);
                        newDot.move(position);    
                    }
                    
                })
                this.dots[color][i] = newDot;
                this.stage.addChild(newDot);        
            }
        })

        this.dice.on("rollend",(result)=>{
            var input = prompt(`Result is ${result}, Enter new position of dot e.g. red,1,6,13`)
            var arr = input.split(",");
            var color = arr[0];
            var dot = parseInt(arr[1])
            var x = parseInt(arr[2]);
            var y = parseInt(arr[3]);
            this.dots[color][dot].move(x,y)
        })


        window.addEventListener("resize", this.resize.bind(this));
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