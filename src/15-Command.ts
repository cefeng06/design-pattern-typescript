// 命令模式

// 发送者（创建并执行命令，将命令绑定给UI层）
// 命令（调用接收者的方法执行业务逻辑） 
// 接收者（定义业务逻辑方法提供接口供命令调用）
// 优点：可以实现撤销/恢复、可以实现操作的延迟执行，可以把一组简单命令整合成一组复杂命令

// 命令的基类为所有具体命令提供接口
export abstract class Command {

    protected app: Application;
    protected editor: Editor;
    protected backup: string;

    constructor(app: Application, editor: Editor) {
        this.app = app;
        this.editor = editor;
    }
    // 备份编辑器状态
    saveBackup() {
        this.backup = this.editor.text
    }

    // 恢复编辑器状态
    undo() {
        this.editor.text = this.backup;
    }

    abstract execute(): boolean;

}

class CopyCommand extends Command {
    execute() {
        this.app.clipboard = this.editor.getSelection();
        return false;
    }
}

class CutCommand extends Command {
    execute() {
        this.saveBackup();
        this.app.clipboard = this.editor.getSelection();
        this.editor.deleteSelection();
        return true;
    }
}

class PasteCommand extends Command {
    execute() {
        this.saveBackup();
        this.editor.replaceSelection(this.app.clipboard);
        return true;
    }
}

// 撤销命令的接收者是app
class UndoCommand extends Command {
    execute() {
        this.app.undo();
        return false;
    }
}

// 编辑器作为命令的接收者
class Editor {
    text: string;

    getSelection() {
        return ''
    }

    deleteSelection() {

    }

    replaceSelection(text: string) {

    }
}

// App担任命令的发送者，创建并执行命令对象
class Application {
    clipboard: string;
    editors: Editor[];
    activeEditor: Editor;
    history: CommandHistory;
    btn: HTMLElement;

    // 将命令分配给UI对象
    createUI() {
        this.btn.onclick = this.copy;
    }

    copy() {
        const c = new CopyCommand(this, this.activeEditor);
        this.executeCommand(c);
    }

    executeCommand(c: Command) {
        if (c.execute()) {
            this.history.push(c);
        }
    }

    undo() {
        const c = this.history.pop();
        if (c) c.undo();
    }

}

class CommandHistory {
    private history: Command[];

    push(c: Command) {
        this.history.push(c)
    }

    pop() {
        return this.history.pop();
    }

}