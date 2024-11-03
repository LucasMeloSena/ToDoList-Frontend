export function translateFormField(field: string) {
  switch (field) {
    case "email": return "e-mail"
    case "password": return "senha";
    case "name": return "nome";
    case "phone": return "celular"
    default: return ""
  }
}
