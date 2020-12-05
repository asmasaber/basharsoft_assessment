import apisauce from "apisauce";
import ApiConfig from "./Configs";

const Api = apisauce.create({
  baseURL: ApiConfig.baseURL,
  headers: { Accept: "application/json; charset=UTF-8" }
});

export default {
  lookups: {
    country: () => Api.get('countries'),
    city: ({countryId}) => Api.get(`country/${countryId}/city`),
    area: ({countryId, cityId}) => Api.get(`country/${countryId}/city/${cityId}/area`),
  },
};