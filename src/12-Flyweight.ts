// 享元模式

// 通过共享多个对象所共有的相同状态， 让你能在有限的内存容量中载入更多对象。
// 内在状态： 包含不变的、 可在许多对象中重复使用的数据的成员变量
// 外在状态： 包含每个对象各自不同的情景数据的成员变量
// 优点：节约大量内存


// 享元类中储存了业务中共有的状态，独有状态通过参数传入享元类
class Flyweight {
    // 内在状态
    private sharedState: any;

    constructor(sharedState: any) {
        this.sharedState = sharedState;
    }

    // 外在状态
    public operation(uniqueState: any): void {
        const s = JSON.stringify(this.sharedState);
        const u = JSON.stringify(uniqueState);
        console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
    }
}

// 工厂类负责管理享元缓存池，新建享元时检查享元池，如果存在直接返回，不存在再新建一个享元对象
class FlyweightFactory {
    private flyweights: Record<string, Flyweight> = <any>{};

    constructor(initialFlyweights: string[][]) {
        for (const state of initialFlyweights) {
            this.flyweights[this.getKey(state)] = new Flyweight(state);
        }
    }

    private getKey(state: string[]): string {
        return state.join('_');
    }

    public getFlyweight(sharedState: string[]): Flyweight {
        const key = this.getKey(sharedState);

        if (!(key in this.flyweights)) {
            console.log('FlyweightFactory: Can\'t find a flyweight, creating new one.');
            this.flyweights[key] = new Flyweight(sharedState);
        } else {
            console.log('FlyweightFactory: Reusing existing flyweight.');
        }

        return this.flyweights[key];
    }

    public listFlyweights(): void {
        const count = Object.keys(this.flyweights).length;
        console.log(`\nFlyweightFactory: I have ${count} flyweights:`);
        for (const key in this.flyweights) {
            console.log(key);
        }
    }
}

// 客户端必须通过工厂来请求享元
const factory = new FlyweightFactory([
    ['Chevrolet', 'Camaro2018', 'pink'],
    ['Mercedes', 'C300', 'black'],
    ['Mercedes', 'C500', 'red'],
    ['BMW', 'M5', 'red'],
    ['BMW', 'X6', 'white'],
]);
factory.listFlyweights();

function addCarToPoliceDatabase(
    ff: FlyweightFactory, plates: string, owner: string,
    brand: string, model: string, color: string,
) {
    console.log('\nClient: Adding a car to database.');
    const flyweight = ff.getFlyweight([brand, model, color]);
    // The client code either stores or calculates extrinsic state and passes it to the flyweight's methods.
    flyweight.operation([plates, owner]);
}

addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'M5', 'red');

addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'X1', 'red');

factory.listFlyweights();