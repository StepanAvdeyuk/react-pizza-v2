import React from 'react'
import ReactPaginate from 'react-paginate';

import { useDispatch } from 'react-redux';
import { setActivePage } from '../../redux/slices/filterSlice';
 
import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
  
const dispatch = useDispatch();

	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel="→"
			onPageChange={(e) => dispatch(setActivePage(e.selected))}
			pageRangeDisplayed={4}
			pageCount={3}
			previousLabel="←"
		/>
	)
}

export default Pagination;