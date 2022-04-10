// 装饰器模式
// 通过将对象放入包含行为的特殊封装对象中,来为原对象绑定新的行为。
// 优点：无需创建新的子类就可以扩展对象的行为，可以在运行时添加或删除对象的功能，可以用多个装饰器组合行为，实现了单一指责；
// 缺点：删除装饰器不方便，实现行为不受装饰栈顺序影响的装饰比较困难。

// 接口定义的组件基本行为
interface DataSource {
    writeData(data: string): void;
    readData(): string;
}

// 组件实现接口
export class FileDateSource implements DataSource {

    protected data: string[] = [];

    writeData(data: string) {
        this.data.push(data);
    }

    readData() {
        return this.data.join(',');
    }

}

// 装饰基类和其他组件遵循相同的接口。
// 该类的主要任务是定义所有具体装饰的封装接口。
class BaseDecorator implements DataSource {

    protected wrappee: DataSource;

    constructor(source: DataSource) {
        this.wrappee = source;
    }

    writeData(data: string) {
        this.wrappee.writeData(data);
    }

    readData() {
        return this.wrappee.readData();
    }

}

// 具体装饰器拓展行为
class EncryptionDecorator extends BaseDecorator {

    writeData(data: string) {
        this.wrappee.writeData(data + 'encrypted')
    }

    // readData() {
    //     const res = this.wrappee.readData();
    //     return res.split(',').map(item => {
    //         if (item.indexOf('encrypted') > -1) {
    //             return item.substr(0, item.indexOf('encrypted'));
    //         } else {
    //             return item;
    //         }
    //     }).join(',');
    // }

}

class CompressionDecorator extends BaseDecorator {

    writeData(data: string) {
        this.wrappee.writeData(data + 'compressed')
    }

    // readData() {
    //     const res = this.wrappee.readData();
    //     return res.split(',').map(item => {
    //         if (item.indexOf('compressed') > -1) {
    //             return item.substr(0, item.indexOf('compressed'));
    //         } else {
    //             return item;
    //         }
    //     }).join(',');
    // }

}

// 客户端
let source: FileDateSource | BaseDecorator = new FileDateSource();
source.writeData("data-1");

console.log(source.readData()); //data-1
// Decorator相当于一个栈结构，EncryptionDecorator和CompressionDecorator先后入栈

source = new EncryptionDecorator(source);
source.writeData("data-2");
console.log(source.readData()); //data-1,data-2encrypted

source = new CompressionDecorator(source);
source.writeData("data-3");
console.log(source.readData()); //data-1,data-2encrypted,data-3compressedencrypted




