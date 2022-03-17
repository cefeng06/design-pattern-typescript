// 组合模式
// 你可以使用它将对象组合成树状结构， 并且能像使用独立对象一样使用它们。


// 组件接口会声明组合中简单和复杂对象的通用操作, 供客户端调用
interface Graphic {
    move(x: number, y: number): void;
    draw(): void;
}

// 叶节点
class Dot implements Graphic {

    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    move(x: number, y: number) {
        this.x += x;
        this.y += y;
    }

    draw() {

    }
}

// 叶节点
class Circle extends Dot {

    private radius: number;
    x: number;
    y: number;

    constructor(radius: number, x: number, y: number) {
        super(x, y);
        this.radius = radius;
        this.x = x;
        this.y = y;
    }

    draw() {

    }

}

// 父节点，包含多个子节点，自身并不完成具体工作， 而是将请求递归地传递给自己的子项目
class CompoundGraphic implements Graphic {

    children: Graphic[];

    add(child: Graphic) {
        this.children.push(child);
    }

    remove(child: Graphic) {
        const index = this.children.indexOf(child);
        this.children.splice(index, 1);
    }

    move(x: number, y: number) {
        for (let item of this.children) {
            item.move(x, y);
        }
    }

    draw() {

    }
}

class Client {

    all: CompoundGraphic;

    load() {
        this.all = new CompoundGraphic;
        this.all.add(new Dot(1, 2));
        this.all.add(new Circle(5, 1, 2));
    }
}

