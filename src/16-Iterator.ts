// 迭代器模式

// 集合是按一定规则储存对象（树、队列等）的容器，迭代器模式能在不暴露集合表现形式的情况下遍历集合所有元素
// 迭代器模式将集合的遍历行为抽取为单独的迭代器对象

// 迭代器需实现相同的接口
interface Iterator<T> {
    getCurrent(): T;

    getNext(): T;

    getKey(): number;

    valid(): boolean;

    rewind(): void;
}

// 具体的集合类需要实现的接口
interface Aggregator {
    getIterator(): Iterator<string>;
}

// 具体迭代器
class AlphabeticalOrderIterator implements Iterator<string> {

    private collection: WordsCollection;

    private position: number = 0;

    private reverse: boolean = false;

    constructor(collection: WordsCollection, reverse: boolean = false) {
        this.collection = collection;
        this.reverse = reverse;
        if (reverse) {
            this.position = collection.getCount() - 1;
        }
    }

    public rewind() {
        this.position = this.reverse ?
            this.collection.getCount() - 1 :
            0;
    }

    public getCurrent(): string {
        return this.collection.getItems()[this.position];
    }

    public getKey(): number {
        return this.position;
    }

    public getNext(): string {
        const item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1;
        return item;
    }

    public valid(): boolean {
        if (this.reverse) {
            return this.position >= 0;
        }

        return this.position < this.collection.getCount();
    }

}

// 具体集合
class WordsCollection implements Aggregator {
    private items: string[] = [];

    public getItems(): string[] {
        return this.items;
    }

    public getCount(): number {
        return this.items.length;
    }

    public addItem(item: string): void {
        this.items.push(item);
    }

    public getIterator(): Iterator<string> {
        return new AlphabeticalOrderIterator(this);
    }

    public getReverseIterator(): Iterator<string> {
        return new AlphabeticalOrderIterator(this, true);
    }
}

// client
const collection = new WordsCollection();
collection.addItem('First');
collection.addItem('Second');
collection.addItem('Third');

const iterator = collection.getIterator();

console.log('Straight traversal:');
while (iterator.valid()) {
    console.log(iterator.getNext());
}

console.log('');
console.log('Reverse traversal:');
const reverseIterator = collection.getReverseIterator();
while (reverseIterator.valid()) {
    console.log(reverseIterator.getNext());
}