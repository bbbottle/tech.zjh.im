---
title: 卡片菜单
date: 2020/12/24
author: zjh
description: zjh.im 主要交互行为实现。
type: post
---

# 卡片菜单

zjh.im 的页面切换交互由[页面菜单](https://github.com/bbbottle/page-menu)组件负责。灵感来自于 2015 年在一个交互设计博客看到的 GIF（见下图），动图演示了 [Gal Shir](https://galshir.com/about) 提出的「卡片菜单」概念。卡片菜单跟现实生活中的食物模型菜单有微妙的相似之处。都近乎所见即所得，降低了受众在菜单上的中间概念和对应实物之间建立联系的成本。当时被这个想法吸引，用原生 JS 实现过，后来接触 React，也用 React 实现过。由于 Web 端大部分情况下，屏幕朝向为水平方向，因此，实现时把菜单项退出行为改为了底部退出。本文记录 react 版本实现思路。内容主要分为状态管理部分和渲染部分。
![tumblr_nywebilgeJ1stn28do1_1280.gif](/images/cards-menu.gif)
## 状态管理
下图展示的是菜单「关闭」、「开启」、「选中」三个关键状态。


![example (3).png](/images/menu-status.png)
菜单状态并不复杂，状态转移表：

| 当前状态 / 用户输入 | 点击图标 | 选中第 i 页 |
| --- | --- | --- |
| 关闭 | 开启 / 展开页面 & 隐藏图标 |  |
| 开启 |  | 选中 i / 展示选中页 & 展示图标 |
| 选中 i | 开启 / 恢复页面 & 隐藏图标 |  |

其中 i 为正整数。行列相交单元格中的内容表示下一个状态及其对应输出。页数是有限的，可以使用[有限状态机](https://en.wikipedia.org/wiki/Finite-state_machine#Concepts_and_terminology)模型来描述整个交互。该状态机

1. 初始态为：关闭状态
1. 输入集为：点击图标，选中第 1 页，第 2 页，……第 i 页……
1. 状态集为：关闭、开启、选中第 1 页，第 2 页，……第 i 页……
1. 状态转移函数：
   1. 把上述表格中的信息，根据当前状态和用户输入构造 key，以下一个状态为 value 存入 map 中
   1. 根据当前状态和用户输入从上述 map 中取出结果作为返回
5. 输出函数：
   1. 输出仅跟当前状态有关
   1. 需要三个变量表示输出状态：菜单是否开启、图标是否隐藏、当前选中菜单
   1. 根据状态转移表可知，输入只有开启和选中两种情况，实现起来也很简单
### 组件状态
在构造函数中初始化状态机，以及组件状态。用一个状态变量保存状态机当前状态，剩余的保存状态机输出状态。当用户输入时，可以这样转移组件状态：
```javascript
// 组件的状态转移函数
transition = (input) => {
  const currentState = this.state.currentState;
  const nextState = this.fsm.transition(currentState, input);
  
  if (nextState === undefined) { return; }

  const output = this.fsm.output(nextState);
  this.setState({ currentState, ...output });
}

handleIconClick = () => { this.transition('click_icon'); }
handlePageClick = (index) => { this.transition(index); }
```
可以看到，用状态机保存状态转移等关键信息后，组件的状态管理、用户输入处理变得很简洁。
## 渲染

1. ICON 的显示隐藏，可根据状态变量为对应元素设置不同可见性样式。
1. 菜单的各关键状态区别主要在于菜单项的位置
   1. 菜单容器相对定位
   1. 菜单项绝对定位，根据组件状态变量足够生成不同的定位样式
   1. 最后加上缓动效果注入灵魂
