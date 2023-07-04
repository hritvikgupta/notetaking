import React from "react";
import NoteForm from "./NoteForm";
import { NoteData, Tag } from "../App";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTags: (tag: Tag) => void;
  avaliableTags: Tag[];
};
export const NewNote = ({
  onSubmit,
  onAddTags,
  avaliableTags,
}: NewNoteProps) => {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTags={onAddTags}
        avaliableTags={avaliableTags}
      />
    </>
  );
};
