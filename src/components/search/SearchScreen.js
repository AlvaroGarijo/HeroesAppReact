
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForm"
import { getHeroByName } from "../../selectors/getHeroByName";
import { HeroCard} from "../hero/HeroCard"


export const SearchScreen = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [formValues, handleInputChange] = useForm({
        searchText: '',
        })

    const {searchText} = formValues;
    const heroesFilter = getHeroByName('ALGO POR AQUI')


    const handleSearch = (e) =>{
        e.preventDefault();
        console.log(searchText);
        navigate(`?=q${searchText}`)
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
                        heroesFilter.map(hero => (
                            <HeroCard key={hero.id}
                            {...hero}
                            />
                        ))
                    }

                </div>
            </div>
        </>
    )
}
