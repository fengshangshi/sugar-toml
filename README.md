#sugar-toml

sugar2.0框架的配置文件组件，TOML不了解的可以自行百度。

##API
###load()

会做两个事情：

1. 加载指定的文件
2. 解析toml文件，转化成JSON

```
const toml = require('sugar-toml');
const config = toml.load('./index.toml');
console.log(config);
```

###parse()
这个API假定你已经有一个toml的格式的字符串，用这个api来解析：

```
const fs = require('fs');
const source = fs.readFileSync('./index.toml', {encoding: 'utf8'});
const config = toml.parse(source);
console.log(config);
```