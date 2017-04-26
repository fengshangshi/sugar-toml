# sugar-toml

sugar2.0框架的配置文件组件，TOML不了解的可以自行百度。

## API


### file2json(file)

会做两个事情：

1. 加载指定的文件
2. 解析toml文件，转化成JSON

```
const toml = require('sugar-toml');
const config = toml.file2json('index.toml');
console.log(config);

```

### file2json(file, callback)
file2json的异步版本，callback使用如下：

```
toml.file2json('index.toml', (err, source) => {
	if (err) {
		// 做点啥
	}	
	console.log(source);
});

```
callback参数说明：

* err - 读取文件的错误信息，正常时为null
* source - 读取解析之后的JSON对象，异常时为null


### toml2json(source)
这个API假定你已经有一个toml的格式的字符串，用这个api来解析：

```
const fs = require('fs');
const source = fs.readFileSync('./index.toml', {encoding: 'utf8'});
const config = toml.toml2json(source);
console.log(config);
```

### json2toml(source)
会把json转化成toml字符创，如下：

```
let json = {
	date: new Date(), 
	arr: [1, 2, 3], 
	obj: {
		num: 123,
		a: {
			a_b: 1, 
			a_c: 2,
		}
	}
};
var tomlAsString = toml.json2toml(json); 
//'arr = [1,2,3]\ndate = 2017-04-25T14:04:24Z\n[obj]\nnum = 123\n[obj.a]\na_b = 1\na_c = 2\n'

console.log(tomlAsString);
/*
arr = [1,2,3]
date = 2017-04-25T14:04:24Z
[obj]
num = 123
[obj.a]
a_b = 1
a_c = 2
*/
```

### json2file(source, file)

会做两个事情：

1. 将json转化成toml字符创
2. 写入到指定的file文件中

```
var isWrited = toml.json2file(json, './config.toml'); 
console.log(isWrited); // true || error

```

### json2file(source, file, callback)

json2file的异步版本，callback返回err状态，无异常为null
