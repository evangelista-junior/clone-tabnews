function status(request, response) {
  response
    .status(200)
    .json({ CHAVE: "Alunos do curso.dev sao pessoas acima da media" });
}

export default status;
