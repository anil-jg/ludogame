const WIDTH = 640;
const HEIGHT = 1136;
const LUDO_HEIGHT = 640;
const UNIT_LENGTH = LUDO_HEIGHT / 15;
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
    move(x,y){
        this.x = UNIT_LENGTH*x + 20;
        this.y = 246 + UNIT_LENGTH*y + 20;
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
                    var position = prompt("Enter new position e.g 6,13");
                    var arr = position.split(",")
                    var x = parseInt(arr[0]);
                    var y = parseInt(arr[1]);
                    newDot.move(x,y);
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