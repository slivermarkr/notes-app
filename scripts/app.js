import NotesAPI from "./notesAPI.js";
import NotesUI from "./notesUI.js";

const root = document.querySelector("#app");
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
// const API = NotesAPI();
// console.log(API.getNotes());
