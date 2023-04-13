export default class CountryService {

    async getCountries() {
        const response = await fetch('data/countries.json');
        const json = await response.json();
        return json.data;
    }
}
