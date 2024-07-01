import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import figures from 'figures';
import routesApi from './src/routes/routesApi.js';
import logger from './middlewares/logger.js';

const crud = express();

const PORT = process.env.PORT || 3000;

crud.use(express.json());
crud.use(cors());
crud.use(logger);

crud.use('/', routesApi);

crud.listen(PORT, () => {
    console.log(chalk.green(`${figures.tick} ${chalk.bold('SERVIDOR CORRIENDO')} ${chalk.blue(figures.pointer)} ${chalk.yellow('http://localhost:' + PORT)}`));
    console.log(chalk.cyan(`${figures.star} ${chalk.bold('ESTADO:')} ${chalk.green('OK')}`));
    console.log(chalk.magenta(`${figures.info} ${chalk.bold('Esperando conexiones...')}`));
});


