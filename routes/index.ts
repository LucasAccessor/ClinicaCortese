import app = require("teem");

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		
		res.render("index/index",);
	}

	public async agendamento(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Agendamento"	
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
		let livro = req.body;

		// É sempre muito importante validar os dados do lado do servidor,
		// mesmo que eles tenham sido validados do lado do cliente!!!
		if (!livro) {
			res.status(400);
			res.json("Dados inválidos");
			return;
		}

		if (!livro.titulo) {
			res.status(400);
			res.json("Título inválido");
			return;
		}

		if (!livro.ano) {
			res.status(400);
			res.json("Ano inválido");
			return;
		}

		if (!livro.autor) {
			res.status(400);
			res.json("Autor inválido");
			return;
		}

		if (!livro.paginas) {
			res.status(400);
			res.json("Páginas inválidas");
			return;
		}

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().

			// As interrogações serão substituídas pelos valores passados ao final, na ordem passada.
			await sql.query("INSERT INTO livro (titulo, ano, autor, paginas) VALUES (?, ?, ?, ?)", [livro.titulo, livro.ano, livro.autor, livro.paginas]);

		});

		res.json(true);
	}
}

export = IndexRoute;
