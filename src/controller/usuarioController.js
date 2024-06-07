//controller 

const {
    addTurma,
    listTurmaById,
    deleteTurmaService,
    listTurmaByProfessor,
    listAtividadeByTurma,
    addAtividade,
    listTurmas,
    listUsers
} = require("../service/usuarioService");


async function getTurmas(req, res) {
    const turmas = await listTurmas();
    if (turmas.length > 0) {
        return res.status(200).json(turmas);
    }
    return res.status(204).send();
}


async function getUsers(req, res) {
    const usuarios = await listUsers();
    if (usuarios.length > 0) {
        return res.status(200).json(usuarios);
    }
    return res.status(204).send();
}

async function getTurmaByProfessor(req, res) {
    const { turmaSearch } = req.params;
    if (!turmaSearch) {
        return res.status(400).json({ message: 'Inserção de busca é obrigatória' });
    }
    const result = await listTurmaByProfessor(turmaSearch);
    if (result && result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Nada foi encontrado' });
}

async function getAtividadesByTurma(req, res) {
    const { turmaSearch } = req.params;
    if (!turmaSearch) {
        return res.status(400).json({ message: 'Inserção de busca é obrigatória' });
    }
    const result = await listAtividadeByTurma(turmaSearch);
    if (result && result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Nada foi encontrado' });
}

async function postTurma(req, res) {
    const { nome, nomeProfessor } = req.body;

    if (!nome || !nomeProfessor) {
        return res.status(400).json({ message: 'O preenchimento de todos os campos é obrigatório' });
    }

    try{
        await addTurma(nome, nomeProfessor);
        return res.status(201).json({ message: 'Turma cadastrada com sucesso' });
    }
    catch(error){
            return res.status(200).json({ message: error });
        }
    }

    async function postAtividade(req, res) {
        const { idTurma, idProfessor, nomeTurma, descricao } = req.body;
    
        if (!idTurma || !idProfessor || !nomeTurma || !descricao) {
            return res.status(400).json({ message: 'O preenchimento de todos os campos é obrigatório' });
        }
    
        try{
            await addAtividade(idTurma, idProfessor, nomeTurma, descricao);
            return res.status(201).json({ message: 'Atividade atribuída com sucesso' });
        }
        catch(error){
                return res.status(200).json({ message: error });
            }
        }
    

    async function deleteTurma(req, res) {
        const { turmaId } = req.params;
        try {
            const existingTurma = await listTurmaById(turmaId); 
            if (!existingTurma) {
                return res.status(404).json({ message: 'Turma não encontrada' });
            }
            await deleteTurmaService(turmaId);
            return res.status(200).json({ message: 'Turma excluída com sucesso' });
        } catch (error) {
            console.error('Erro ao excluir a turma:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
    
    async function login(req, res) {
        const { username, password } = req.body;
        const user = await authenticateUser(username, password);
        if (!user) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
          expiresIn: '1h',
        });
        return res.json({ token });
      }
      
      async function logout(req, res) {
        req.logout();
        return res.json({ message: 'Logged out successfully' });
      }
      


module.exports = {
    getTurmaByProfessor,
    postTurma,
    deleteTurma,
    postAtividade,
    getAtividadesByTurma,
    getTurmas,
    login,
    logout,
    getUsers
};