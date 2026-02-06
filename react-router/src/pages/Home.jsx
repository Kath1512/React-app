import { useEffect, useState } from "react";
import { Link, Links, useParams } from "react-router-dom";

function Home () { 
    const [profiles, setProfiles] = useState([]);
    useEffect(() => {
        const API_URL = `https://jsonplaceholder.typicode.com/users`;
        const fetchProfiles = async () => {
            const response = await fetch(API_URL);
            const newProfiles = await response.json();
            setProfiles(newProfiles);
        }
        fetchProfiles();
    }, [])

    return(
        <div>
            <h1>Home</h1>
            <nav>
                <ul>
                    {profiles.map((profile) => {
                        return(
                            <Link to={`/profiles/${profile.id}`} key={profile.id}><li >{profile.name}</li></Link>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default Home;