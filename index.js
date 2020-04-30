var restify = require('restify');
const erro = require('restify-errors');
const server = restify.createServer({
	name: 'myapp',
	version: '1.0.0',
});
const knex = require('knex')({
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'tq',
	},
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.get(
	'/',
	restify.plugins.serveStatic({
		directory: './public',
		file: 'index.html',
	})
);

server.get('/read', function (req, res, next) {
	knex('task').then((dados) => {
		res.send(dados);
	}, next);
	return next();
});

server.post('/create', function (req, res, next) {
	knex('task')
		.insert(req.body)
		.then((dados) => {
			res.send(dados);
		}, next);
	return next();
});

server.get('/show/:id', function (req, res, next) {
	const { id } = req.params;
	knex('task')
		.where('id', id)
		.first()
		.then((dados) => {
			if (!dados) {
				return res.send(new erro.BadRequestError('Id nao foi encontrado'));
			}
			res.send(dados);
		}, next);
	return next();
});

server.put('/alterar/:id', function (req, res, next) {
	const { id } = req.params;
	knex('task')
		.where('id', id)
		.update(req.body)
		.then((dados) => {
			if (!dados) {
				return res.send(new erro.BadRequestError('Id nao foi encontrado'));
			}
			res.send('Alteração realizada com sucesso');
		}, next);
	return next();
});

server.del('/delete/:id', function (req, res, next) {
	const { id } = req.params;
	knex('task')
		.where('id', id)
		.delete()
		.then((dados) => {
			if (!dados) {
				return res.send(new erro.BadRequestError('Id nao foi encontrado'));
			}
			res.send('Dados Excluidos');
		}, next);
	return next();
});
server.listen(3000, function () {
	console.log('%s listening at %s', server.name, server.url);
});
