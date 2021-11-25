import app = require("teem");
import DataUtil = require("../utils/dataUtil");

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		
		res.render("index/index",);
	}

	public async agendamento(req: app.Request, res: app.Response) {
		let dentistas: any[] =[ { idDentista: 1, NomeDentista: "jdfjkdk" } ];
		let horarios: any[] = [ { id: 1, hora: '08:30' }, { id: 2, hora: '10:30' } ];

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().

			//dentistas = await sql.query("SELECT idDentista, NomeDdestista FROM consultas WHERE profissional = ? AND dataConsulta = ?" [datas.profissional, datas.data]);

		});

		let opcoes = {
			titulo: "Agendamento",
			dentistas: dentistas,
			horarios: horarios
		}

		res.render("index/agendamento", opcoes);
	}
	/*public async buscaHorario(req: app.Request, res: app.Response) {
		let datas = req.body;
		let horarios: any[];

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().

			horarios = await sql.query("SELECT horario FROM consultas WHERE profissional = ? AND dataConsulta = ?" [datas.profissional, datas.data]);

		});

		let opcoes = {
			horarios: horarios
		};
		res.render(opcoes);
	} */
	@app.http.post()
	public async criarAgendamento(req: app.Request, res: app.Response) {
		// Os dados enviados via POST ficam dentro de req.body
		let dados = req.body;

		// É sempre muito importante validar os dados do lado do servidor,
		// mesmo que eles tenham sido validados do lado do cliente!!!
		if (!dados) {
			res.status(400);
			res.json("Dados inválidos");
			return;
		}

		if (!dados.nome) {
			res.status(400);
			res.json("Nome inválido");
			return;
		}

		if (!dados.sobrenome) {
			res.status(400);
			res.json("Sobrenome inválido");
			return;
		}

		if (!dados.cpf) {
			res.status(400);
			res.json("CPF inválido");
			return;
		}

		if (!dados.email) {
			res.status(400);
			res.json("email inválido");
			return;
		}

		if (!dados.telefone) {
			res.status(400);
			res.json("telefone inválido");
			return;
		}

		dados.data = DataUtil.converterDataISO(dados.data);
		if (!dados.data) {
			res.status(400);
			res.json("Data inválida");
			return;
		}

		if (!dados.profissional) {
			res.status(400);
			res.json("Profissional inválido");
			return;
		}

		if (!dados.horario) {
			res.status(400);
			res.json("Horario inválido");
			return;
		}

		if (!dados.endereco) {
			res.status(400);
			res.json("Endereço inválido");
			return;
		}

		if (!dados.numeroEnd) {
			res.status(400);
			res.json("Número inválido");
			return;
		}

		if (!dados.cepEnd) {
			res.status(400);
			res.json("CEP inválido");
			return;
		}

		if (!dados.bairroEnd) {
			res.status(400);
			res.json("Bairro inválido");
			return;
		}

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().

			// As interrogações serão substituídas pelos valores passados ao final, na ordem passada.
			await sql.query("INSERT INTO Endereco (Bairro, RuaEnd, NumeroEnd, ComplementoEnd, CEP) VALUES (?, ?, ?, ?, ?)", [dados.bairroEnd, dados.endereco, dados.numeroEnd, dados.complementoEnd, dados.cepEnd]);
			// select id
			await sql.query("INSERT INTO Cliente (NomeCliente, SobrenomeCliente, CPF, EmailCliente, TelefoneCelular) VALUES (?, ?, ?, ?, ?)", [dados.nome, dados.sobrenome, dados.cpf, dados.email, dados.telefone]);
			//await sql.query("INSERT INTO Consultas (DataConsulta, HorarioConsulta, idCliente, idDentista) VALUES (?, ?, 1, 2)", [dados.data, dados.horario]);


		});

		res.json(true);
	}
}

export = IndexRoute;
