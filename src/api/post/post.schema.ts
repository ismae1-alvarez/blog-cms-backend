import {
  array,
  type InferOutput,
  literal,
  minLength,
  object,
  optional,
  pipe,
  string,
  url,
  variant
} from "valibot"

// Esto es documentacion
export const ContentBlockExamples = {
  text: {
    type: "text",
    value: "Texto normal",
  },
  link: {
    type: "link",
    value: "Texto del link",
    meta: {
      url: "https://example.com",
    },
  },
  image: {
    type: "image",
    value: "socrates",
    meta: {
      url: "https://cdn.com/image.png",
      id_public: "id_33456565534",
    },
  },
}


const TextBlockSchema = object({
  type: literal("text"),
  value: pipe(string(), minLength(1)),
})

const LinkBlockSchema = object({
  type: literal("link"),
  value: pipe(string(), minLength(1)),
  meta: optional(
    object({
      url: pipe(string(), url()),
    }),
  )
})

const ImageBlockSchema = object({
  type: literal("image"),
  value: pipe(string(), minLength(1)),
  meta: optional(
    object({
      url: pipe(string(), url()),
      id_public: optional(string()),
    }),
  )
})

export const ContentBlockSchema = variant("type", [
  TextBlockSchema,
  LinkBlockSchema,
  ImageBlockSchema,
])

export const CreatePostSchema = object({
  title: pipe(string(), minLength(1)),
  content: pipe(array(ContentBlockSchema), minLength(1)),
})


export type CreatePostType = InferOutput<typeof CreatePostSchema>
