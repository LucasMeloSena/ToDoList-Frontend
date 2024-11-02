export function translateFormField(field: string) {
  switch (field) {
    case "email": return "e-mail"
    case "password": return "senha";
    default: return ""
  }
}
