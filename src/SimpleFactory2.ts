
// 简单工厂 (分离)

// 工厂类根据参数不同返回不同的实例
// 优点：单一指责原则：对象的创建和使用分离，创建完全交给工厂类
// 缺点：不符合开闭原则，新增一个产品类就要修改工厂类，较为不灵活；
export class ButtonFactory {

    constructor(type: string) {
        switch (type) {
            case "IE":
                this.button = new IEButton();
                break;
            case "Firefox":
                this.button = new FirefoxButton();
                break;
        }
    }

    public button: Button;

}

// 产品接口中将声明所有具体产品都必须实现的操作
interface Button {
    name: string;
    onClick: Function;
    render: Function;
}

// 具体产品聚焦提供产品接口的各种实现
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

    button: Button

    constructor(type: string) {
        this.button = new ButtonFactory(type).button;
        this.button.onClick();
        this.button.render();
    }
}

new Application("IE");