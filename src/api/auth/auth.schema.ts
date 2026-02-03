import { email, type InferOutput, minLength, object, pick, pipe, string } from "valibot"

export const AuthCreateSchema = object({
  name: pipe(string("El name debe ser texto"), minLength(1, "Name es requerido")),
  email: pipe(string("El email debe ser texto"), minLength(1, "email es requerido"), email()),
  password: pipe(string("El email debe ser texto"), minLength(1, "email es requerido")),
  description: pipe(string("El name debe ser texto"), minLength(1, "Descripcion es requerido")),
  img: pipe(string("El name debe ser texto"), minLength(1, "Img es requerido")),
})

export type AuthCreateType = InferOutput<typeof AuthCreateSchema>


export const AuthLoginSchema = pick(AuthCreateSchema, ["email", "password"]);

export type AuthLoginType = InferOutput<typeof AuthLoginSchema>;
