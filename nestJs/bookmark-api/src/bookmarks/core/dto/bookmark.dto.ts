import { Type, Static } from '@sinclair/typebox';

export const CreateBookmarkSchema = Type.Object({
  url: Type.String({ format: 'uri' }),
  title: Type.String(),
  description: Type.Optional(Type.String()),
  tags: Type.Optional(Type.Array(Type.String())),
});

export type CreateBookmarkDto = Static<typeof CreateBookmarkSchema>;

export const UpdateBookmarkSchema = Type.Partial(CreateBookmarkSchema);

export type UpdateBookmarkDto = Static<typeof UpdateBookmarkSchema>;
