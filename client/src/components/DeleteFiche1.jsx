import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteFiche1 = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    useEffect(() => {
        axios.delete('http://localhost:3001/fiche1/fiche1/'+id)
        .then(res => {
            if(res.data.deleted) {
                navigate('/fiches1')
            }
        }).catch(err => console.log(err))
    }, [])
}

export default DeleteFiche1