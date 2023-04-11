import React, { useState } from 'react';

const FavoriteCityTask = (props) => {
    const [favoriteCities, setFavoriteCities] = useState([]);


    const addFavoriteCity = (cityName) => {
        setFavoriteCities([...favoriteCities, cityName]);
    };

    const removeFavoriteCity = (index) => {
        const newFavoriteCities = [...favoriteCities];
        newFavoriteCities.splice(index, 1);
        setFavoriteCities(newFavoriteCities);
    };

    const setCity = (city) => {
        props.sendCity(city);
    }

    return (
        <div>
            <h2>Favorite Cities:</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const city = e.target.elements.city.value;
                    if (city) {
                        addFavoriteCity(city);
                        e.target.elements.city.value = '';
                    }
                }}
            >
                <label htmlFor="city"></label>
                <input type="text" id="city"
                       placeholder='Enter City Name'/>
                <button type="submit" className={'add-button'}>Add</button>
            </form>
            <ul className={'items-container'}>
                {favoriteCities.map((city, index) => (
                    <li className={'list-item'} key={index}>
                        <button className={'favourite-city-name'} onClick={() => setCity(city)}>{city}{' '}</button>
                        <button className={'remove-button'} onClick={() => removeFavoriteCity(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FavoriteCityTask;
