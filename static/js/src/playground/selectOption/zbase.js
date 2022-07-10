export class selectOption{
    constructor(root){
        this.root = root;

        this.photo = "";
        this.username = "";
        //选择歌曲的界面
        this.$selectMenu = $(`
<div class="ac-game-selectoption">
    <div class="ac-game-selectoption-menu">
    </div>
    <div class="ac-game-selectoption-content">
    </div>
<div>
`);
        this.$menu = this.$selectMenu.find(".ac-game-selectoption-menu");
        this.$content = this.$selectMenu.find(".ac-game-selectoption-content");

        this.hide();
        this.add_listening_events();
        this.start();
    }

    //获取玩家的个人信息
    getPlayerInfo(){
        this.$playerInfo = $(`
<div class="ac-game-selectoption-back">
    退出
</div>
<div class="ac-game-selectoption-creater">
    创作者模式
</div>
<div class="ac-game-selectoption-photo">
    <img class="ac-game-selectoption-photo-image" src="" alt="some_text">
    </img>
</div>
<div class="ac-game-selectoption-username"> 
    欢迎回来! 
</div>
`);
        let outer = this;
        let $username = this.$playerInfo.find(".ac-game-selectoption-username");
        let $photo = this.$playerInfo.find(".ac-game-selectoption-photo > img");

        $.ajax({
            url: "https://app2361.acapp.acwing.com.cn/settings/getinfo/",
            type: "GET",
            data: {
                platform: outer.platform,
            },
            success: function(resp){
                console.log(resp.username);
                console.log(resp.photo);
                $username.html("欢迎回来！" + resp.username);
                $photo.attr(resp.photo);
            }
        });

        //之后再完善创作者模式
    }

    add_listening_events(){
        let outer = this;

        this.$exit_button.click(function(){
            outer.hide();
            outer.root.menu.show();
        });
    }

    //在数据库中查找所有的游戏
    checkGameInfo(){
        this.$items = [];
        $.ajax({
            url: "",
            type: "GET",
            data: {

            },
            success: function(response) {
                
            },
        });
        let $item_box = $(`
<div class="ac-game-selectoption-box">
</div>
`);
        let $item = $(`
<div class="ac-game-selectoption-item">
    <div class="ac-game-selectoption-item-info">Infinity Heaven</div>
    <div class="ac-game-selectoption-item-information">
        <div class="ac-game-music-black-background">
            <div class="ac-game-music-name">
            </div>
        </div>
        <div class="ac-game-music-score"></div>
        <div class="ac-game-music-bpm"></div>
        <div class="ac-game-music-author"></div>
    </div>
</div>
`);
        //之后还想设置一个难度
        $item_box.append($item);
        this.$content.append($item_box);
        //上面的可能之后再写
    } 
    
    start(){
        this.getPlayerInfo();

        this.$menu.append(this.$playerInfo);
        this.root.$ac_game.append(this.$selectMenu);

        this.$exit_button = this.$menu.find(".ac-game-selectoption-back");

        this.checkGameInfo();
    }

    show(){
        this.$selectMenu.show();
    }
    hide(){
        this.$selectMenu.hide();
    }
}