## v-stretch 拉伸指令
这是一个四角可拉伸的vue指令


+ 使用教程

>npm 安装
```
npm i v-stretch
```

>main.js 中引入
```
import 'v-stretch'
```


>嵌套元素可以指定类名className进行四角拉伸,最小宽度和最小高度可以传参进行设置


```
<div v-stretch="{ className: 'children', minWidth: 300, minHeight: 200 }">
    <p class="children"> 拉伸 </p>
</div>

```

>不是嵌套元素的拉伸，可以直接使用指令

```
<div v-stretch>

</div>

```

>指令传参

+ className,对指定class名的元素进行四角拉伸
+  minWidth,限制拉伸的最小宽度
+  minHeight,限制拉伸的最小高度
