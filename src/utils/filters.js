// Czyste funkcje filtrowanie, sortowanie, reduce danych

// FILTROWANIE (Array.filter)

export const filterBySearch = (cars, searchTerm) => {
    if (!searchTerm.trim()) return cars;
    const term = searchTerm.toLowerCase().trim();
    return cars.filter(
        (car) =>
            car.brand.toLowerCase().includes(term) ||
            car.model.toLowerCase().includes(term)
    );
};

export const filterByBrand = (cars, brand) => {
    if (!brand || brand === 'Wszystkie') return cars;
    return cars.filter((car) => car.brand === brand);
};

export const filterByFuelType = (cars, fuelType) => {
    if (!fuelType || fuelType === 'Wszystkie') return cars;
    return cars.filter((car) => car.fuelType === fuelType);
};

export const filterByPriceRange = (cars, minPrice, maxPrice) => {
    return cars.filter(
        (car) => car.price >= minPrice && car.price <= maxPrice
    );
};

export const filterByYearRange = (cars, minYear, maxYear) => {
    return cars.filter(
        (car) => car.year >= minYear && car.year <= maxYear
    );
};

export const filterByMinHorsepower = (cars, minHP) => {
    if (!minHP) return cars;
    return cars.filter((car) => car.horsepower >= minHP);
};

export const filterByAvailability = (cars, onlyAvailable) => {
    if (!onlyAvailable) return cars;
    return cars.filter((car) => car.isAvailable === true);
};

// SORTOWANIE (spread + Array.sort)

export const sortCars = (cars, sortBy) => {
    const sorted = [...cars];
    switch (sortBy) {
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);
        case 'hp-asc':
            return sorted.sort((a, b) => a.horsepower - b.horsepower);
        case 'hp-desc':
            return sorted.sort((a, b) => b.horsepower - a.horsepower);
        case 'year-asc':
            return sorted.sort((a, b) => a.year - b.year);
        case 'year-desc':
            return sorted.sort((a, b) => b.year - a.year);
        case 'name-asc':
            return sorted.sort((a, b) =>
                `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`)
            );
        case 'name-desc':
            return sorted.sort((a, b) =>
                `${b.brand} ${b.model}`.localeCompare(`${a.brand} ${a.model}`)
            );
        default:
            return sorted;
    }
};

// REDUCE (Array.reduce)

export const calculateAveragePrice = (cars) => {
    if (cars.length === 0) return 0;
    const total = cars.reduce((sum, car) => sum + car.price, 0);
    return Math.round(total / cars.length);
};

export const calculateTotalHorsepower = (cars) => {
    return cars.reduce((sum, car) => sum + car.horsepower, 0);
};

export const findMostExpensive = (cars) => {
    if (cars.length === 0) return null;
    return cars.reduce((max, car) => (car.price > max.price ? car : max));
};

export const findMostPowerful = (cars) => {
    if (cars.length === 0) return null;
    return cars.reduce((max, car) =>
        car.horsepower > max.horsepower ? car : max
    );
};

export const countByFuelType = (cars) => {
    return cars.reduce((acc, car) => {
        acc[car.fuelType] = (acc[car.fuelType] || 0) + 1;
        return acc;
    }, {});
};

// MAPOWANIE (Array.map)

export const formatPrice = (price) => {
    return price.toLocaleString('pl-PL') + ' PLN';
};

export const getFullName = (car) => `${car.brand} ${car.model}`;

export const mapToSummary = (cars) => {
    return cars.map((car) => ({
        name: getFullName(car),
        price: formatPrice(car.price),
        power: `${car.horsepower} KM`,
        fuel: car.fuelType,
        available: car.isAvailable ? 'Tak' : 'Nie',
    }));
};

// KOMPOZYCJA FILTRÓW pattern pipe

export const applyAllFilters = (cars, filters) => {
    let result = cars;
    result = filterBySearch(result, filters.search);
    result = filterByBrand(result, filters.brand);
    result = filterByFuelType(result, filters.fuelType);
    result = filterByPriceRange(result, filters.priceRange[0], filters.priceRange[1]);
    result = filterByYearRange(result, filters.yearRange[0], filters.yearRange[1]);
    result = filterByMinHorsepower(result, filters.minHorsepower);
    result = filterByAvailability(result, filters.onlyAvailable);
    result = sortCars(result, filters.sortBy);
    return result;
};

// EKSTRAKCJA UNIKALNYCH WARTOŚCI (map + Set)

export const getUniqueBrands = (cars) => {
    return [...new Set(cars.map((car) => car.brand))].sort();
};

export const getUniqueFuelTypes = (cars) => {
    return [...new Set(cars.map((car) => car.fuelType))];
};