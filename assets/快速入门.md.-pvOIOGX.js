import{_ as e,c as o,o as t,U as a}from"./chunks/framework.VQh26TdT.js";const m=JSON.parse('{"title":"快速入门","description":"","frontmatter":{},"headers":[],"relativePath":"快速入门.md","filePath":"快速入门.md"}'),r={name:"快速入门.md"},n=a('<h1 id="快速入门" tabindex="-1">快速入门 <a class="header-anchor" href="#快速入门" aria-label="Permalink to &quot;快速入门&quot;">​</a></h1><h3 id="安装软件" tabindex="-1">安装软件 <a class="header-anchor" href="#安装软件" aria-label="Permalink to &quot;安装软件&quot;">​</a></h3><p>对于编写皓际大冒险的mod，我个人推荐使用Visual Stuido Code(简称VSCode)，当然使用文本簿之类的文本编辑器也是可以的。</p><p><a href="https://code.visualstudio.com/Download" target="_blank" rel="noreferrer">下载VSCode</a></p><p>点开下载链接后，选择适合自己的软件包下载并安装。如果不会下载安装的，推荐还是先学习一下计算机相关基础知识再来写MOD吧。</p><h3 id="第一个mod" tabindex="-1">第一个MOD <a class="header-anchor" href="#第一个mod" aria-label="Permalink to &quot;第一个MOD&quot;">​</a></h3><p>首先，我们来认识一下皓际大冒险的MOD是什么形式的。</p><p>和常规形式的需要编程的MOD不同，皓际大冒险的MOD是以JSON的形式储存的。JSON 指的是 JavaScript 对象表示法（<strong>J</strong>ava<strong>S</strong>cript <strong>O</strong>bject <strong>N</strong>otation），具有较为严格的格式。关于JSON的语法可以自行查看<a href="https://www.runoob.com/json/json-syntax.html" target="_blank" rel="noreferrer">JSON 语法 | 菜鸟教程 (runoob.com)</a>，在这里就不过多解释了。在皓际大冒险的MOD里，中文使用的是Unicode编码，关于Unicode是什么可以自行查看<a href="https://zhuanlan.zhihu.com/p/427488961" target="_blank" rel="noreferrer">Unicode、UTF-8、UTF-16 终于懂了 - 知乎 (zhihu.com)</a>。</p><p>说完了MOD的形式，接下来我们来说说MOD的结构：</p><p>MOD包含三个文件夹和一个txt文件<br> CM：物品配方<br>  └<code>物品配方</code><br> WSITEM：物品定义<br>  ├<code>物品定义</code><br>  └<code>物品贴图</code><br> WSAMMO：自定义弹幕<br>  └<code>弹幕信息</code><br> HGWSDATA.txt：物品实现<br></p><p>物品配方：物品的合成材料和数量是什么，合成物和合成物数量是什么，在什么工作站合成。</p><p>物品定义：物品的各种属性是什么，比如攻击力，物品ID，品质。</p><p>自定义弹幕：物品攻击的弹幕的属性，比如弹幕ID，弹幕的飞行速度，弹幕的触发方式。</p><p>说完了这些，你可能还是很懵，下面让我们来动手做一个MOD吧。</p>',14),c=[n];function s(d,p,i,_,h,l){return t(),o("div",null,c)}const u=e(r,[["render",s]]);export{m as __pageData,u as default};
