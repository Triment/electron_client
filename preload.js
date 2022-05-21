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
  //document.title = "Teachable Machine";
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