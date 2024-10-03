export default function UI(root, { onSelect, onEdit, onAdd, onDelete } = {}) {
  const sidebarDiv = sideBar();
  const previewDiv = previewBar();

  root.appendChild(sidebarDiv);
  root.appendChild(previewDiv);

  const notesList = root.querySelector(".notesList");
  const addBtn = root.querySelector(".notesAdd");
  const titleInp = root.querySelector(".notesTitle");
  const descriptionInp = root.querySelector(".notesBody");

  addBtn.addEventListener("click", (e) => {
    onAdd();
  });

  [titleInp, descriptionInp].forEach((inputElement) => {
    inputElement.addEventListener("blur", (e) => {
      const title = titleInp.value.trim();
      const description = descriptionInp.value.trim();
      onEdit(title, description);
    });
  });

  function updateNotesList(notesParams) {
    notesList.innerHTML = "";

    notesParams.forEach((notes) => {
      const noteItem = createNotesListItem(
        notes.title,
        notes.description,
        new Date(notes.update),
        notes.id
      );
      notesList.insertAdjacentHTML("beforeend", noteItem);
    });
    root.querySelectorAll(".notesListItem").forEach((notesItem) => {
      notesItem.addEventListener("click", () => {
        onSelect(+notesItem.dataset.index);
      });
      notesItem.addEventListener("dbclick", () => {
        const doDelete = confirm("Delete Notes?");
        if (doDelete) {
          onDelete(+notesItem.dataset.index);
        }
      });
    });
  }
  // update the selected note and apply distinction
  function updateSelectedNote(note) {
    titleInp.value = note.title;
    descriptionInp.value = note.description;

    root.querySelectorAll(".notesListItem").forEach((notesItem) => {
      notesItem.classList.remove("notesListItem-selected");
    });
    root
      .querySelector(`.notesListItem[data-index="${note.id}"]`)
      .classList.add("notesListItem-selected");
  }

  function updatePreviewVisibility(visible) {
    previewDiv.style.visibility = visible ? "visible" : "hidden";
  }

  updatePreviewVisibility(false);
  return {
    updateNotesList,
    updateSelectedNote,
    updatePreviewVisibility,
  };
}
function sideBar() {
  const sidebarDiv = document.createElement("div");
  const notesList = document.createElement("div");
  const addBtn = document.createElement("button");

  sidebarDiv.classList.add("notesSidebar");
  notesList.classList.add("notesList");
  addBtn.classList.add("notesAdd");

  addBtn.textContent = "Add Note";

  sidebarDiv.appendChild(notesList);
  sidebarDiv.appendChild(addBtn);

  return sidebarDiv;
}
function createNotesListItem(
  titleParams,
  descriptionParams,
  dateParams,
  idIndex
) {
  const MAX_BODY_LENGTH = 60;
  return `
          <div class="notesListItem"  data-index="${idIndex}" >
            <div class="notesSmallTitle">${titleParams}</div>
            <div class="notesSmallBody">${descriptionParams.substring(
              0,
              MAX_BODY_LENGTH
            )}${descriptionParams.length > MAX_BODY_LENGTH ? "..." : ""}</div>
            <div class="notesSmallUpdated">${dateParams.toLocaleString(
              undefined,
              { dateStyle: "full", timeStyle: "short" }
            )}</div>
          </div>
        </div>`;
}
function previewBar() {
  const notesPreviewWrapper = document.createElement("div");
  const titleInput = document.createElement("input");
  const descriptionInput = document.createElement("textarea");

  notesPreviewWrapper.classList.add("notesPreview");
  descriptionInput.classList.add("notesBody");

  titleInput.classList.add("notesTitle");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("placeholder", "Enter a title...");

  descriptionInput.textContent = "Enter text...";

  notesPreviewWrapper.appendChild(titleInput);
  notesPreviewWrapper.appendChild(descriptionInput);

  return notesPreviewWrapper;
}
