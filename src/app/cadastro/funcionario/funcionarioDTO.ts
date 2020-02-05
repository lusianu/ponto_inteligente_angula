export interface FuncionarioDTO {
    id: number;
    nome: String;
    cpf : number;
    email: String;
    valorHora: DoubleRange;
    qtdHorasAlmoco: number;
    qtdHorasTrabalhoDia: number;
    senha: String;
}