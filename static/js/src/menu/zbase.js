class AcGameMenu{
    //    <video src="/static/video/back.mp4" class="ac-game-settings-background" autoplay="autoplay" loop="loop" muted="muted"></video>
    constructor(root){
        this.root = root;
        this.$menu = $(`
<div class="ac-game-menu">
    <audio id="background-menu-audios" class="ac-game-menu-audio" autoplay="autoplay" "loop="loop" preload="auto" src="/static/audio/music.mp3"></audio>

    <video src="/static/video/back.mp4" class="ac-game-settings-background" autoplay="autoplay" loop="loop" muted="muted"></video>
    <div class="ac-game-menu-content">
        <div class="ac-game-menu-content-item ac-game-menu-content-item-single_mode">
        单人模式
        </div>
        <br>
        <div class="ac-game-menu-content-item ac-game-menu-content-item-multi_mode">
        多人模式
        </div>
        <br>
        <div class="ac-game-menu-content-item ac-game-menu-content-item-settings">
        选项
        </div>
        <br>
        <div class="ac-game-menu-content-item ac-game-menu-content-item-logout">
        退出
        </div>
    </div>
    <script type="module">
        document.getElementById("background-menu-audios").volume = 0.041;
    </script>
</div>
`);
        this.$menu.hide();
        this.root.$ac_game.append(this.$menu);
        this.$single_mode = this.$menu.find('.ac-game-menu-content-item-single_mode');
        this.$multi_mode = this.$menu.find('.ac-game-menu-content-item-multi_mode');
        this.$settings = this.$menu.find('.ac-game-menu-content-item-settings');
        this.$logout = this.$menu.find(".ac-game-menu-content-item-logout");

        this.start();
    }

    start(){
        this.add_listening_events();
    }
    add_listening_events(){
        let outer = this;
        this.$single_mode.click(function(){
            outer.hide();
            outer.root.selectoption.show();
        });

        //游戏配置的选项,比如调节偏移度之类的调整
        this.$settings.click(function(){
            outer.hide();
            outer.root.option.show();
        })

        this.$logout.click(function() {
            outer.root.settings.logout_on_remote();
            location.reload();
        })
    }
    //当我们点完这个游戏的按钮的时候就会关闭菜单界面
    //当我们关闭游戏界面时就会展示menu界面
    show(){//展示menu界面
        this.$menu.show();
    }
    hide(){//关闭menu界面
        this.$menu.hide();
    }
}
