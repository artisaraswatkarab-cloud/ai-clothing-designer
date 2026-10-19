
const form = document.getElementById("design-form");
const clothing = document.getElementById("clothing");
const style = document.getElementById("style");
const occasion = document.getElementById("occasion");
const details = document.getElementById("details");

const colorName = document.getElementById("color-name");
const previewTitle = document.getElementById("preview-title");
const previewArt = document.getElementById("preview-art");
const garmentSymbol = document.getElementById("garment-symbol");
const paletteDot = document.getElementById("palette-dot");
const paletteText = document.getElementById("palette-text");
const previewOccasion = document.getElementById("preview-occasion");
const resultBox = document.getElementById("result-box");
const copyBtn = document.getElementById("copy-btn");

let selectedColor = "Black";
let generatedBrief = "";

const colors = {
  "Black": {
    hex: "#202020", background: "#e6e4dc", text: "#34352b"
  },
  "Ivory": {
    hex: "#eee6d6", background: "#f0e8dc", text: "#a89a82"
  },
  "Olive green": {
    hex: "#777d50", background: "#e6e8d9", text: "#626a40"
  },
  "Burgundy": {
    hex: "#7c243c", background: "#eee1e3", text: "#7c243c"
  },
  "Powder blue": {
    hex: "#9ab9d3", background: "#e0eaf0", text: "#638ca9"
  },
  "Chocolate brown": {
    hex: "#78513e", background: "#ece2da", text: "#78513e"
  }
};

const symbols = {
  "Dress": "♙",
  "T-shirt": "✳",
  "Jacket": "✦",
  "Hoodie": "◇",
  "Kurta": "❋",
  "Co-ord set": "❖",
  "Formal suit": "♧"
};

function updatePreview() {
  const color = colors[selectedColor];

  previewTitle.textContent = `The ${style.value} ${clothing.value}`;
  previewArt.style.backgroundColor = color.background;
  garmentSymbol.style.color = color.text;
  garmentSymbol.textContent = symbols[clothing.value];
  paletteDot.style.backgroundColor = color.hex;
  paletteText.textContent = `${selectedColor} palette`;
  colorName.textContent = selectedColor;
  previewOccasion.textContent = occasion.value;
}

document.querySelectorAll(".swatch").forEach((button) => {
  button.addEventListener("click", () => {
    selectedColor = button.dataset.color;

    document.querySelectorAll(".swatch").forEach((swatch) => {
      const active = swatch === button;
      swatch.classList.toggle("active", active);
      swatch.setAttribute("aria-pressed", String(active));
    });

    updatePreview();
  });
});

[clothing, style, occasion].forEach((element) => {
  element.addEventListener("change", updatePreview);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const garment = clothing.value;
  const aesthetic = style.value;
  const eventType = occasion.value;
  const vision = details.value.trim();

  generatedBrief = [
    "ATELIER AI — YOUR DESIGN BRIEF",
    "",
    `Garment: ${garment}`,
    `Style: ${aesthetic}`,
    `Main color: ${selectedColor}`,
    `Occasion: ${eventType}`,
    `Creative direction: ${vision || "Explore a design that fits this style."}`,
    "",
    "Design suggestion:",
    `Create a ${aesthetic.toLowerCase()} ${garment.toLowerCase()} in ${selectedColor.toLowerCase()} for ${eventType.toLowerCase()}.`,
    vision ? `Include these details: ${vision}` : "",
    "",
    "Note: This is a design concept, not an AI-generated image."
  ].filter(Boolean).join("\n");

  resultBox.replaceChildren();

  const heading = document.createElement("strong");
  heading.textContent = "Your fashion concept is ready!";

  const paragraph = document.createElement("p");
  paragraph.textContent =
    `A ${selectedColor.toLowerCase()} ${garment.toLowerCase()} with a ${aesthetic.toLowerCase()} aesthetic, designed for ${eventType.toLowerCase()}.`;

  const container = document.createElement("div");
  container.append(heading, paragraph);
  resultBox.append(container);

  copyBtn.disabled = false;
  copyBtn.textContent = "Copy design brief ↗";
  updatePreview();

  resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

copyBtn.addEventListener("click", async () => {
  if (!generatedBrief) return;

  try {
    await navigator.clipboard.writeText(generatedBrief);
    copyBtn.textContent = "Copied successfully ✓";
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = generatedBrief;
    document.body.append(textArea);
    textArea.select();

    const copied = document.execCommand("copy");
    textArea.remove();

    copyBtn.textContent = copied
      ? "Copied successfully ✓"
      : "Copy failed — select the brief manually";
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

updatePreview();
