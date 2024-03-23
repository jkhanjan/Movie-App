import axios from "../../utils/Axios";
export {removemovie} from "../reducers/movieSlice"
import { loadmovie } from "../reducers/movieSlice"


export const asyncloadmovie = (id) => async (dispatch, getstate) => {

    try{
        const detail = await axios.get(`/movie/${id}`);
        const externalid = await axios.get(`/movie/${id}/external_ids`);
        const recommendatons = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`);
        const translations = await axios.get(`/movie/${id}/translations`);
        const videos = await axios.get(`/movie/${id}/videos`);
        const watchproviders = await axios.get(`/movie/${id}/watch/providers`);

        let theultimatedetais = { 
            detail: detail.data,
            externalid: externalid.data,
            recommendatons: recommendatons.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find((m)  => m.type === "Trailer"),
            watchproviders: watchproviders.data.results.IN,
            translations : translations.data.translations.map((t) => t.english_name),
        }

        dispatch(loadmovie(theultimatedetais))

    }
    catch(error){
        console.log("Erro", error)
    }
}

