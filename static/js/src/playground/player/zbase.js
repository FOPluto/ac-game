class Player extends AcGameObject {
    constructor(playground, x, y, radius, color, speed, is_me){
        super();
        this.x = x;
        this.y = y;

        this.vx = 0;
        this.vy = 0;

        this.move_length = 0;

        this.speedx = 1;
        this.speedy = 1;
        this.speed = speed;

        this.damagex = 0;
        this.damagey = 0;
        this.damage_speed = 0;
        
        this.friction = 0.9;

        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.radius = radius;
        this.speed = speed;
        this.is_me = is_me;
        this.eps = this.playground.height * 0.0001;  //误差可以理解为精度
        this.color = color;
        this.spent_time = 0;

        if(this.is_me) {
            this.img = new Image();
            this.img.src = this.playground.root.settings.photo;
            console.log("---"); 
            console.log(this.img.src);
            console.log("---");
        }

        this.hold_skill = "";
    }

    start(){
        if(this.is_me){
            this.add_listening_events();
        } else {
            this.random_move();
        }
    }

    random_move(){
        let tx = Math.random() * this.playground.width;
        let ty = Math.random() * this.playground.height;

        this.move_to(tx, ty);
    }

    shoot_ball(tx, ty){
        let radius = this.playground.height * 0.01;
        let angle = Math.atan2(ty - this.y, tx - this.x);
        let vx = Math.cos(angle);
        let vy = Math.sin(angle);
        let color = this.color;
        let speed = this.playground.height * 0.3;

        let move_length = this.playground.height * 0.6;

        this.fireball = new FireBall(this.playground, this, this.x, this.y, radius, color, speed, move_length, vx, vy, this.playground.height * 0.01);
    }

    add_listening_events() {
        let outer = this;
        this.playground.game_map.$canvas.contextmenu(function (e) {
            e.preventDefault();
            return false;
        });

        this.playground.game_map.$canvas.mousedown(function(e){
            const rect = outer.ctx.canvas.getBoundingClientRect();

            if(e.which === 3){
                outer.move_to(e.clientX - rect.left, e.clientY - rect.top);
            } else if(e.which === 1) {
                if(outer.hold_skill === "fireball"){
                    outer.shoot_ball(e.clientX - rect.left, e.clientY - rect.top);
                }
                outer.hold_skill = null;
            }
        });

        $(window).keydown(function(e){
            if(e.which === 81) { //按住q的时候
                outer.hold_skill = "fireball";
            }
        });
    }

    on_destroy(){
        this.playground.number--;
        for(let item in this.playground.players) {
            if(this.playground.players[item] === this){
                this.playground.players.splice(item, 1);
            }
        }
    }

    is_attacked(hurt, angle){
        this.radius -= hurt;
        if(this.radius < 10){
            this.destroy();
            return false;
        } else {
            //冲击力
            //失去控制
            this.damagex = Math.cos(angle);
            this.damagey = Math.sin(angle);
            this.damage_speed = this.speed * 2;

            for(let i = 0;i < 15 + Math.random() * 5;i++) {
                let x = this.x;
                let y = this.y;
                let radius = this.radius * Math.random() * 0.1;
                let color = this.color;
                let speed = this.speed * 10;
                let angle = Math.random() * Math.PI * 2;
                let vx = Math.cos(angle);
                let vy = Math.sin(angle);
                new Particle(this.playground, x, y, radius, color, speed, vx, vy);
            }
        }
    }

    get_dist(x1, y1, x2, y2){
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    move_to(tx, ty){
        console.log("tx: " + tx + " ty: " + ty);
        this.move_length = this.get_dist(this.x, this.y, tx, ty);
        let angle = Math.atan2(ty - this.y, tx - this.x);
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
    }


    update(){
        this.spent_time += this.time_delta / 1000;

        if(!this.is_me && Math.random() < 1/ 200 && this.spent_time > 5) {
            let index = Math.floor(Math.random() * this.playground.players.length);
            let tx = this.playground.players[index].x - this.x;
            let ty = this.playground.players[index].y - this.y;
            this.shoot_ball(tx, ty);
        }

        if(this.radius < this.eps) {
            this.destroy();
        }
        if(this.damage_speed > this.eps) {
            this.vx = 0;
            this.vy = 0;
            this.move_length = 0;
            this.x += this.damagex * this.damage_speed * this.time_delta / 1000;
            this.y += this.damagey * this.damage_speed * this.time_delta / 1000;
            this.damage_speed *= this.friction;
            this.rander();
        } else{
        if(this.move_length < this.eps) {
            this.move_length = 0;
            this.vx = this.vy = 0;
            if(!this.is_me) {
                this.random_move();
            }
        } else {
            let moved = Math.min(this.speed * this.time_delta / 1000, this.move_length);
            this.x += this.vx * moved;
            this.y += this.vy * moved;
            this.move_length -= moved;
        }
        this.rander();
    }
}

    rander(){
        if(this.is_me) {
            //把自己的颜色画上去
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.ctx.stroke();
            this.ctx.clip();
            this.ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2); 
            this.ctx.restore();
        } else{
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }
    }
}
