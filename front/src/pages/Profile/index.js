import React, { useEffect, useState } from 'react';
import { Link, useHistory} from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'
import './styles.css'
export default function Profile() {
    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')
    const [incidents, setIndicents] = useState([])
    const history = useHistory()

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIndicents(response.data)
        })
    }, [ongId])

    async function handleDeleteIncident(id) {
        try {
            const response = await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })
            setIndicents(incidents.filter((incident) => (incident.id !== id)))

        } catch (error) {
            alert('Erro ao deletar um caso, tente novamente')
        }
    }

    function handleLogout(){
        localStorage.clear();
        // localStorage.removeItem('ongName')
        // localStorage.removeItem('ongId')
        history.push('/');
        
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"></img>
                <span>Bem vindo, {ongName}</span>
                <Link to="/incidents/new" className="button">
                    Cadastrar Novo Caso
                    </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1> Casos Cadastrados</h1>

            <ul>
                {
                    incidents.map(incident =>
                        (<li key={incident.id}>
                            <strong>CASO</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR</strong>
                            <p> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                            </button>
                        </li>
                        ))
                }

            </ul>

        </div>
    )
}

