"use strict";
class IndexRoute {
    async index(req, res) {
        res.render("index/index");
    }
    async agendamento(req, res) {
        let opcoes = {
            titulo: "Agendamento"
        };
        res.render("index/agendamento", opcoes);
    }
}
module.exports = IndexRoute;
//# sourceMappingURL=index.js.map