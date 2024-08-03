import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteNote, pinNote, updateNote } from "../redux/notesSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPalette,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";
import { Box, IconButton, TextField, Tooltip } from "@mui/material";

interface NoteProps {
  id: string;
  title?: string;
  content: string;
  pinned: boolean;
  backgroundColor?: string;
  imageUrl?: string;
}

const Note: React.FC<NoteProps> = ({
  id,
  title,
  content,
  pinned,
  backgroundColor,
  imageUrl,
}) => {
  const dispatch = useDispatch();
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableContent, setEditableContent] = useState(content);
  const [editableImageUrl, setEditableImageUrl] = useState(imageUrl);
  const [editableBackgroundColor, setEditableBackgroundColor] =
    useState(backgroundColor);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        //validation for image
        setError("Invalid image file.");
        return;
      }
      setError(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setEditableImageUrl(event.target.result as string);
          dispatch(
            updateNote({
              id,
              title: editableTitle,
              content: editableContent,
              pinned,
              backgroundColor: editableBackgroundColor,
              imageUrl: event.target.result as string,
            }),
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundColorChange = (
    //color-picker event
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEditableBackgroundColor(e.target.value);
    dispatch(
      updateNote({
        id,
        title: editableTitle,
        content: editableContent,
        pinned,
        backgroundColor: e.target.value,
        imageUrl: editableImageUrl,
      }),
    );
  };

  const handlePinToggle = () => {
    dispatch(pinNote(id));
  };

  return (
    <Box
      sx={{
        backgroundColor: editableBackgroundColor || "white",
        position: "relative",
        padding: "16px",
        borderRadius: "4px",
        marginBottom: "16px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        borderTop: "none",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "8px",
          right: "8px",
          display: "flex",
          gap: "8px",
        }}
      >
        <Tooltip title="Pin this Note">
          <IconButton
            onClick={handlePinToggle}
            sx={{ color: pinned ? "gray" : "black", fontSize: "16px" }}
          >
            <FontAwesomeIcon icon={faMapPin} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Change Color">
          <IconButton
            onClick={() =>
              document.getElementById(`color-picker-${id}`)?.click()
            }
            sx={{ color: "black", fontSize: "16px" }}
          >
            <FontAwesomeIcon icon={faPalette} />
          </IconButton>
        </Tooltip>
        <input
          type="color"
          id={`color-picker-${id}`}
          value={editableBackgroundColor}
          onChange={handleBackgroundColorChange}
          style={{ display: "none" }}
        />
        <Tooltip title="Delete this note">
          <IconButton
            onClick={() => dispatch(deleteNote(id))}
            sx={{ color: "black", fontSize: "16px" }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </IconButton>
        </Tooltip>
      </Box>

      <TextField
        fullWidth
        value={editableTitle || ""}
        onChange={(e) => setEditableTitle(e.target.value)}
        onBlur={() =>
          dispatch(
            updateNote({
              id,
              title: editableTitle,
              content: editableContent,
              pinned,
              backgroundColor: editableBackgroundColor,
              imageUrl: editableImageUrl,
            }),
          )
        }
        placeholder="Title"
        variant="standard"
        margin="normal"
        sx={{
          marginTop: "48px",
          "& .MuiInputBase-root": {
            borderBottom: "1px solid #ccc",
            border: "none",
          },
        }}
      />

      {editableImageUrl && (
        <img
          src={editableImageUrl}
          alt="Note"
          style={{ maxWidth: "100%", marginBottom: "16px" }}
        />
      )}

      <TextField
        fullWidth
        value={editableContent}
        onChange={(e) => setEditableContent(e.target.value)}
        onBlur={() =>
          dispatch(
            updateNote({
              id,
              title: editableTitle,
              content: editableContent,
              pinned,
              backgroundColor: editableBackgroundColor,
              imageUrl: editableImageUrl,
            }),
          )
        }
        placeholder="Content"
        variant="standard"
        multiline
        rows={4}
        sx={{
          "& .MuiInputBase-root": {
            border: "none",
          },
        }}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "block", marginTop: "16px", border: "none" }}
      />

      {error && <Box sx={{ color: "maroon", marginTop: "8px" }}>{error}</Box>}
    </Box>
  );
};

export default Note;
