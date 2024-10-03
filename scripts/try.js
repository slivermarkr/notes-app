export default function createNotesListItem(
  titleParams,
  descriptionParams,
  dateParams,
  idIndex
) {
  const MAX_BODY_LENGTH = 60;
  return `<div class="notesList" data-index="${idIndex}">
         <div class="notesListItem notesListItem-selected">
           <div class="notesSmallTitle">${titleParams}</div>
           <div class="notesSmallBody">${descriptionParams.substring(
             0,
             MAX_BODY_LENGTH
           )}${descriptionParams.length > MAX_BODY_LENGTH ? "..." : ""}</div>
           <div class="notesSmallUpdated">${dateParams.toLocaleString(
             undefined,
             { dateStyle: "full", timeStyle: "short" }
           )}</div>
         </div>
       </div>`;
}
