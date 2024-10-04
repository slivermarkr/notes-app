import UI from "./notesUI.js";
import NotesAPI from "./notesAPI.js";

export default function main(root) {
  const api = NotesAPI();
  const ui = UI(root, methodHandler());

  let notes = [];
  let activeNoteItem = null;

  function refreshNotes() {
    const notes = api.getNotes();
    setNotes(notes);

    if (notes.length > 0) {
      setActiveNote(notes[0]);
    }
  }

  function setActiveNote(activeNote) {
    activeNoteItem = activeNote;
    ui.updateSelectedNote(activeNote);
  }

  function setNotes(notes) {
    notes = notes;
    ui.updateNotesList(notes);
    ui.updatePreviewVisibility(notes.length > 0);
  }

  function methodHandler() {
    const onSelect = (indexId) => {
      const note = notes.find((note) => note.id === indexId);
      setActiveNote(note);
    };

    const onEdit = (title, description) => {
      api.addNote({
        id: activeNoteItem.id,
        title,
        description,
      });
      refreshNotes();
    };

    const onAdd = () => {
      const newNote = {
        title: "Note Title",
        description: "Enter text...",
      };
      api.addNote(newNote);
      refreshNotes();
    };

    const onDelete = (indexId) => {
      api.deleteNote(indexId);
      refreshNotes();
    };
    return {
      onSelect,
      onEdit,
      onAdd,
      onDelete,
    };
  }
}
