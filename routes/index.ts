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
}

export = IndexRoute;
