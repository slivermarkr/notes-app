import NotesAPI from "./notesAPI.js";
import NotesUI from "./notesUI.js";

const root = document.querySelector("#app");
const API = NotesAPI();
const UI = NotesUI(root, {
  onSelect: (id) => {
    const notesIndex = API.getNotes().findIndex((note) => note.id === id);
    const note = API.getNotes()[notesIndex];
    console.log(note);
    UI.updateSelectedNote(note);
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
