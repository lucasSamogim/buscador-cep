import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { TbCoffee } from 'react-icons/tb';
import './style.css';
import api from './services/api';

function App() {

    const [input, setInput] = useState('')
    const [cep, setCep] = useState({})

    async function handleSearch() {
      // ROTA: 01310930/json/

      if(input === '') {
        alert("Preencha com algum CEP")
        return;
      }

      try{
        const response = await api.get(`${input}/json`)
        setCep(response.data)
        if(response.data.erro){
            alert("CEP inexistente! Verifique o CEP digitado")
            return;
        } else {
            setInput("")
        }
      } catch {
        alert("Ops... Erro ao fazer a busca! Verifique o CEP digitado e tente novamente...")
        setInput("")
      }
    }

    return (
      <div className="container">
        <h1 className="title">Buscador de CEP</h1>

        <div className="container-input">
          <input
            type="text"
            placeholder="Digite seu CEP..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button className="btn-search" onClick={handleSearch}>
            <FiSearch size={25} color="#FFF" />
          </button>
        </div>

        {Object.keys(cep).length > 1 && (
          <main className="main">
            <h2>CEP: {cep.cep}</h2>
            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>
              {cep.localidade} - {cep.uf}
            </span>
          </main>
        )}

        <footer className="footer">
          Desenvolvido por Lucas Samogim Pereira <TbCoffee size={12} color="#FFF" />
        </footer>
      </div>
    );
}

export default App;
