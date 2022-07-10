export class Settings {
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
}