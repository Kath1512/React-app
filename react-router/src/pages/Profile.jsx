import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import './loading.css'
import loaderGif from '../assets/loader.gif';
export default function Profile() {
    const [profile, setProfile] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const API_URL = `https://jsonplaceholder.typicode.com/users/${id}`;
        const fetchProfile = async () => {
            const response = await fetch(API_URL);
            const newProfile = await response.json();
            setProfile(newProfile);
        }
        const timeoutId = setTimeout(fetchProfile, 3000);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [id])

    console.log(id);
    console.log(profile);

    return (
        <>
            {profile.name ? (
                <div>
                    <h1>Hello {profile.name}  </h1>
                    <h2>Username: {profile.username}</h2>
                    <h2>Address: {`${profile.address.suite}, ${profile.address.street}, ${profile.address.city
                        }`}</h2>
                </div>
            ) : (
                <div id="loading">
                    <h1>Loading.....</h1>
                </div>
            )}
        </>
    );
}