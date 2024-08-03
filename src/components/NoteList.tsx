import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import Note from "./Note";
import { addNote } from "../redux/notesSlice";
import { v4 as uuidv4 } from "uuid";
import { Box, Button, Typography, Divider, Grid } from "@mui/material";

const NoteList: React.FC = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch();

  const handleAddNote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addNote({
        id: uuidv4(),
        title: "",
        content: "",
        pinned: false,
        imageUrl: "",
        backgroundColor: "",
      }),
    );
  };

  const pinnedNotes = notes.filter((note) => note.pinned);
  const regularNotes = notes.filter((note) => !note.pinned);

  return (
    <Box sx={{ padding: "16px", position: "relative" }}>
      <Button
        onClick={handleAddNote} //mobile-screen-responsiveness
        sx={{
          position: "fixed",
          top: {
            xs: "60px",
            md: "80px",
          },
          right: {
            xs: "16px",
            md: "30px",
          },
          fontSize: {
            xs: "12px",
            md: "14px",
          },
          backgroundColor: "#808080",
          color: "white",
          border: "none",
          width: {
            xs: "120px",
            md: "150px",
          },
          height: {
            xs: "40px",
            md: "50px",
          },
          cursor: "pointer",
          borderRadius: "8px",
          zIndex: 1300,
        }}
      >
        + Add Note
      </Button>
      {/* section for pinned notes */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Pinned Notes</Typography>
        <Grid container spacing={2}>
          {pinnedNotes.map((note) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={note.id}>
              <Note {...note} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ mb: 4 }} />
      {/* section for all notes */}
      <Box>
        <Typography variant="h6">All Notes</Typography>
        <Grid container spacing={2}>
          {regularNotes.map((note) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={note.id}>
              <Note {...note} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default NoteList;
