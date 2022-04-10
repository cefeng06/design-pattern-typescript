
// 简单工厂 (集成)

// 工厂类根据参数创建实例，提供了一些列公共方法
// 优点：单一指责原则：对象的创建和使用分离，创建完全交给工厂类
// 缺点：1. 不符合开闭原则，新增一个产品类就要修改工厂类，非常不灵活；
//      2. 不符合单一指责原则，对象的创建和使用都在工厂类中
//      3. 产品类不能重写方法，自由度太低
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

    // 公共方法
    public onClick() {
        console.log(`click ${this.button.name}`);
    }

    public render() {
        console.log(`render ${this.button.name}`);
    }

}

// 产品接口中将声明所有具体产品都必须实现的操作
interface Button {
    name?: string;
    onClick?: Function;
    render?: Function;
}

// 具体产品聚焦提供产品接口的各种实现
class IEButton implements Button {

    name: string;

    constructor() {
        this.name = "IEButton"
    }

    /** 注意：实际没有被调用的无效重写 */
    public render() {
        console.log(`render in product class`);
    }
}

class FirefoxButton implements Button {

    name: string;

    constructor() {
        this.name = "FirefoxButton"
    }
}


//客户端
class Application {

    button: ButtonFactory;

    constructor(type: string) {
        this.button = new ButtonFactory(type);
        this.button.onClick();
        this.button.render();
    }
}

new Application("IE");