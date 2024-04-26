// ColorPickerProject
console.log("Color Picker")

const colorsM = document.getElementById("colors-m")
const selectScheme = document.getElementById("color-scheme-picker")
const colorInput = document.getElementById("color-input")
colorInput.classList.toggle("color-inp")
const switchAuto = document.getElementById("checkbox")
colorInput.value = "#F40A6B"
let colorArr = []

document.addEventListener("click", function (e) {
  if (e.target.id === "get-colors") {
    if (colorInput.disabled === false) {
      handleGetColorsClick(selectScheme.value, getHex())
    } else {
      handleGetColorsClick(selectScheme.value, getRandomHex())
    }
  } else if (e.target.dataset.share) {
    handleCopyClick(e.target.dataset.share)
  } else if (e.target.id === "switch") {
    if (e.target.checked === true) {
      colorInput.disabled = true
      colorInput.classList.toggle("color-inp")
    } else {
      colorInput.disabled = false
      colorInput.classList.toggle("color-inp")
    }
    console.log(e.target.checked)
  }
})

const handleGetColorsClick = (value = "monochrome", valueNd) => {
  fetch(`https://www.thecolorapi.com/scheme?hex=${valueNd}&mode=${value}`)
    .then(response => response.json())
    .then(data => {
      colorArr.push(data)
      test()
    })
}

handleGetColorsClick() //render or site start

const test = () => {
  if (colorArr.length == 1) {
    render()
  }
}

function getHex() {
  let color = colorInput.value
  let colorNew = color.slice(1)
  console.log(colorNew)
  return colorNew
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

function handleCopyClick(item) {
  const content = item
  navigator.clipboard.writeText(content)
}
