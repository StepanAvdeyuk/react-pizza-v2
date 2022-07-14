import React, { useCallback } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { setSort } from '../redux/slices/filterSlice';
import {RootState} from '../redux/store';

type DataSort = {
	name: string;
	sortBy: string;
} 

const data: DataSort[] = [{name: 'популярности', sortBy: 'rating'}, {name: 'цене', sortBy: 'price'}, {name: 'алфавиту', sortBy: 'name'}];

const Sort = React.memo(() => {

	const sortRef = React.useRef<HTMLDivElement>(null);

	const dispatch = useDispatch();

	const sortBy = useSelector((state: RootState) => state.filter.sort)

	const [isVisible, setIsVisible] = React.useState(false);

	React.useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const _e = e as MouseEvent & {
				path: Node[];
			}

			if (sortRef.current && !_e.path.includes(sortRef.current)) {
				setIsVisible(false);
			}
		}	
		document.body.addEventListener('click', handleClick)
		return () => {
			document.body.removeEventListener('click', handleClick)
		}
	}, [])

	const toggleVisible = React.useCallback(() => {
		setIsVisible(!isVisible);
	}, []);

	const setAndClose = (sortBy: DataSort) => {
		dispatch(setSort(sortBy));
		toggleVisible();
	}

	return (
	<div className="sort" ref={sortRef}>
				<div className="sort__label">
					<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					>
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
					</svg>
					<b>Сортировка по:</b>
					<span onClick={toggleVisible}>{sortBy.name}</span>
				</div>
				{isVisible && 
					<div className="sort__popup">
						<ul>
						{data && data.map((item) => {
							return <li onClick={() => setAndClose(item)} className={item.sortBy === sortBy.sortBy ? 'active' : ''}>{item.name}</li>
						})}
						</ul>
					</div>
				}
	</div>
	)
});

export default Sort