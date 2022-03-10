// 工厂方法

// 相比于简单工厂，核心工厂只定义了抽象接口，负责给出工厂应该实现的方法，产品的创建交给子类
// 优点：开闭原则 - 如果需要向应用中添加一种新产品，你只需要开发新的工厂子类， 然后重写其工厂方法即可，无需修改之前的工厂类，拓展性好
// 缺点：需要引入许多新的子类， 代码可能会因此变得更复杂。
export abstract class ButtonFactory {

    /** 基类中的工厂方法只是抽象 */
    abstract createButton(): Button;

    button: Button;

    // 公共方法
    show() {
        this.button = this.createButton();
        this.button.render();
    }

    hide() {
        console.log(`hide ${this.button.name}`)
    }

}

// 具体创建者将重写工厂方法以改变其所返回的产品类型。
export class IEBtnFactory extends ButtonFactory {

    createButton() {
        return new IEButton();
    }

}

export class FirefoxBtnFactory extends ButtonFactory {

    createButton() {
        return new FirefoxButton();
    }

}


// 产品接口中将声明所有具体产品都必须实现的操作
interface Button {
    name: string;
    onClick: Function;
    render: Function;
}

// 具体产品需提供产品接口的各种实现
class IEButton implements Button {

    name: string;

    constructor() {
        this.name = "IEButton";
        console.log(`create ${this.name}`);
    }

    onClick() {
        console.log(`click ${this.name} in IE`);
    }

    render() {
        console.log(`render ${this.name} in IE`);
    }
}

class FirefoxButton implements Button {

    name: string;

    constructor() {
        this.name = "FirefoxButton";
        console.log(`create ${this.name}`);
    }

    onClick() {
        console.log(`click ${this.name} in Firefox`);
    }

    render() {
        console.log(`render ${this.name} in Firefox`);
    }
}


//客户端
class Application {

    button: ButtonFactory

    constructor(type: string) {
        switch (type) {
            case "IE":
                this.button = new IEBtnFactory();
                break;
            case "Firefox":
                this.button = new FirefoxBtnFactory();
                break;
        }
        this.button.show();
    }

}

new Application("IE");