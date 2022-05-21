class Dep { // 订阅池
  constructor(name) {
    this.subs = [] //该事件下被订阅对象的集合
  }
  defined(watch) {
    this.subs.push(watch)
  }
  notify() { //通知订阅者有变化
    console.log('this.subs',this.subs)
    this.subs.forEach((e, i) => {
      if (typeof e.update === 'function') {
        try {
          e.update.apply(e) //触发订阅者更新函数
        } catch (err) {
          console.error(err)
        }
      }
    })
  }
}

class Watch {
  constructor(name, fn) {
    this.name = name; //订阅消息的名称
    this.callBack = fn; //订阅消息发送改变时->订阅者执行的回调函数     
  }
  add(dep) { //将订阅者放入dep订阅池
    dep.subs.push(this);
  }
  update() { //将订阅者更新方法
    var cb = this.callBack; //赋值为了不改变函数内调用的this
    cb(this.name);
  }
}

function addMethod() {
  let historyDep = new Dep();
  return function (name) {
    if (name === 'historychange') {
      return function (name, fn) {
        let event = new Watch(name, fn)
        historyDep.defined(event);
      }
    } else if (name === 'pushState' ) {
      let method = history[name];
      return function () {
        console.log('pushState','arguments',arguments[2])
        method.apply(history, arguments);
        historyDep.notify();
      }
    }else if ( name === 'replaceState') {
      let method = history[name];
      return function () {
        console.log('replaceState','arguments',arguments[2])
        method.apply(history, arguments);
        historyDep.notify();
      }
    }

  }
}
         

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
  
})

document.addEventListener('DOMContentLoaded', () => {
  document.title = "Teachable Machine";
  document.querySelector('link[rel="shortcut icon"]').href = "";
  const timer = setInterval(() => {
    if (document.querySelector('#codelab-tips') != null) {
      document.querySelector('#codelab-tips').removeChild(document.querySelector('.tips'))
      document.querySelector('#codelab-tips').removeChild(document.querySelector('.dot'))
      document.querySelector('tm-hamburger-menu').remove()
      document.querySelector('#debug-info').remove()
      const wrap = document.createElement('div')
      wrap.style = `position: absolute;
      top: 2rem;
      left: 2rem;
      z-index: 2147483647;
      display: flex;`
      const home = `<tm-button label="首页">  
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/></svg>
</tm-button>`
      wrap.innerHTML = home
      wrap.onclick = ()=>{
        window.history.back()
      }
  document.querySelector('#codelab-tips').parentElement.insertBefore(wrap, document.querySelector('#codelab-tips'))
      clearInterval(timer)
    }
  }, 1)
  
  
})