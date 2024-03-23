import axios from "../../utils/Axios";
export {removetv} from "../reducers/tvSlice"
import { loadtv } from "../reducers/tvSlice"


export const asyncloadtv = (id) => async (dispatch, getstate) => {

    try{
        const detail = await axios.get(`/tv/${id}`);
        const externalid = await axios.get(`/tv/${id}/external_ids`);
        const recommendatons = await axios.get(`/tv/${id}/recommendations`);
        const similar = await axios.get(`/tv/${id}/similar`);
        const translations = await axios.get(`/tv/${id}/translations`);
        const videos = await axios.get(`/tv/${id}/videos`);
        const watchproviders = await axios.get(`/tv/${id}/watch/providers`);

        let theultimatedetais = { 
            detail: detail.data,
            externalid: externalid.data,
            recommendatons: recommendatons.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find((m)  => m.type === "Trailer"),
            watchproviders: watchproviders.data.results.IN,
            translations : translations.data.translations.map((t) => t.english_name),
        }

        dispatch(loadtv(theultimatedetais))

    }
    catch(error){
        console.log("Erro", error)
    }
}

 