import React from 'react'

import {useDispatch} from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
 
const data = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

type CategoriesProps = {
	activeCategory: number
};

const Categories: React.FC<CategoriesProps> = React.memo(({activeCategory}) => {

	const dispatch = useDispatch();

	const setCategory = (i: number) => {
		dispatch(setCategoryId(i))
	}

	return (
	<div className="categories">
		<ul>
			{data && data.map((item, i) => {
				return <li 
							onClick={() => setCategory(i)} 
							className={activeCategory === i ? 'active' : ''}
							key={i}
						>
							{item}</li>
			})}
		</ul>
	</div>
	)
});

export default Categories;