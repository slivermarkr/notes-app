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

  const updateNote = (noteToUpdate) => {
    const existing = notesList.find((note) => note.id === noteToUpdate.id);

    if (existing) {
      existing.title = noteToUpdate.title;
      existing.description = noteToUpdate.description;
      existing.update = new Date();
    } else {
      noteToUpdate.id = Math.floor(Math.random() * 1000000);
      noteToUpdate.update = new Date();
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
    updateNote,
    deleteNote,
  };
}

const app = NotesAPI();

// app.deleteNote(989145);
// app.updateNote({
//   title: "Mashalla",
//   description: "I learnt something today",
//   id: 713990,
// });
console.log(app.getNotes());
