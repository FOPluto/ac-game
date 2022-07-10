export class AcGamePlayground extends AcGameObject{
    constructor(root){
        super();
        this.root = root;
        this.$playground = $('<div class="ac-game-playground"></div>');

        this.start();
    }

    update(){
        
    }

    start(){

    }

    show(){
        this.$playground.show();
        //this.hide();
        this.root.$ac_game.append(this.$playground);
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);
    }

    hida(){

    }
}