// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { ipcRenderer } = require('electron')
const title = "AI Trainer"
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
  //document.title = "Teachable Machine";
  document.querySelector('link[rel="shortcut icon"]').href = "";
  console.log(document.querySelector('#app-name'))
  const timer = setInterval(() => {
    if(document.getElementsByTagName('tm-hamburger-menu')[0].shadowRoot.getElementById('app-name')!= null){
      var tips = document.querySelector('.tips')
      var dot = document.querySelector('.dot')
      document.querySelector('#codelab-tips').removeChild(tips)
      document.querySelector('#codelab-tips').removeChild(dot)
      const homeBtn = document.createElement('li')
      homeBtn.setAttribute('role', 'button')
      homeBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17,10 L20,10 L10,0 L0,10 L3,10 L3,20 L17,20 L17,10 Z M8,14 L12,14 L12,20 L8,20 L8,14 Z" fill="#3C4043"></path>
      </svg> 主页`
      homeBtn.onclick = ()=>{
        window.history.go(-1)
      }

      const closeBtn = document.createElement('li')
      closeBtn.setAttribute('role', 'button')
      closeBtn.onclick = ()=> {
        ipcRenderer.send('close-win')
      }
      closeBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.4142136,10 L14.2426407,7.17157288 L12.8284271,5.75735931 L10,8.58578644 L7.17157288,5.75735931 L5.75735931,7.17157288 L8.58578644,10 L5.75735931,12.8284271 L7.17157288,14.2426407 L10,11.4142136 L12.8284271,14.2426407 L14.2426407,12.8284271 L11.4142136,10 L11.4142136,10 Z M2.92893219,17.0710678 C6.83417511,20.9763107 13.1658249,20.9763107 17.0710678,17.0710678 C20.9763107,13.1658249 20.9763107,6.83417511 17.0710678,2.92893219 C13.1658249,-0.976310729 6.83417511,-0.976310729 2.92893219,2.92893219 C-0.976310729,6.83417511 -0.976310729,13.1658249 2.92893219,17.0710678 L2.92893219,17.0710678 Z" fill="#3C4043"></path>
      </svg> 退出`
      document.getElementsByTagName('tm-hamburger-menu')[0].shadowRoot.getElementById('main-menu').children[0].children[0].remove()
      // document.getElementsByTagName('tm-hamburger-menu')[0].shadowRoot.getElementById('main-menu').children[3].remove()删除下面的代码
      document.getElementsByTagName('tm-hamburger-menu')[0].shadowRoot.getElementById('main-menu').children[0].appendChild(homeBtn)
      document.getElementsByTagName('tm-hamburger-menu')[0].shadowRoot.getElementById('main-menu').children[0].appendChild(closeBtn)
      document.getElementsByTagName('tm-hamburger-menu')[0].shadowRoot.getElementById('app-name').innerText = title
      document.querySelector('#debug-info').remove()
      clearInterval(timer)
    }
    // if (document.getElementsByName('tm-hamburger-menu').shadowRoot.getElementById('app-name') != null) {
    //   console.log(document.getElementsByName('tm-hamburger-menu'))
    //   document.getElementsByTagName('tm-hamburger-menu').shadowRoot.getElementById('app-name').remove()
//       
//       var appName = document.querySelector('#app-name')
//       console.log(tips)
//       
//       // document.querySelector('tm-hamburger-menu').remove()
//       document.querySelector('#menu-holder').removeChild(appName)
//       document.querySelector('#debug-info').remove()
//       const wrap = document.createElement('div')
//       wrap.style = `position: absolute;
//       top: 2rem;
//       left: 2rem;
//       z-index: 2147483647;
//       display: flex;`
//       const home = `<tm-button label="首页">  
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/></svg>
// </tm-button>`
//       wrap.innerHTML = home
//       wrap.onclick = () => {
//         window.history.back()
//       }
//       document.querySelector('#codelab-tips').parentElement.insertBefore(wrap, document.querySelector('#codelab-tips'))
      //clearInterval(timer)
    //}
  }, 100)


})