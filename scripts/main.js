import UI from "./notesUI.js";
import NotesAPI from "./notesAPI.js";

export default function main(root) {
  const api = NotesAPI();
  const ui = UI(root, methodHandler());

  let notes = [];
  let activeNoteItem = null;
  refreshNotes();
  function refreshNotes() {
    const notes = api.getNotes();
    setNotes(notes);

    if (notes.length > 0) {
      setActiveNote(notes[notes.length - 1]);
    }
  }

  function setActiveNote(activeNote) {
    activeNoteItem = activeNote;
    ui.updateSelectedNote(activeNote);
  }

  function setNotes(notesParams) {
    notes = notesParams;
    ui.updateNotesList(notesParams);
    ui.updatePreviewVisibility(notesParams.length > 0);
  }

  function methodHandler() {
    const onSelect = (indexId) => {
      const index = notes.findIndex((note) => note.id === indexId);
      setActiveNote(notes[index]);
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
      setActiveNote(notes[notes.length - 1]);
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
