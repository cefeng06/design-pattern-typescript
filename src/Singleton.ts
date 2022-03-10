// 单例模式

// 保证一个类只有一个实例，而且可以自行实例化并向整个系统提供这个实力
// 如果程序中的某个类对于所有客户端只有一个可用的实例, 可以使用单例模式，如序号生成器、Web页面计数器。
// 如果你需要更加严格地控制全局变量，可以使用单例模式。
export class Singleton {
    /** 唯一实例 */
    private static _instance: Singleton;

    /** 构造函数必须私有防止外部new Singleton */
    private constructor() {

    }

    /** 获取实例的单一接口 */
    public static getInstance(): Singleton {
        if (!this._instance) {
            this._instance = new Singleton();
        }
        return this._instance;
    }

    /** 业务逻辑 */
    public someBusinessLogic() {

    }
}

function clientCode() {
    const ins1 = Singleton.getInstance();
    const ins2 = Singleton.getInstance();
    if (ins1 === ins2) {
        console.log('Singleton works, both variables contain the same instance.');
    } else {
        console.log('Singleton failed, variables contain different instances.');
    }
}

clientCode();