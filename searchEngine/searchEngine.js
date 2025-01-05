class InMemorySearch {
    constructor() {
        this.lstMap = new Map();
    }

    addDocuments(key, ...documents) {
        let prev = [];

        if (this.lstMap.has(key)) prev = this.lstMap.get(key);

        this.lstMap.set(key, [...prev, ...documents]);
    }

    search(key, filter, keyOrder) {
        if (!this.lstMap.has(key)) return [];
        let documents = this.lstMap.get(key);

        let filterDocuments = documents.filter((item) => filter(item));

        const { key: field, asc } = keyOrder;

        if (keyOrder) {
            return filterDocuments.sort((a, b) => {
                if (asc) {
                    return a[field] - b[field];
                }
                return b[field] - a[field];
            });
        }
        return filterDocuments;
    }
}

const searchEngine = new InMemorySearch();
searchEngine.addDocuments(
    'Movies',
    { name: 'Avenger', rating: 8.5, year: 2017 },
    { name: 'Jhon Wick 4', rating: 8.2, year: 2023 },
    { name: 'Black Panther', rating: 9.0, year: 2022 },
    { name: 'Black Adam', rating: 8.7, year: 2022 }
);
console.log(
    searchEngine.search('Movies', (e) => e.rating > 8.5, {
        key: 'rating',
        asc: true,
    })
);
