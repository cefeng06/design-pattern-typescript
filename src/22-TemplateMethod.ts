// 模版方法模式

// 定义一个算法框架，允许子类在不修改结构的情况下重写算法的步骤；

abstract class Player {

    init() {
        this.collectResources();
        this.buildHome();
        this.attack();
        this.searchMoney();
    }

    collectResources() {
        console.log('start collect res');
    }

    buildHome() {
        console.log('start build home');
    }

    attack() {
        console.log('start attack others');
    }

    searchMoney() {
        console.log('start search money');
    }

}

class Monster extends Player {

    // 子类重写算法步骤
    attack() {
        console.log('start attack others crazily');
    }

}

const m = new Monster();
m.init();