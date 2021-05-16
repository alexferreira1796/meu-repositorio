import React from 'react';
import * as S from './styles';
//import { useParams } from 'react-router-dom';

import { FaSpinner, FaArrowLeft } from 'react-icons/fa';
import Button from '../../components/Button';
import api from '../../services/api';

const options = [
  {
    name: "Todos",
    value: "all"
  },
  {
    name: "Abertos",
    value: "open"
  },
  {
    name: "Fechados",
    value: "closed"
  },
];

interface IRepoProps {
  match: {
    params: any
  }
}

const Repositório: React.FC<IRepoProps> = ({match}) => {
  //const { repositorio }: {repositorio: string} = useParams();
  const nomeRepo: any = decodeURIComponent(match.params.repositorio);
  const [repositorio, setRepositorio] = React.useState<any>({});
  const [issues, setIssues] = React.useState<Array<any>>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [page, setPage] = React.useState<number>(1);
  const [error, setError] = React.useState<string>('');
  const [state, setState] = React.useState<string>('all');

  // DidMount
  React.useEffect(() => {
    async function load() {
      try {
        // Verificando se está vazio
        if(nomeRepo === '') {
          throw new Error('Por favor, faça uma busca!');
        }

        const [repositorioData, issuesData] = await Promise.all([
          api.get(`/repos/${nomeRepo}`),
          api.get(`/repos/${nomeRepo}/issues`, {
            params: {
              state,
              per_page: 5
            }
          })
        ]);
        setRepositorio(repositorioData.data);
        setIssues(issuesData.data);
      } catch(error) {
        if(error.message === 'Request failed with status code 404') {
          error.message = "Repositório não encontrado!";
        }
        setError(error.message);
      } finally {
        setLoading(false);
      }

    }
    load();

  }, [nomeRepo, state]);

  // DidUpdate
  React.useEffect(() => {
    async function update() {
      try {
        // Verificando se está vazio
        if(nomeRepo === '') {
          throw new Error('Por favor, faça uma busca!');
        }
        const res = await api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state,
            page,
            per_page: 5
          }
        });
        setIssues(res.data);
      } catch(error) {
        if(error.message === 'Request failed with status code 404') {
          error.message = "Repositório não encontrado!";
        }
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    update();
  }, [nomeRepo, page, state]);

  const handlePage = (action: string): void => {
    setPage( action === 'back' ? page - 1: page + 1 );
  }

  const handleChange = (param: string): void => {
    setState(param);
  }

  if(loading) return <S.Loading><FaSpinner color="#fff" size={50} /></S.Loading>
  return (
    <S.Container>

      <S.BackButton to="/">
          <FaArrowLeft size={35} color="#000" />
      </S.BackButton>

      {
        error !== '' && <h3>{error}</h3>
      }

      {
       Object.keys(repositorio).length > 0 && (
          <>
            <S.Owner>
              <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login} />
              <h1>{repositorio.name}</h1>
              <p>{repositorio.ddescription}</p>
            </S.Owner>

            <S.Selects>
              <Button
                options={options}
                onClick={handleChange}
                active={state}
              />
            </S.Selects>

            {
              issues && (
                <>
                <S.IssuesList>
                {issues.map((issue: any) => (
                  <li key={issue.id}>
                    <img src={issue.user.avatar_url} alt={issue.user.login} />
                    <div>
                      <strong>
                        <a href={issue.html_url}>{issue.title}</a>
                        {
                          issue.labels.map((label: any) => (
                            <span key={label.id} >{label.name}</span>
                          ))
                        }
                      </strong>
                      <p>
                        { issue.user.login }
                      </p>
                    </div>
                  </li>
                ))}        
              </S.IssuesList>
              <S.PageActions>
                { page > 1 &&  <button type="button" onClick={() => handlePage('back')}>Voltar</button> }
                <button type="button" onClick={() => handlePage('next')}>Próxima</button>
              </S.PageActions>  
              </>   
              )
            }
          </>
        )
      }
      
    </S.Container>
  )
}

export default Repositório;