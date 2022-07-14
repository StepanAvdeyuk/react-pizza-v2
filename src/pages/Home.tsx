import React from 'react'
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setFilters } from '../redux/slices/filterSlice';
import { fetchPizza } from '../redux/slices/pizzaSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {

	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const activeCategory = useSelector((state: RootState) => state.filter.categoryId);
	const sortBy = useSelector((state: RootState) => state.filter.sort);
	const searchValue = useSelector((state: RootState) => state.search.search);
	const {items, status} = useSelector((state: RootState) => state.pizza)
	const activePage = useSelector((state: RootState) => state.filter.activePage);

	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))
			dispatch(setFilters(params));
			isSearch.current = true;
		}
		
	}, [])

	const setPizzas = () => {
		const category = activeCategory ? `&category=${activeCategory}` : '';
		const sort = `&sortBy=${sortBy.sortBy}&order=desc`;
		const filter = `&name=${searchValue}`;
		const pagination = `&page=${activePage + 1}&limit=4`;

		dispatch(fetchPizza({
			pagination,
			category,
			sort,
			filter
		}));
	}

	React.useEffect(() => {
		if (!isSearch.current) {
			setPizzas();
		}
		isSearch.current = false;
	}, [activeCategory, sortBy, activePage, searchValue])

	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				activeCategory,
				sortBy,
				activePage,
			})
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [activeCategory, sortBy, activePage])

	return (
	<div className="container">
		<div className="content__top">
				<Categories activeCategory={activeCategory}/>
				<Sort/>
				</div>
				<h2 className="content__title">Все пиццы</h2>
				<div className="content__items">
					{status === 'loading' ? 
						[...new Array(6)].map((_, i) => {
							return <Skeleton key={i}/>
						})
						:
						items && items.map(({name, price, imageUrl, id, types, sizes, rating}) => {
							return <PizzaBlock
												id={id}
												name={name} 
												price={price} 
												imageUrl={imageUrl} 
												key={id}
												rating={rating}
												types={types}
												sizes={sizes}
												/>
							
						})}
		
				</div>
				<Pagination/>
	</div>
	)
}

export default Home;