// 状态模式
// 程序在任意时刻仅可处于几种有限的状态中。 在任何一个特定状态中， 程序的行为都不相同， 且可瞬间从一个状态切换到另一个状态。 

export class Document {

    private state: State = new Draft(this);

    public changeState(state: State) {
        this.state = state;
    }

    public render() {
        this.state.render();
    }

    public publish() {
        this.state.publish();
    }

}

abstract class State {

    protected context: Document;

    constructor(docu: Document) {
        this.context = docu;
    }

    abstract render(): void;

    abstract publish(): void;

}

class Draft extends State {

    render() {
        console.log('render draft');
    }

    publish() {
        console.log('publish draft')
    }

}


class Moderation extends State {

    render() {
        console.log('render moderation');
    }

    publish() {
        console.log('publish moderation')
    }

}

class Published extends State {

    render() {
        console.log('render Published');
    }

    publish() {
        console.log('publish Published')
    }

}

const docu = new Document();
docu.render();
docu.publish();
docu.changeState(new Moderation(docu));
docu.render();
docu.publish();




