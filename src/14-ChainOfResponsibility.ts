// 责任链模式

// 责任链模式是一种行为设计模式， 允许你将请求沿着处理者链进行发送。 收到请求后， 每个处理者均可对请求进行处理， 或将其传递给链上的下个处理者。
// 举例：多环节校验系统、报销审批

export abstract class Handler {

    protected nextHandler: Handler;

    public setNextHandler(handler: Handler) {
        this.nextHandler = handler;
    }

    public abstract process(info: number): void;
}

class Leader extends Handler {

    public process(info: number) {
        if (info > 0 && info <= 3) {
            console.log("processed By Leader", info);
        } else {
            this.nextHandler.process(info);
        }
    }
}

class Boss extends Handler {

    public process(info: number) {
        console.log("processed By Boss", info);
    }
}

// client

const level1 = new Leader();
const level2 = new Boss();
level1.setNextHandler(level2);

level1.process(1);
level1.process(5);
