import React, { useMemo } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { NewNote } from "./Components/NewNote";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import { NoteList } from "./Components/NoteList";
import NoteLayout from "./Components/NoteLayout";
import Note from "./Components/Note";
import { EditNote } from "./Components/EditNote";
export type Note = {
  id: string;
} & NoteData;
export type NoteData = {
  title: string;
  markDown: string;
  tags: Tag[];
};
export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markDown: string;
  tagids: string[];
};
export type Tag = {
  id: string;
  label: string;
};
function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagids.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  const onCreateNotes = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagids: tags.map((tag) => tag.id) },
      ];
    });
  };
  const onAddTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  const onUpdateNotes = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagids: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  };
  const onDeleteNote = (id: string) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id != id);
    });
  };
  const udpateTag = (id: string, label: string) => {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  };
  const deleteTag = (id: string) => {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  };
  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <h1>
              <NoteList
                onUpdateTag={udpateTag}
                onDeleteTag={deleteTag}
                avaliableTags={tags}
                notes={notesWithTags}
              />
            </h1>
          }
        />
        <Route
          path="/New"
          element={
            <NewNote
              onSubmit={onCreateNotes}
              onAddTags={onAddTag}
              avaliableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDeleteNote={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNotes}
                onAddTags={onAddTag}
                avaliableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
