// 观察者模式

// 允许你定义一种订阅机制(一对多)， 可在对象事件发生时通知多个 “观察” 该对象的其他对象。
// 和发布订阅的区别是，观察者只有两者，发布订阅有中间人

interface Subscriber {
    update(): void;
}

interface Publisher {

    subscribers: Subscriber[];

    addSubs(user: Subscriber): void;

    removeSubs(user: Subscriber): void;

    notify(): void;
}

export class Media implements Publisher {

    subscribers: Subscriber[] = [];

    public addSubs(user: Subscriber) {
        this.subscribers.push(user);
    }

    public removeSubs(user: Subscriber) {
        const index = this.subscribers.indexOf(user);
        if (index > -1) this.subscribers.splice(index, 1);
    };

    public notify() {
        this.subscribers.forEach((user) => user.update());
    };

}

export class User implements Subscriber {
    public update() {
        console.log('Content Update')
    }
}

const u1 = new User();
const u2 = new User();
const media = new Media();
media.addSubs(u1);
media.notify();
media.addSubs(u2);
media.notify();


