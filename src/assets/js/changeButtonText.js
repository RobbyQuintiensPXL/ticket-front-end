function changeButtonText(label, name) {
  document.querySelector(label).onchange = function () {
    document.querySelector(name).textContent = this.files[0].name;
  }
}
