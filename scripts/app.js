import NotesAPI from "./notesAPI.js";
import NotesUI from "./notesUI.js";

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

// API.updateNote({
//   title: "Bitch get out the way",
//   description: "Babaababababa",
// });
console.log(API.getNotes());
UI.updateNotesList(API.getNotes());
// const API = NotesAPI();
// console.log(API.getNotes());
