
const express = require('express');
const router = express.Router();

const {
    getTurmaByProfessor,
    postTurma,
    deleteTurma,
    postAtividade,
    getAtividadesByTurma,
    getTurmas,
    login, 
    logout,
    getUsers,
} = require('./usuarioController.js');

router.get('/turmas', getTurmas)
router.get('/buscarTurmaPorProfessor/:turmaSearch', getTurmaByProfessor);
router.post('/postarTurma/', postTurma);
router.delete('/deletarTurma/:turmaId', deleteTurma);
router.get('/buscarAtividadePorTurma/:turmaSearch', getAtividadesByTurma);
router.post('/postarAtividade', postAtividade);
router.post('/login', login);
router.post('/logout', logout);
router.get('/users', getUsers);


module.exports = router;