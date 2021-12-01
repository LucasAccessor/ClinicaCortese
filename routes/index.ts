import app = require("teem");
import DataUtil = require("../utils/dataUtil");

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		
		res.render("index/index");
	}

	public async agendamento(req: app.Request, res: app.Response) {
		let horarios: any[];
		let cadastros: any[];

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().
			horarios = await sql.query("SELECT idHorario, Horario FROM horario")
			cadastros = await sql.query(`SELECT 
					agendamento.idAgendamento,
					agendamento.DataConsulta,
					agendamento.NomeDentista,
					agendamento.idHorario,
					horario.Horario
				FROM agendamento INNER JOIN horario ON agendamento.idHorario = horario.idHorario
				ORDER BY agendamento.DataConsulta ASC, agendamento.idHorario ASC`)
			
		});

		let opcoes = {
			titulo: "Agendamento",
			horarios: horarios,
			cadastros: cadastros
		};

		res.render("index/agendamento", opcoes);

		res.json(true);
	}
	
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
			await sql.query("INSERT INTO agendamento (NomeCliente, SobrenomeCliente, CPF, EmailCliente, TelefoneCelular, Bairro, RuaEnd, NumeroEnd, ComplementoEnd, CEP, DataConsulta, NomeDentista, ObservacaoConsulta, idHorario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [dados.nome, dados.sobrenome, dados.cpf, dados.email, dados.telefone, dados.bairroEnd, dados.endereco, dados.numeroEnd, dados.complementoEnd, dados.cepEnd, dados.data, dados.profissional, dados.observacao, dados.horario]);
			// select id
			//await sql.query("INSERT INTO Consultas (DataConsulta, HorarioConsulta, idCliente, idDentista) VALUES (?, ?, 1, 2)", [dados.data, dados.horario]);


		});

		res.json(true);
	}

	// ÁREA DOS FUNCIONÁRIOS

	public async login(req: app.Request, res: app.Response) {
		
		let opcoes = {
			layout: "inside"
		};
		res.render("index/login", opcoes);
		
	}

	public async registros(req: app.Request, res: app.Response) {
		
		let agenda: any[];

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().

			agenda = await sql.query(`SELECT agendamento.idAgendamento,
					agendamento.NomeCliente,
					agendamento.SobrenomeCliente,
					agendamento.CPF,
					agendamento.EmailCliente,
					agendamento.TelefoneCelular,
					agendamento.Bairro,
					agendamento.RuaEnd,
					agendamento.NumeroEnd,
					agendamento.ComplementoEnd,
					agendamento.CEP,
					agendamento.ObservacaoConsulta,
					-- date_format(agendamento.DataConsulta, '%d/%M/%Y') AS DataConsulta,
					agendamento.DataConsulta,
					agendamento.NomeDentista,
					agendamento.idHorario,
					horario.Horario
				FROM agendamento INNER JOIN horario ON agendamento.idHorario = horario.idHorario
				ORDER BY agendamento.DataConsulta ASC, agendamento.idHorario ASC`);

		});

		let opcoes = {
			layout: "inside",
			agenda: agenda
		};

		res.render("index/registros", opcoes);
		
		res.json(true);
	}

}

export = IndexRoute;
