// 外观模式
// 外观类提供了一种访问复杂系统的便捷接口; 


class File {

}

class CodeFactory {

}

class Mp4File {

}

class OggFile {

}

// 外观类直接访问一系列较为复杂的业务类
export class VideoConverter {

    convert(format: string) {
        const file = new File();
        const source = new CodeFactory();
        let res;
        if (format === 'mp4') {
            res = new Mp4File();
        } else {
            res = new OggFile();
        }
        return res;
    }

}

// 客户端只需要与外观类做交互，业务类的细节对客户端隐藏
const converter = new VideoConverter();
converter.convert('mp4');