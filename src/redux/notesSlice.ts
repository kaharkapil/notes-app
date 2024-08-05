import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Note {
  id: string;
  title?: string;
  content: string;
  pinned: boolean;
  backgroundColor?: string;
  imageUrl?: string;
}

interface NotesState {
  notes: Note[];
}

const loadNotesFromLocalStorage = (): Note[] => {
  try {
    const serializedNotes = localStorage.getItem('notes');
    if (serializedNotes === null) {
      return [];
    }
    return JSON.parse(serializedNotes);
  } catch (e) {
    console.error("Could not load notes from localStorage", e);
    return [];
  }
};

const saveNotesToLocalStorage = (notes: Note[]) => {
  try {
    const serializedNotes = JSON.stringify(notes);
    localStorage.setItem('notes', serializedNotes);
  } catch (e) {
    console.error("Could not save notes to localStorage", e);
  }
};

const initialState: NotesState = {
  notes: loadNotesFromLocalStorage(),
};

const notesSlice = createSlice({
  name: "notes",
  initialState,

  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
      saveNotesToLocalStorage(state.notes);
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      saveNotesToLocalStorage(state.notes);
    },
    pinNote: (state, action: PayloadAction<string>) => {
      const note = state.notes.find((note) => note.id === action.payload);
      if (note) {
        note.pinned = !note.pinned;
        saveNotesToLocalStorage(state.notes);
      }
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id,
      );
      if (index !== -1) {
        state.notes[index] = action.payload;
        saveNotesToLocalStorage(state.notes);
      }
    },
  },
});

export const { addNote, deleteNote, pinNote, updateNote } = notesSlice.actions;
export default notesSlice.reducer;
