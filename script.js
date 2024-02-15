document.addEventListener("DOMContentLoaded", function() {
    const newButton = document.getElementById("new");
    const columns = document.querySelectorAll(".column");
    let draggedCard = null;
  
    function createNewCard(column, title, description, tags) {
      const newCard = document.createElement("div");
      newCard.classList.add("card");
      newCard.setAttribute("draggable", "true");
      newCard.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
        <div class="tags">${tags}</div>
      `;
      column.querySelector(".cards").appendChild(newCard);
      addDragAndDropEvents(newCard);
    }
  
    function promptForTaskDetails() {
      const title = prompt("Digite o título da nova tarefa:");
      const description = prompt("Digite a descrição da nova tarefa:");
      const tags = prompt("Digite as tags da nova tarefa (separadas por vírgula):").split(",").map(tag => `<div class="tag"><p>${tag.trim()}</p></div>`).join("");
      return { title, description, tags };
    }
  
    function handleNewTask() {
      const { title, description, tags } = promptForTaskDetails();
      if (title && description && tags) {
        createNewCard(columns[0], title, description, tags);
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    }
  
    function addDragAndDropEvents(card) {
      card.addEventListener("dragstart", function(event) {
        draggedCard = event.target;
        setTimeout(() => {
          event.target.style.display = "none";
        }, 0);
      });
  
      card.addEventListener("dragend", function() {
        setTimeout(() => {
          draggedCard.style.display = "block";
          draggedCard = null;
        }, 0);
      });
    }
  
    newButton.addEventListener("click", handleNewTask);
  
    columns.forEach(column => {
      column.addEventListener("dragover", function(event) {
        event.preventDefault();
      });
  
      column.addEventListener("drop", function(event) {
        event.preventDefault();
        if (draggedCard) {
          const dropZone = this.querySelector(".cards");
          dropZone.appendChild(draggedCard);
        }
      });
    });
  });
  