// 代理模式

// 为其他对象提供一种代理以控制对这个对象的访问
// 与外观模式类似，但是代理和服务对象遵循同一套接口，似的自己和服务对象可以互换

interface Service {
    doSomething(): void;
}

class RealService implements Service {

    public doSomething() {
        console.log("service work");
    }

}

class ProxyService implements Service {

    protected service: RealService;

    constructor(service: RealService) {
        this.service = service;
    }

    public doSomething() {
        this.connect();
        this.service.doSomething();
        this.log();
    }

    private connect() {
        console.log("connect");
    }

    private log() {
        console.log("log");
    }

}

// client
const service = new RealService();
const proxy = new ProxyService(service);
proxy.doSomething();