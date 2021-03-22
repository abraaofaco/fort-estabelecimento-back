<h1 align="center">
	<img alt="FortEstabelecimento" src=".github/logo.png" width="200px" />
</h1>

<p align="center">
  <a href="https://github.com/EliasGcf/gobarber/blob/master/README.md"><img alt="GitHub" src="https://img.shields.io/github/license/EliasGcf/gobarber?color=%23FF9000"></a>
</p>

## 🔗 Complemento

Consulte também o front da aplicação [FortEstabelecimento - front-end](https://github.com/abraaofaco/fort-estabelecimento-web)

## 📝 Scripts

No diretório do projeto, execute:

### `yarn`

Para baixar todas as dependência necessárias.

### `docker run --name fortestabelecimento -e POSTGRES_PASSWORD=fortestabelecimento -p 5432:5432 -d postgres`

Para criar um container postgresql.

- Com o container criado use sua IDE de preferência para criar uma base de dados
- Ajuste o arquivo `ormconfig.json` na raiz do projeto com as configurações do banco.

### `yarn typeorm migration:run`

Para criar as tabelas do banco

### `yarn dev`

Executa o aplicativo no modo de desenvolvimento.\
Use [http://localhost:3333](http://localhost:3333) para consumir a API.

A aplicação será recarregada se você fizer edições.\
Você também verá quaisquer erros de lint no console.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
