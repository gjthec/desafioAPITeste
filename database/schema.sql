CREATE TABLE Pessoas (
    idPessoa INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    dataNascimento DATE NOT NULL
);

INSERT INTO Pessoas (idPessoa, nome, cpf, dataNascimento) VALUES
(1, 'João da Silva', '12345678901', '1990-01-01');

CREATE TABLE Contas (
    idConta INT IDENTITY PRIMARY KEY,
    idPessoa INT NOT NULL FOREIGN KEY REFERENCES Pessoas(idPessoa),
    saldo DECIMAL(18,2) NOT NULL,
    limiteSaqueDiario DECIMAL(18,2) NOT NULL,
    flagAtivo BIT NOT NULL,
    tipoConta INT NOT NULL,
    dataCriacao DATETIME2 NOT NULL
);

CREATE TABLE Transacoes (
    idTransacao INT IDENTITY PRIMARY KEY,
    idConta INT NOT NULL FOREIGN KEY REFERENCES Contas(idConta),
    valor DECIMAL(18,2) NOT NULL,
    dataTransacao DATETIME2 NOT NULL
);
