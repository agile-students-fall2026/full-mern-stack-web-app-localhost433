import { useState, useEffect } from 'react';
import axios from 'axios';
import './AboutUs.css';
import loadingIcon from './loading.gif';

export default function AboutUs() {
  const [about, setAbout] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    axios
      .get(`${import.meta.env.VITE_SERVER_HOSTNAME}/about`)
      .then((response) => {
        if (!ignore) setAbout(response.data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoaded(true);
      });
    return () => {
      ignore = true;
    };
  }, []);

  if (!loaded) {
    return <img src={loadingIcon} alt="loading" />;
  }

  if (error) {
    return <p className="AboutUs-error">{error}</p>;
  }

  return (
    <>
      <h1>{about.name}</h1>
      <img className="AboutUs-photo" src={about.imageUrl} alt={about.name} />
      {about.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </>
  );
}