// 适配器模式

// 通过适配器作为一层中介，能使接口不兼容的对象能够相互合作，如数据结构转换。
// 优点：1. 单一职责原则，可以将接口或数据转换代码从程序主要业务逻辑中分离。
//      2. 添加多个适配器可以适应不同接口
// 缺点：代码复杂度增大


// 假设有两个接口相互兼容的类：圆孔（Round­Hole）和圆钉（Round­Peg）。
class RoundHole {

    radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    fits(peg: RoundPeg) {
        return this.radius >= peg.getRadius();
    }

}

class RoundPeg {

    radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    getRadius() {
        return this.radius;
    }

}

// 但还有一个不兼容的类：方钉（Square­Peg）。
class SquarePeg {

    width: number;

    constructor(width: number) {
        this.width = width;
    }

    getWidth() {
        return this.width;
    }
}

// 适配器类能够将方钉放入圆孔中。它会对 RoundPeg 类进行扩展，以接收适配器作为peg对象
class SquarePegAdapter extends RoundPeg {

    peg: SquarePeg;

    constructor(peg: SquarePeg) {
        super(peg.getWidth());
        this.peg = peg;
    }

    getRadius() {
        return this.peg.getWidth() * Math.sqrt(2) / 2;
    }

}

const rhole = new RoundHole(5);
const rpeg = new RoundPeg(5);
console.log(rhole.fits(rpeg));

const speg = new SquarePeg(8);
const adaper = new SquarePegAdapter(speg);
console.log(rhole.fits(adaper));