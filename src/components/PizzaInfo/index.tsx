import React from 'react'

import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from './PizzaInfo.module.scss';


const PizzaInfo: React.FC = () => {

    const navigate = useNavigate();

    const [data, setData] = React.useState<{
        imageUrl: string;
        name: string;
        price: number;
    }>();
    
    const { id } = useParams();

    React.useEffect(() => {
        axios.get('https://62b2faca4f851f87f45160b1.mockapi.io/items/' + id)
            .then((res) => {
                setData(res.data);
                console.log(res.data)
            })
            .catch(() => {
                alert('Произошла ошибка при получении пиццы!');
                navigate('/');
            })
    }, [])

    if (!data) {
        return (
            <div className="container">
                <div>Загрузка...</div>
            </div>
        )
    }
 
    return (
    <div className="container">
        <div className={styles.root}>
            <img src={data.imageUrl} className={styles.pizzaImg}/>
            <h2>{data.name}</h2>
            <p className={styles.price}>{data.price} ₽</p>
        </div>
    </div>
    )
}

export default PizzaInfo;
