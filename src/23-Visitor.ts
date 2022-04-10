// 访问者模式

// 访问者模式用来将对象和算法分离
// 如果你需要对一个复杂对象结构 （例如对象树） 中的所有元素执行某些操作， 可使用访问者模式



// 元素接口声明了一个`accept（接收）`方法，它会将访问者基础接口作为一个参数。
export interface Shape {
    move(x: number, y: number): void;
    render(): void;
    accept(v: Visitor): void;
}

// 访问者接口声明了一组与元素类对应的访问方法。访问方法的签名能让访问者准确辨别出与其交互的元素所属的类。
interface Visitor {
    visitDot(d: Dot): void;
    visitCircle(c: Circle): void;
}

// 每个具体元素类都必须以特定方式实现`accept`方法，使其能调用相应元素类的访问者方法。
class Dot implements Shape {

    move(x: number, y: number) {

    }

    render() {

    }

    accept(v: Visitor) {
        v.visitDot(this);
    }
}

class Circle implements Shape {

    move(x: number, y: number) {

    }

    render() {

    }

    accept(v: Visitor) {
        v.visitCircle(this);
    }
}

class XMLExportVisitor implements Visitor {

    visitDot(d: Dot) {
        console.log("visit dot")
    }

    visitCircle(c: Dot) {
        console.log("visit circle")
    }
}

// client

const visitor = new XMLExportVisitor();
const shapes: Shape[] = [new Dot(), new Circle()];
shapes.forEach(shape => shape.accept(visitor));