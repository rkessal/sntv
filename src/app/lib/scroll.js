function disableScroll() {
  document.body.classList.add("overflow-y-hidden");
}

function enableScroll() {
  console.log("enable");
  document.body.classList.remove("overflow-y-hidden");
}

export { disableScroll, enableScroll };
