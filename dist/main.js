// ColorPickerProject
console.log("Color Picker")

const colorsM = document.getElementById("colors-m")
const selectScheme = document.getElementById("color-scheme-picker")
let colorArr = []

document.addEventListener("click", function (e) {
  if (e.target.id === "get-colors") {
    handleGetColorsClick(selectScheme.value)
  } else if (e.target.dataset.share) {
    handleCopyClic(e.target.dataset.share)
  }
})

const handleGetColorsClick = (value = "triad") => {
  fetch(`https://www.thecolorapi.com/scheme?hex=${getRandomHex()}&mode=${value}`)
    .then(response => response.json())
    .then(data => {
      colorArr.push(data)
      test()
    })
}

handleGetColorsClick()

const test = () => {
  if (colorArr.length == 1) {
    render()
  }
}

function getRandomHex() {
  const letters = "0123456789ABCDEF".split("")
  let color = ""
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const render = () => {
  const postMap = colorArr
    .map(item => {
      const hexMap = item.colors
        .map(item2 => {
          const hex = item2.hex
          const colorsModule = `
        <div data-share=${hex.value} style="background-color:${hex.value};" class="color-div flex justify-center items-center">
            <p data-share=${hex.value} class="font-medium tracking-wider">${hex.value}</p>
        </div>
        `
          return colorsModule
        })
        .join("")
      return hexMap
    })
    .join("")
  colorsM.innerHTML = postMap
  colorArr = []
}

function handleCopyClic(item) {
  const content = item
  navigator.clipboard.writeText(content)
}
