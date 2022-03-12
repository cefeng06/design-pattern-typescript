// 生成器模式

// 将对象的构建划分为一组步骤, 每次创建对象时， 你都需要通过生成器对象执行一系列步骤。 
// 优点：1. 生成不同种类的产品时，不必给构造函数配置大量参数；
//      2. 可以分步创建对象， 暂缓创建步骤或递归运行创建步骤。
//      3. 将对象生成的逻辑（构造函数）从业务逻辑中分离；
// 缺点：1. 新增多个类（每种产品一个类，增加代码复杂度）

// 在基本生成器接口清晰地定义通用步骤， 确保它们可以制造所有形式的产品
export abstract class Builder {

    abstract reset(name: string): void;

    abstract addBody(color: string): void;

    abstract addEngine(power: number): void;

    abstract addSeats(brand: string): void;

    abstract addSoftware(feature: string[]): void;

    abstract getProduct(): Car | Manual;

}

class Car {

    public name: string;
    public body: string;
    public engine: number;
    public seats: string;
    public softwares: string[];

    constructor(name: string) {
        this.name = name;
    }
}

class Manual {

    public list: any[];

    constructor() {
        this.list = [];
    }
}

// 为每个形式的产品创建具体生成器类， 并实现其构造步骤。
export class CarBuilder extends Builder {

    private car: Car;

    public reset(name: string) {
        this.car = new Car(name)
    };

    public addBody(color: string) {
        this.car.body = color;
    };

    public addEngine(power: number) {
        this.car.engine = power;
    };

    public addSeats(brand: string) {
        this.car.seats = brand;
    };

    public addSoftware(feature: string[]) {
        this.car.softwares = feature;
    }

    public getProduct() {
        return this.car;
    };

}

// 为每个形式的产品创建具体生成器类， 并实现其构造步骤。
export class CarManualBuilder extends Builder {

    private manual: Manual;

    public reset() {
        this.manual = new Manual();
    };

    public addBody(color: string) {
        this.manual.list.push(color);
    };

    public addEngine(power: number) {
        this.manual.list.push(power);
    };

    public addSeats(brand: string) {
        this.manual.list.push(brand);
    };

    public addSoftware(feature: string[]) {
        this.manual.list.push(feature);
    }

    public getProduct() {
        return this.manual;
    };

}

// 考虑创建主管类, 可以使用同一生成器对象来封装多种构造产品的方式。
class Manager {

    builder: Builder;

    setBuilder(builder: Builder) {
        this.builder = builder;
    }

    // 防止构造函数传入过量参数
    constructorSUV(builder: Builder) {
        builder.reset("suv");
        builder.addBody("red");
        builder.addEngine(2000);
        builder.addSeats("Ow");
        builder.addSoftware([]);
    }

    constructorRaceCar(builder: Builder) {
        builder.reset("race");
        builder.addBody("black");
        builder.addEngine(3000);
        builder.addSeats("OO");
        builder.addSoftware(["", ""]);
    }

}

class Application {

    getCar() {
        const manager = new Manager();
        const carBuilder = new CarBuilder();
        manager.constructorSUV(carBuilder);
        const car = carBuilder.getProduct();

        const manualBuilder = new CarManualBuilder();
        manager.constructorSUV(manualBuilder);
        const manual = manualBuilder.getProduct();
        return [car, manual];
    }

}

const app = new Application();
console.log(app.getCar());