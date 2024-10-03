export default function NotesAPI() {
  let notesList = JSON.parse(localStorage.getItem("notes")) || [];

  const getNotes = () => {
    return notesList.sort((a, b) => {
      new Date(a.update) > new Date(b.update) ? -1 : 1;
    });
  };

  const setToStorage = () => {
    localStorage.setItem("notes", JSON.stringify(notesList));
  };

  const addNote = (noteToUpdate) => {
    const existing = notesList.find((note) => note.id === noteToUpdate.id);

    if (existing) {
      existing.title = noteToUpdate.title;
      existing.description = noteToUpdate.description;
      existing.update = new Date().toISOString();
    } else {
      noteToUpdate.id = Math.floor(Math.random() * 1000000);
      noteToUpdate.update = new Date().toISOString();
      notesList.push(noteToUpdate);
    }
    setToStorage();
  };

  const deleteNote = (id) => {
    const newNotesList = notesList.filter((note) => note.id !== id);
    notesList = newNotesList;
    setToStorage();
  };
  return {
    getNotes,
    addNote,
    deleteNote,
  };
}
