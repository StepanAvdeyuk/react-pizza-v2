import React from 'react'
import { useDispatch } from 'react-redux';
import { setSearch } from '../../redux/slices/searchSlice';
import debounce from 'lodash.debounce';

import style from './Search.module.scss';
import close from '../../img/close.png';

const Search: React.FC = () => {
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const updateValue = React.useCallback(
        debounce((value) => {
            dispatch(setSearch(value))
        }, 250)
    , []);

    const setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    React.useEffect(() => {
        updateValue(inputValue);
    }, [inputValue])

    const setAndClose = () => {
        setInputValue('');
        inputRef.current?.focus();
    }

    return (
    <div className={style.root}>
        <input 
            ref={inputRef}
            type="text" 
            placeholder='Поиск пиццы...'
            value={inputValue}
            onChange={setInput}
            />
        {inputValue ? <img onClick={setAndClose} src={close} className={style.close}/> : null}
    </div>
    )
}

export default Search;