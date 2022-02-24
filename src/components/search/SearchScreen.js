import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string"

import { useForm } from "../../hooks/useForm"
import { getHeroByName } from "../../selectors/getHeroByName";
import { HeroCard} from "../hero/HeroCard"


export const SearchScreen = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const {q = ''} = queryString.parse(location.search);

    const [formValues, handleInputChange] = useForm({
        searchText: q,
        });

    const {searchText} = formValues;

    const heroesFileted = useMemo( () => getHeroByName(q), [q] );


    const handleSearch = (e) =>{
        e.preventDefault();
        navigate(`?q=${searchText}`)
    }


    return (
        <>
            <h1>Búsquedas</h1>
            <hr/>
            <div className="row">
                <div className="col-5">
                    <h4>¡Busca a tu héroe favorito!</h4>
                    <hr/>
                    <form onSubmit={handleSearch}>
                        <input
                        type="text"
                        placeholder="Buscar Héroe"
                        className="form-control"
                        name="searchText"
                        autoComplete="off"
                        value= {searchText}
                        onChange={handleInputChange}
                        />

                    <button
                    className="btn btn-outline-primary mt-2"
                    type="submit">
                        Buscar...
                    </button>    
                    </form>

                </div>
                <div className="col-7">
                    <h4>Resultados</h4>
                    <hr/>

                    {
                        ( q === '' )
                            ? <div className="alert alert-info"> Buscar un Héroe</div>
                            : (heroesFileted.lenght === 0)
                            && <div className="alert alert-danger"> No hay Resultados: {q}</div>
                    }

                    {
                        heroesFileted.map(hero => (
                            <HeroCard 
                                key={ hero.id }
                                { ...hero }
                            />
                        ))
                    }

                </div>
            </div>
        </>
    )
}
