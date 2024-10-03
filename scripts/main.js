import UI from "./notesUI.js";
import NotesAPI from "./notesAPI.js";

export default function main(root) {
  const api = NotesAPI();
  const ui = UI(root, methodHandler());

  const notes = api.getNotes();
  let activeNoteItem = notes[0];

  init();

  function init() {
    ui.updateNotesList(notes);
    ui.updateSelectedNote(activeNoteItem);
    visibility();
  }

  function visibility() {
    notes.length === 0
      ? ui.updatePreviewVisibility(false)
      : ui.updatePreviewVisibility(true);
  }

  function methodHandler() {
    const onSelect = (indexId) => {
      const index = notes.findIndex((note) => note.id === indexId);
      activeNoteItem = notes[index];
      ui.updateSelectedNote(activeNoteItem);
      ui.updatePreviewVisibility(true);
    };

    const onEdit = (title, description) => {};

    const onAdd = () => {
      const newNote = {
        title: "Note Title",
        description: "Enter text...",
      };
      api.addNote(newNote);
      ui.updateNotesList(notes);
    };

    const onDelete = (indexId) => {
      visibility();
    };
    return {
      onSelect,
      onEdit,
      onAdd,
      onDelete,
    };
  }
}
