const draggableElements = document.querySelectorAll(".draggable");
const addRowButton = document.getElementById("addRow");

// Helper function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// LocalStorage Initiated
localStorage.setItem("last_number", 900);

function initializeDraggableElements() {
  const draggableElements = document.querySelectorAll(".draggable");

  draggableElements.forEach((element) => {
    element.addEventListener("dragstart", (e) => {
      e.stopPropagation();
      e.dataTransfer.setData("text/plain", element.dataset.number);
    });

    element.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    element.addEventListener("drop", (e) => {
      e.preventDefault();
      const sourceNumber = e.dataTransfer.getData("text/plain");
      const targetNumber = element.dataset.number;
      if (sourceNumber !== targetNumber) {
        const sourceBox = document.querySelector(
          `[data-number="${sourceNumber}"]`
        );
        const targetBox = element;
        const tempValue = sourceBox.dataset.number;
        const tempColor = sourceBox.style.backgroundColor;

        sourceBox.dataset.number = targetNumber;
        sourceBox.style.backgroundColor = targetBox.style.backgroundColor;
        sourceBox.innerHTML = targetNumber;

        targetBox.dataset.number = tempValue;
        targetBox.style.backgroundColor = tempColor;
        targetBox.innerHTML = tempValue;
      }
    });
  });
}

addRowButton.addEventListener("click", () => {
  const newRow = document.createElement("tr");
  for (let i = 0; i < 3; i++) {
    const newCell = document.createElement("td");

    const nextNumber = parseInt(localStorage.getItem("last_number")) + 100;
    localStorage.setItem("last_number", nextNumber);

    const newColor = getRandomColor(); // Generate a unique color

    newCell.innerHTML = `<div class="draggable" draggable="true" data-number="${nextNumber}" style="background-color: ${newColor}">${nextNumber}</div>`;
    newRow.appendChild(newCell);
  }
  document.getElementById("dragTableTBody").appendChild(newRow);

  // Attach drag-and-drop listeners to new cells
  initializeDraggableElements();
});

// Call this function to initialize draggable elements on page load
initializeDraggableElements();
