// 备忘录模式

// 在不暴露对象实现细节的情况下保存和恢复对象之前的状态，实现对象快照


// 编辑器类（包含私有或受保护的变量内容，和编辑输出的方法）
export class Editor {

    private text: string;

    private history: History;

    constructor() {
        this.text = '';
        this.history = new History();
    }

    public save() {
        const backup = new Backup(this.text);
        this.history.add(backup);
    }

    public resume() {
        const backup = this.history.get()
        if (backup) {
            this.text = backup.content;
        }
    }

    public change(text: string) {
        this.text = text;
    }

    public print() {
        console.log(this.text);
    }
}

/** 备忘录接口 */
interface Memento {

}

/** 备忘录类 */
class Backup implements Memento {

    content: string;

    constructor(text: string) {
        this.content = text;
    }
}

/** 备忘录栈 */
class History {

    public record: Backup[] = [];

    public add(backup: Backup) {
        this.record.push(backup);
    }

    public get() {
        return this.record.pop();
    }

}

const editor = new Editor();
editor.change('****1111');
editor.print();
editor.change('****2222');
editor.save();
editor.print();
editor.change('****3333');
editor.print();
editor.resume();
editor.print();

