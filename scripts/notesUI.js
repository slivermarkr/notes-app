export default function UI(root, { onSelect, onEdit, onAdd, onDelete } = {}) {
  const sidebarDiv = sideBar();
  const previewDiv = previewBar();

  root.appendChild(sidebarDiv);
  root.appendChild(previewDiv);
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
function createNotesListItem(titleParams, descriptionParams, dateParams) {
  const wrapper = document.createElement("div");
  const title = document.createElement("div");
  const description = document.createElement("div");
  const date = document.createElement("div");

  wrapper.classList.add("notesListItem");
  title.classList.add("notesSmallTitle");
  description.classList.add("notesSmallBody");
  date.classList.add("notesSmallUpdated");

  title.textContent = titleParams;
  description.textContent = descriptionParams;
  date.textContent = dateParams;

  wrapper.appendChild(title);
  wrapper.appendChild(description);
  wrapper.appendChild(date);

  return wrapper;
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
