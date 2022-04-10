// 桥接模式

// 桥接模式是一种结构型设计模式，通过关联的方式代替继承关系，降低类的个数；
// 优点：1. 单一指责：抽象接口和实现细节分离；
//      2. 开闭原则：新增抽象部分和实现部分，不会影响之前的类
//      3. 客户端只和抽象部门交互，无需知道实现细节（类比前端是抽象类，后端是实现类）
export class RemoteControl {
    // 将实现类传入抽象类
    protected device: Device;

    constructor(device: Device) {
        this.device = device;
    }

    togglePower() {
        if (this.device.isEnabled()) {
            this.device.disable();
        } else {
            this.device.enable();
        }
    }

    volumeDown() {
        this.device.setVolume(this.device.getVoleme() - 10);
    }

    volumeUp() {
        this.device.setVolume(this.device.getVoleme() + 10);
    }

    channelDown() {
        this.device.setChannel(this.device.getChannel() - 1);
    }

    channelUp() {
        this.device.setChannel(this.device.getChannel() + 1);
    }
}

class AdvancedRemoteControl extends RemoteControl {
    mute() {
        this.device.setVolume(0);
    }
}

interface Device {
    isEnabled(): boolean;
    enable(): void;
    disable(): void;
    getVoleme(): number;
    setVolume(val: number): void;
    getChannel(): number;
    setChannel(id: number): void;
}

class TV {

    status: boolean = true;
    volume: number = 0;
    channelCode: number = 1;

    isEnabled() {
        return this.status;
    };

    enable() {
        this.status = true;
    }

    disable() {
        this.status = false;
    }

    getVoleme() {
        return this.volume;
    }

    setVolume(val: number) {
        this.volume = val;
    };

    getChannel() {
        return this.channelCode;
    }

    setChannel(id: number) {
        this.channelCode = id;
    };
}

const tv = new TV();
const remote = new AdvancedRemoteControl(tv);
remote.volumeUp();
console.log(tv.getVoleme());