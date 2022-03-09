
// 工厂方法是继承的一种应用，基于依赖关系，继承父类的公共部分，根据不同的用途，在子类中重写创建方法
// 工厂方法将创建产品的代码与实际使用产品的代码分离， 从而能在不影响其他代码的情况下扩展产品创建部分代码。
// 例如， 如果需要向应用中添加一种新产品， 你只需要开发新的创建者子类， 然后重写其工厂方法即可。


// 创建者类声明的工厂方法必须返回一个产品类的对象。创建者的子类通常会提供该方法的实现。
abstract class Dialog {

    /** 基类中的工厂方法只是抽象 */
    abstract createButton(): Button

    /** 
    /* 请注意，创建者的主要职责并非是创建产品。其中通常会包含一些核心业务
    /* 逻辑，这些逻辑依赖于由工厂方法返回的产品对象。子类可通过重写工厂方
    /* 法并使其返回不同类型的产品来间接修改业务逻辑。
    /* */
    render() {
        const btn = this.createButton();
        btn.render();
    }
}

// 具体创建者将重写工厂方法以改变其所返回的产品类型。
class IEDialog extends Dialog {
    createButton(): Button {
        return new IEButton();
    }
}

class FirefoxDialog extends Dialog {
    createButton(): Button {
        return new FirefoxButton();
    }
}

// 产品接口中将声明所有具体产品都必须实现的操作
interface Button {
    onClick: Function;
    render: Function;
}

// 具体产品需提供产品接口的各种实现
class IEButton implements Button {

    onClick() {

    }

    render() {
        console.log("render this btn for IE");
    }
}

class FirefoxButton implements Button {

    onClick() {

    }

    render() {
        console.log("render this btn for Firefox");
    }
}


//客户端
class Application {

    dialog: Dialog;

    constructor(type: string) {
        this.dialog = this.initialize(type);
        this.dialog.render();
    }

    initialize(type: string) {
        switch (type) {
            case "IE":
                return new IEDialog();
            case "Firefox":
                return new FirefoxDialog();
            default:
                throw new Error('...');
        }
    }
}

new Application("IE");