export class Option{
    constructor(root){
        this.root = root;
        
        this.$option = $(`
<div class="ac-game-option-settings">
    <div class="ac-game-selectoption-menu">
    </div>

    <div class="ac-game-option-bgm-volume"> 
    </div>
        
    <div class="ac-game-option-game-volume">
    </div>
        
    <div class="ac-game-option-game-Offset">
    </div>
</div>        
`);
        this.getPlayerInfo();

        this.root.$ac_game.append(this.$option);

        this.$menu = this.$option.find(".ac-game-selectoption-menu");

        this.$menu.append(this.$playerInfo);

        this.$exit_button = this.$menu.find(".ac-game-selectoption-back");
        
        this.add_listening_events();

        this.hide();
        this.start();
    }

        //获取玩家的个人信息
    getPlayerInfo(){
        this.username = this.root.settings.username;
        this.photo = this.root.settings.photo;
        this.$playerInfo = $(`
<div class="ac-game-selectoption-back">
    退出
</div>
<div class="ac-game-selectoption-photo">
    <img class="ac-game-selectoption-photo-image" src="https://cdn.acwing.com/media/user/profile/photo/119954_lg_ce603bf721.jpg" alt="some_text">
    </img>
</div>
<div class="ac-game-selectoption-username"> 
    欢迎回来! FoPluto
</div>
    `)
        //之后再完善创作者模式
    }

    add_listening_events(){
        let outer = this;
        console.log("******");
        this.$exit_button.click(function(){
            outer.hide();
            outer.root.menu.show();
            console.log("------");
        });
    }

    start(){
        
    }

    hide(){
        this.$option.hide();
    }
    
    show(){
        this.$option.show();
    }
}