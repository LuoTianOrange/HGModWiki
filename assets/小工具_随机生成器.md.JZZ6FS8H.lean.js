import{_ as f,h as s,D as h,c as x,I as d,w as _,m as a,t as p,a as l,o as V}from"./chunks/framework.BgsdwyI6.js";const b={setup(){const i=["酸辣土豆丝","西红柿炒蛋","辣椒炒肉","麻辣豆腐","香干肉丝","红烧鲫鱼","干煸四季豆","韭菜炒蛋","拍黄瓜","日本豆腐汤","豆米萝卜干","外婆菜","清炒藕片","辣子鸡丁","宫保鸡丁","红烧肉","火锅肉","冬瓜汤","小白菜炖豆腐","西兰花炒肉","豌豆炒肉","鸡蛋炒丝瓜","毛菜","酸菜炒肉","炒三鲜","辣子鸡丁","酱爆茄子","西蓝花","莴笋炒肉","白切鸡","糖醋排骨","芝麻汤圆","云吞面"],o=s("快来试试吧！"),c=s(0),e=s(0),m=s(0);function u(){const t=Math.floor(Math.random()*i.length);o.value=i[t]}function r(){const t=parseInt(c.value,10),n=parseInt(e.value,10);m.value=Math.floor(Math.random()*(n-t+1))+t}return{chosenFood:o,chooseFood:u,minValue:c,maxValue:e,randomNumber:m,generateRandomNumber:r}}},w=JSON.parse('{"title":"随机生成器","description":"","frontmatter":{},"headers":[],"relativePath":"小工具/随机生成器.md","filePath":"小工具/随机生成器.md"}'),g=a("h1",{id:"随机生成器",tabindex:"-1"},[l("随机生成器 "),a("a",{class:"header-anchor",href:"#随机生成器","aria-label":'Permalink to "随机生成器"'},"​")],-1),k=a("h3",{id:"今天吃什么",tabindex:"-1"},[l("今天吃什么 "),a("a",{class:"header-anchor",href:"#今天吃什么","aria-label":'Permalink to "今天吃什么"'},"​")],-1),y=a("h3",{id:"随机数生成器",tabindex:"-1"},[l("随机数生成器 "),a("a",{class:"header-anchor",href:"#随机数生成器","aria-label":'Permalink to "随机数生成器"'},"​")],-1),N=a("label",null,"最小值",-1),v=a("label",null,"最大值",-1);function C(i,o,c,e,m,u){const r=h("el-button"),t=h("el-input");return V(),x("div",null,[g,k,d(r,{type:"primary",onClick:e.chooseFood,style:{"margin-top":"20px"}},{default:_(()=>[l("今天吃什么")]),_:1},8,["onClick"]),a("p",null,p(e.chosenFood),1),y,a("p",null,[N,d(t,{modelValue:e.minValue,"onUpdate:modelValue":o[0]||(o[0]=n=>e.minValue=n),placeholder:"输入最小值",class:"w-50 m-2",size:"large",maxlength:"10",type:"text"},null,8,["modelValue"]),v,d(t,{modelValue:e.maxValue,"onUpdate:modelValue":o[1]||(o[1]=n=>e.maxValue=n),placeholder:"输入最大值",class:"w-50 m-2",size:"large",maxlength:"10",type:"text"},null,8,["modelValue"])]),d(r,{type:"primary",onClick:e.generateRandomNumber,style:{"margin-top":"20px"}},{default:_(()=>[l("生成随机数")]),_:1},8,["onClick"]),a("p",null,"结果："+p(e.randomNumber),1)])}const F=f(b,[["render",C]]);export{w as __pageData,F as default};
