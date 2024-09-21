import api from "../plugins/axios/index"

export const getRealEstates = async () => { return await api.get('/real-estates') }
