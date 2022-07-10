class Particle extends AcGameObject{
    constructor(playground, x, y, radius, color, speed, vx, vy){
        super();
        this.playground = playground;
        this.x = x;
        this.ctx = this.playground.game_map.ctx;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.vx = vx;
        this.vy = vy;
        this.friction = 0.9;
        this.epx = 0.1;
    }

    start(){

    }


    update(){
        if(this.speed < this.epx){
            this.destroy();
            return false;
        }

        
        this.x += this.vx * this.speed * this.time_delta / 1000;
        this.y += this.vy * this.speed * this.time_delta / 1000;
        this.speed *= this.friction;
        this.render();
    }

    render(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}