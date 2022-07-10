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
/**
 * @author zhangjunyong
 */
 let AC_GAME_OBJECTS = [];

 class AcGameObject{
     constructor(){
         this.has_called_start = false; //记录是否调用过了start函数，目的是将start函数单独领出来
         this.time_delta = 0; //记录当前帧距离上一帧的精确的时间差,增加速度的鲁棒性
         //防止因为时间的间隔的不同而造成速度不统一
 
         AC_GAME_OBJECTS.push(this);
 
     }
 
     start(){  //只会在第一次创建的时候执行一次
        
     }
     update(){  //每一帧都会更新所执行的函数,更新函数
         
     }
     on_destroy(){  //在当前物体被销毁前会被执行一次，用来记录击杀着的得分
     }
 
     destroy(){  //物体销毁所执行的函数，删除当前物体
 
         this.on_destroy();//用来调用该函数实现销毁前的处理
 
         for(let i = 0;i < AC_GAME_OBJECTS.length; i++){
             if(AC_GAME_OBJECTS[i] === this){
                 AC_GAME_OBJECTS.splice(i, 1);//js的删除函数
                 break;
             }
         }
     }
 }
 
 
 let last_timestamp;
 let AC_GAME_ANIMATION = function(timestamp) {
     for (let i = 0; i < AC_GAME_OBJECTS.length; i ++ ) {
         let obj = AC_GAME_OBJECTS[i];
         if (obj.has_called_start == false) {
             obj.start();
             obj.has_called_start = true;
         } else {
             obj.time_delta = timestamp - last_timestamp;
             obj.update();
         }
     }
 
     last_timestamp = timestamp;
 
     requestAnimationFrame(AC_GAME_ANIMATION);
 }
 
 
 requestAnimationFrame(AC_GAME_ANIMATION);
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
}export class selectOption{
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

        this.getPlayerInfo();

        this.$menu.append(this.$playerInfo);
        this.root.$ac_game.append(this.$selectMenu);

        this.$exit_button = this.$menu.find(".ac-game-selectoption-back");

        this.add_listening_events();
        
        this.hide();
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
    <img id="ac-game-selectoption-images" class="ac-game-selectoption-photo-image" src="" alt="some_text">
    </img>
</div>
<div id="ac-game-selectoption-usernames" class="ac-game-selectoption-username"> 
    欢迎回来! 
</div>
`);
        this.$username_box = $("#ac-game-selectoption-usernames");
        this.$photo_box = $("#ac-game-selectoption-images");
        let outer = this;
        let $username = this.$playerInfo.find(".ac-game-selectoption-username");
        let $photo = this.$playerInfo.find(".ac-game-selectoption-photo > img");
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
        this.checkGameInfo();
    }
    show(){
        this.$username_box.html("欢迎回来！" + this.root.settings.username);
        this.$photo_box.attr(this.root.settings.photo);
        this.$selectMenu.show();
    }
    hide(){
        this.$selectMenu.hide();
    }
}export class AcGamePlayground extends AcGameObject{
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
}export class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "WEB";
        if(this.root.AcWingOS) this.platform = "ACAPP";

        this.photo = "";
        this.username = "";
        //game/static/audio/back_ground_music.mp3
        this.$settings = $(`
<div class="ac-game-settings">
    <audio id="background-settings-audios" class="ac-game-settings-audio" autoplay="autoplay" "loop="loop" preload="auto" src="/static/audio/music.mp3"></audio>
    <video src="/static/video/background.mp4" class="ac-game-settings-background" autoplay="autoplay" loop="loop" muted="muted"></video>


    <div class="ac-game-settings-login">
        <div class="ac-game-settings-login-title">
            Welcome
        </div>
        <div class="ac-game-settings-username">
            <div class="ac-game-settings-item">
                <div>用户名</div>
                <br>
                <input required type="text" placeholder="username">
                <br>
            </div>
        </div>
        <br>
        <div class="ac-game-settings-password">
            <div class="ac-game-settings-item">
                <div>密码</div>
                <br>
                <input required type="password" placeholder="password">
            </div>
        </div>
        <br><br>
        <div class="ac-game-settings-submit">
            <div class="ac-game-settings-item">
                <button id="ac-game-settings-submit">登录</button>
            </div>
        </div>
        <div class="ac-game-settings-error-messages"></div>
        <div class="ac-game-settings-option" id="login-option">
            没有账号？注册一个
        </div>
        <br>
        <div class="ac-game-settings-acwing">
            <img width="30" src="/static/image/settings/ACWINGimg.png">
            <div>
                AcWing一键登录
            </div>
        </div>
    </div>


    <div class="ac-game-settings-register">
        <div class="ac-game-settings-login-title">
            Join Us
        </div>
        <div class="ac-game-settings-username">
            <div class="ac-game-settings-item">
                <div>用户名</div>
                <br>
                <input required type="text" placeholder="username">
                <br>
            </div>
        </div>
        <br>
        <div class="ac-game-settings-password">
            <div class="ac-game-settings-item">
                <div>密码</div>
                <br>
                <input required type="password" placeholder="password">
            </div>
        </div>
        <div class="ac-game-settings-password-confirm">
            <div class="ac-game-settings-item">
                <br>
                <div>确认密码</div>
                <br>
                <input required type="password" placeholder="confirm the password">
            </div>
        </div>
        <br><br><br>
        <div class="ac-game-settings-submit">
            <div class="ac-game-settings-item">
                <button id="ac-game-settings-submit">注册</button>
            </div>
        </div>
        <br>
        <div class="ac-game-settings-error-messages">
        </div>
        <div class="ac-game-settings-option" id="register-option">
            已有账号？马上登录
        </div>
        <br>
    </div>
    <script type="module">
        document.getElementById("background-settings-audios").volume = 0.015;
    </script>
</div>
`);
        this.$login = this.$settings.find(".ac-game-settings-login");
        
        this.$login_username = this.$login.find(".ac-game-settings-username input");//用空格隔开多级的
        this.$login_password = this.$login.find(".ac-game-settings-password input");
        this.$login_submit = this.$login.find(".ac-game-settings-submit button");
        this.$login_error_message = this.$login.find(".ac-game-settings-error-messages");
        
        this.$login_register = this.$login.find(".ac-game-settings-option");

        //
        this.$register = this.$settings.find(".ac-game-settings-register");

        this.$register_username = this.$register.find(".ac-game-settings-username input");//用空格隔开多级的
        this.$register_password = this.$register.find(".ac-game-settings-password input");
        this.$register_password_confirm = this.$register.find(".ac-game-settings-password-confirm input");
        this.$register_submit = this.$register.find(".ac-game-settings-submit button");
        this.$register_error_message = this.$register.find(".ac-game-settings-error-messages");
        
        this.$register_login = this.$register.find(".ac-game-settings-option");

        

        //
        
        
        this.$login.hide();
        this.$register.hide();

        this.root.$ac_game.append(this.$settings);

        this.$login_option = $("#login-option");
        this.$register_option = $("#register-option");

        this.add_listening_events();

        this.start();
    }

    add_listening_events(){
        let outer = this;
        this.$login_option.click(function(){
            outer.register();
        });
        this.$register_option.click(function(){
            outer.login();
        });

        this.$login_submit.click(function() {
            outer.login_on_remote();
        })

        this.$register_submit.click(function() {
            outer.register_on_remote();
        })
        
        let $background = $('.ac-game-settings-background');
    }

    //在远程服务器上登录
    login_on_remote() {
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        this.$login_error_message.empty();
        let outer = this;
        $.ajax({
            url: "https://app2361.acapp.acwing.com.cn/settings/login/",
            type: "GET",
            data: {
                username: username,
                password: password,
            },
            success: function(response) {
                console.log(response);
                if (response.result === "success") {
                    outer.username = username;
                    outer.photo = response.photo;
                    location.reload();//刷新一下
                } else {
                    let error_message = response.result;
                    outer.$login_error_message.html(error_message);
                    console.log(error_message);
                }
            },
        });
    }

    //在远程服务器上注册
    register_on_remote() {
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let password_confirm = this.$register_password_confirm.val();

        console.log(username);
        console.log(password);
        console.log(password_confirm);
        
        this.$register_error_message.empty();

        let outer = this;

        $.ajax({
            url: "https://app2361.acapp.acwing.com.cn/settings/register/",
            type: "GET",
            data: {
                username: username,
                password: password,
                password_confirm: password_confirm,
            },
            success: function(response){
                console.log(response);
                if(response.result === "success") {
                    outer.username = username;
                    outer.photo = response.photo;
                    location.reload();
                } else {
                    outer.$register_error_message.html(response.result);
                }
            }
        });
    }

    //在远程服务器上登出
    logout_on_remote() {
        if (this.platform === "ACAPP") return false;

        $.ajax({
            url: "https://app2361.acapp.acwing.com.cn/settings/logout/",
            type: "GET",
            success: function (resp) {
                console.log(resp);
                if(resp.result === "success") {
                    location.reload();
                }
            }
        });
    }

    //开始函数
    start(){
        this.getinfo();
    }

    //打开登录界面的函数
    login(){
        let outer = this;
        this.$register.fadeOut(250);
        setTimeout(function() {
            outer.$login.fadeIn(250);
        }, 250)
    }

    //打开注册界面
    register(){
        let outer = this;
        this.$login.fadeOut(250);

        setTimeout(function() {
            outer.$register.fadeIn(250);
        }, 250)
    }

    getinfo(){
        let outer = this;

        $.ajax({
            url: "https://app2361.acapp.acwing.com.cn/settings/getinfo/",
            type: "GET",
            data: {
                platform: outer.platform,
            },
            success: function(resp){
                console.log(resp)
                if(resp.result === "success") {
                    outer.username = resp.username;
                    outer.photo = resp.photo;

                    outer.hide();
                    outer.root.menu.show();
                } else {
                    outer.login();
                }
            }
        });
    }

    hide(){
        this.$settings.hide();
    }

    show(){
        this.$settings.show();
    }
}export class AcGame{
    constructor(id, AcWingOS){
        this.id = id;
        //会传一些接口,可能是ACWING的接口
        this.AcWingOS = AcWingOS;
        
        this.$ac_game = $('#' + id);

        this.settings = new Settings(this);
        this.menu = new AcGameMenu(this);
        this.playground = new AcGamePlayground(this);
        this.selectoption = new selectOption(this);
        this.option = new Option(this);
    }
}