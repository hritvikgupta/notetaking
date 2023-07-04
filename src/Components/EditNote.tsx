import { NoteData, Tag } from "../App";
import { useNote } from "./NoteLayout";
import NoteForm from "./NoteForm";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTags: (tag: Tag) => void;
  avaliableTags: Tag[];
};

export function EditNote({
  onSubmit,
  onAddTags,
  avaliableTags,
}: EditNoteProps) {
  const note = useNote();
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        // tags={note.tags}
        title={note.title}
        markDown={note.markDown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTags={onAddTags}
        avaliableTags={avaliableTags}
      />
    </>
  );
}
