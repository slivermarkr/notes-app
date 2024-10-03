import UI from "./notesUI.js";
import NotesAPI from "./notesAPI.js";

export default function main(root) {
  const api = NotesAPI();
  const ui = UI(root, methodHandler());

  const notes = api.getNotes();
  let activeNoteItem = notes[notes.length - 1];

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

    const onEdit = (title, description) => {
      activeNoteItem.title = title;
      activeNoteItem.description = description;
      api.addNote(activeNoteItem);
      ui.updateNotesList(notes);
      ui.updateSelectedNote(activeNoteItem);
    };

    const onAdd = () => {
      const newNote = {
        title: "Note Title",
        description: "Enter text...",
      };
      api.addNote(newNote);
      console.log(notes[notes.length - 1]);
      activeNoteItem = notes[notes.length - 1];
      ui.updateNotesList(notes);
      ui.updateSelectedNote(activeNoteItem);
    };

    const onDelete = (indexId) => {
      api.deleteNote(indexId);
      ui.updateNotesList(api.getNotes());
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
