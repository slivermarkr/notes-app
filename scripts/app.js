import NotesAPI from "./notesAPI.js";
import NotesUI from "./notesUI.js";
import Try from "./try.js";
const root = document.querySelector("#app");
const API = NotesAPI();
const UI = NotesUI(root, {
  onSelect: (id) => {
    console.log(id);
  },
  onAdd: () => {
    console.log("Notes added");
  },
  onEdit: (title, description) => {
    console.log(title, description);
  },
  onDelete: (id) => {
    console.log(id);
  },
});

UI.updateNotesList(API.getNotes());
