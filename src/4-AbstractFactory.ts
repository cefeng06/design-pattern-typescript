// 抽象工厂

// 专门用于生产一系列相关对象，工厂方法只能生产同类产品的不同状态，添加新产品时可以采用抽象工厂
// 优点：1. 单一职责、开闭原则；2. 避免客户端和具体产品代码的耦合；3. 确保同一工厂生成的产品属于同一系列。
// 缺点：1. 引入众多接口和类；

export abstract class ComponentFactory {

    /** 基类中的工厂方法只是抽象 */
    abstract createButton(): Button;

    abstract createCheckbox(): Checkbox;
}


// 产品接口中将声明所有具体产品都必须实现的操作
interface Button {
    name: string;
    onClick: Function;
    render: Function;
}

interface Checkbox {
    name: string;
    onChange: Function;
    render: Function;
}

class IEComponentFactory extends ComponentFactory {

    createButton() {
        return new IEButton();
    }

    createCheckbox() {
        return new IECheckbox();
    }
}

class FirefoxComponentFactory extends ComponentFactory {

    createButton() {
        return new FirefoxButton();
    }

    createCheckbox() {
        return new FirefoxCheckbox();
    }
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

class IECheckbox implements Checkbox {


    name: string;

    constructor() {
        this.name = "IECheckbox";
        console.log(`create ${this.name}`);
    }

    onChange() {
        console.log(`change ${this.name} in IE`);
    }

    render() {
        console.log(`render ${this.name} in IE`);
    }

}

class FirefoxCheckbox implements Checkbox {

    name: string;

    constructor() {
        this.name = "FirefoxCheckbox";
        console.log(`create ${this.name}`);
    }

    onChange() {
        console.log(`change ${this.name} in Firefox`);
    }

    render() {
        console.log(`render ${this.name} in Firefox`);
    }

}

//客户端
class Application {

    factory: ComponentFactory;
    button: Button;
    checkbox: Checkbox;

    constructor(type: string) {
        switch (type) {
            case "IE":
                this.factory = new IEComponentFactory();
                break;
            case "Firefox":
                this.factory = new FirefoxComponentFactory();
                break;
        }
    }

    createUI() {
        this.button = this.factory.createButton();
        this.checkbox = this.factory.createCheckbox();
    }
}

const app = new Application('IE');
app.createUI();