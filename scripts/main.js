import UI from "./notesUI.js";
import NotesAPI from "./notesAPI.js";

export default function main(root) {
  const api = NotesAPI();
  const ui = UI(root, methodHandler());

  const notes = api.getNotes();

  ui.updateNotesList(notes);
  function methodHandler() {
    const onSelect = (selectedNote) => {};

    const onEdit = (title, description) => {};

    const onAdd = () => {
      const newNote = {
        title: "Note Title",
        description: "Enter text...",
      };
      api.addNote(newNote);
      ui.updateNotesList(notes);
    };

    const onDelete = (indexId) => {};
    return {
      onSelect,
      onEdit,
      onAdd,
      onDelete,
    };
  }
}
