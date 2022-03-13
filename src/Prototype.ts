// 原型

// 目的：复制已有对象, 而又无需使代码依赖它们所属的类。
// 困难：外部访问已有对象时，对象可能包含私有变量，必须知道对象所属的类，实例化新的对象并复制成员变量；
// 方法：将复制过程委派给被克隆的对象；
// 类比：prototype相当于DNA，clone函数相当于细胞有丝分裂的过程

// 基础原型
interface Prototype {
    clone(): Prototype;
}

// 具体原型
class Rectangle implements Prototype {

    x: number;
    y: number;
    color: string;

    constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    getInfo() {
        console.log(this.x, this.y, this.color)
    }

    clone() {
        return Object.create(this);
    }

}

const rec1 = new Rectangle(1, 2, "#fff");
rec1.getInfo();
const rec2 = rec1.clone();
rec1.color = "#000";  // 修改原来的对象不影响克隆对象
rec2.getInfo();



