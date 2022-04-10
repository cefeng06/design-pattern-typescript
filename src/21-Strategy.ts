// 策略模式
// 策略模式是一种行为设计模式， 它能让你定义一系列算法， 并将每种算法分别放入独立的类中， 以使算法的对象能够相互替换。

interface Strategy {
    execute(a: number, b: number): number;
}

class Add implements Strategy {
    execute(a: number, b: number) {
        return a + b;
    }
}

class Substract implements Strategy {
    execute(a: number, b: number) {
        return a - b;
    }
}

class Mutiply implements Strategy {
    execute(a: number, b: number) {
        return a * b;
    }
}

export class Context {

    private strategy: Strategy = new Add();

    setStrategy(s: Strategy) {
        this.strategy = s;
    }

    execute(a: number, b: number) {
        return this.strategy.execute(a, b);
    }

}

const context = new Context()
console.log(context.execute(1, 2));
context.setStrategy(new Mutiply());
console.log(context.execute(1, 2));
