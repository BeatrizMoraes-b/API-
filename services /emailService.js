const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
 
class EmailValidationResult {
  constructor(valido, email, mensagem) {
    this.valido = valido;
    this.email = email;
    this.mensagem = mensagem;
  }
}
 
class EmailService {
  constructor(repository) {
    this.repository = repository;
  }
 
  async validar(email) {
    if (email == null || email.trim() === "") {
      return new EmailValidationResult(false, null, "E-mail não informado");
    }
 
    const chave = email.trim().toLowerCase();
 
    if (!EMAIL_REGEX.test(chave)) {
      return new EmailValidationResult(false, null, "Formato de e-mail inválido");
    }
 
    if (await this.repository.existsById(chave)) {
      return new EmailValidationResult(false, null, "E-mail já cadastrado");
    }
 
    return new EmailValidationResult(true, chave, "E-mail válido");
  }
}
 
module.exports = { EmailService, EmailValidationResult };