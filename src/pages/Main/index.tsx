import React from 'react';
import * as S from './styles';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';

interface ISubmitPros {
  name: string;
}

const Main: React.FC = () => {
  const [newRepo, setNewRepo] = React.useState<string>('');
  const [repositorios, setRepositorios] = React.useState<Array<ISubmitPros>>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  // DidMount
  React.useEffect(() => {
    const local = localStorage.getItem("repos");
    if(local) {
      setRepositorios( JSON.parse(local) );
    }
  }, []);

  // DidUpdate
  React.useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repositorios));
  },[repositorios]);

  const handleSubmit = React.useCallback((e: any) => {
    e.preventDefault();

    async function submit() {
      setLoading(true);
      setError('');
      try {

        // Verificando se está vazio
        if(newRepo === '') {
          throw new Error('Por favor, faça uma busca!');
        }

        const res = await api.get(`repos/${newRepo}`);
        const data: ISubmitPros = {
          name: res.data.full_name,
        }

        // Verificando se já existe
        const hasInRepo = repositorios.find(({name}) => name === data.name);
        if(hasInRepo) {
          throw new Error("Esse repositório já está cadastrado!");
        }

        setRepositorios([...repositorios, data]);
        setNewRepo('');

      } catch(error) {
        if(error.message === 'Request failed with status code 404') {
          error.message = "Repositório não encontrado!";
        }
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    submit();

  },[newRepo, repositorios]);


  const handleChange = ({target}: any): void => {
    if(error.length > 0) {
      setError('');
    }
    setNewRepo(target.value);
  }

  const handleClick = React.useCallback((props: string) => {

    const find = repositorios.filter((repos => repos.name !== props));
    setRepositorios(find);

  }, [repositorios]);

  return (
    <S.Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <S.Form onSubmit={handleSubmit} error={error}>

        <input 
          type="text" 
          placeholder="Adicionar Repositórios"
          value={newRepo}
          onChange={handleChange}
        />

        <S.SubmitButton loading={loading ? 1 : 0}>
          { loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
            ) 
          }
        </S.SubmitButton>

      </S.Form>
      { error !== '' && <h3>{error}</h3> }
      <S.List>
        {
          repositorios && repositorios.map(({name}, index) => (
            <li key={index}>
              <span>
                <S.DeleteButton onClick={() => handleClick(name)}>
                  <FaTrash size={14} />
                </S.DeleteButton>
                {name}
              </span>
              <Link to={`/repositorio/${encodeURIComponent(name)}`}>
                <FaBars size={20} />
              </Link>
            </li>
          ))
        }
      </S.List>

    </S.Container>
  )
}

export default Main;