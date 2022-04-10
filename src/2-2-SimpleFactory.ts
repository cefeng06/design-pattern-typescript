
// 简单工厂 (半分离/半集成)

// 在第一种写法基础上分离类型判断的逻辑
// 优点：1. 单一指责原则：对象的创建和使用分离，工厂类可以聚焦公共方法，类型交给其他函数；
//      2. 类型判断的逻辑还可以被其他同类工厂使用;
// 缺点：1. 产品类不能重写方法，自由度太低
export class ButtonFactory {

    constructor(type: string) {
        this.button = buttonCategoryMaker(type);
    }

    public button: Button;

    public onClick() {
        console.log(`click ${this.button.name}`);
    }

    public render() {
        console.log(`render ${this.button.name}`);
    }

}

// 把生成种类的逻辑从工厂分离，符合单一指责
function buttonCategoryMaker(type: string) {
    switch (type) {
        case "IE":
            return new IEButton();
        case "Firefox":
            return new FirefoxButton();
        default:
            return new IEButton();
    }
}

// 其他工厂可以复用分类逻辑
export class SecondButtonFactory {

    constructor(type: string) {
        this.button = buttonCategoryMaker(type);
    }

    public button: Button;

    public onHover() {
        console.log(`hover ${this.button.name}`);
    }

    public onDrag() {
        console.log(`drag ${this.button.name}`);
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