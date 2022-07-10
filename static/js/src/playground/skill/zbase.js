class FireBall extends AcGameObject {
    constructor (playground, player, x, y, radius, color, speed, move_length, vx, vy, hurt){
        super();

        this.move_length = move_length;//射程

        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.player = player;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;

        this.vx = vx;
        this.vy = vy;

        this.etx = 0.1;

        this.hurt = hurt;
    }

    render(){
        console.log("shoot");
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;

        this.ctx.fill();
    }

    start(){

    }

    get_dist(x1, y1, x2, y2){
        let dx = x1 - x2;
        let dy = y1 - y2;

        return Math.sqrt(dy * dy + dx * dx);
    }


    is_collision(player){
        if(this.get_dist(this.x, this.y, player.x, player.y) - (this.radius + player.radius) < this.etx){
            //返回TRUE,执行伤害函数
            return true;
        }
        else return false;
    }

    on_destroy(){
        for(let i = 0;i < 8 + Math.random() * 5;i++){
            let x = this.x;
            let y = this.y;
            let radius = this.radius * Math.random() * 0.2;
            let color = this.color;
            let speed = this.speed * 5;
            let angle = Math.random() * Math.PI * 2;
            let vx = Math.cos(angle);
            let vy = Math.sin(angle);
            new Particle(this.playground, x, y, radius, color, speed, vx, vy);
        }
    }

    attack(player){
        let dy = player.y - this.y;
        let dx = player.x - this.x;

        let angle = Math.atan2(dy, dx);

        player.is_attacked(this.hurt, angle);
        this.destroy();
    }

    update(){
        if(this.move_length < this.etx){
            this.destroy();
            return false;//火球消失
        }
        let moved = Math.min(this.move_length, this.speed * this.time_delta / 1000);

        this.move_length -= moved;

        this.x += this.vx * moved;
        this.y += this.vy * moved;

        for(let item in this.playground.players){
            let player = this.playground.players[item];
            if(player !== this.player && this.is_collision(player)){
                this.attack(player);
            }
        }

        this.render();
    }
}