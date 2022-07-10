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
 