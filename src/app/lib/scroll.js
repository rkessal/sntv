function disableScroll()  {
  document.body.classList.add('overflow-y-hidden')
}

function enableScroll() {
  document.body.classList.remove('overflow-y-hidden')
}

export { disableScroll, enableScroll }