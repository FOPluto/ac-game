export class AcGame{
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
