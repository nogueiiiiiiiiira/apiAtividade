//service
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// adicionar Turma
async function addTurma(nome, nomeProfessor) {
    
        return await prisma.turma.create({
            data: {
                nome,
                nomeProfessor,
            }
        });
    }

    async function listTurmas() {
        return await prisma.turma.findMany();
    }

    async function listUsers() {
        return await prisma.usuario.findMany();
    }

    // listar turma por id
async function listTurmaById(id) {
        return await prisma.turma.findUnique({
            where: {
                id: isNaN(id) ? undefined : Number(id) 
            }
        });
}

// listar turma por professor
async function listTurmaByProfessor(search) {
    return await prisma.turma.findMany({
        where: {
                    nomeProfessor: {
                        contains: search
                    }
                }
    
        })
}

// deletar turma
async function deleteTurmaService(id) {
    return await prisma.turma.delete({
        where: {
            id: Number(id)
        }
    });
}

//adicionar atividades
async function addAtividade(idTurma, idProfessor, nomeTurma, descricao) {
    
    return await prisma.atividade.create({
        data: {
            idTurma,
            idProfessor,
            nomeTurma,
            descricao,
        }
    });
}

// listar turma por professor e turma
async function listAtividadeByTurma(turmaSearch) {
    return await prisma.atividade.findMany({
        where: {
            idTurma: turmaSearch
        }

    })
}

async function createUser(username, password) {
    return await prisma.usuario.create({
      data: {
        username,
        password: await bcrypt.hash(password, 10),
      },
    });
  }
  
  async function getUserByUsername(username) {
    return await prisma.usuario.findUnique({
      where: {
        username,
      },
    });
  }
  
  async function authenticateUser(username, password) {
    const user = await getUserByUsername(username);
    if (!user) {
      return null;
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }
  

module.exports = {
    addTurma,
    listTurmaById,
    listTurmaByProfessor,
    deleteTurmaService,
    addAtividade,
    listAtividadeByTurma,
    listTurmas,
    createUser,
    authenticateUser,
    getUserByUsername,
    listUsers
    
};