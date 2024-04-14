import { useState, useRef } from 'react'
import './App.css'
import {Camera} from "react-camera-pro"
import axios from 'axios'
import styles from "./Components /Result/Result.module.css";
import leftIcon from "./assets/Left.png";
import {Link} from "react-router-dom";



const App = () => {
    const camera = useRef(null);
    const [numberOfCameras, setNumberOfCameras] = useState(0);
    const [image, setImage] = useState(null);
    const [photos, setPhotos] = useState([]);

    const sendPhoto = async () => {
        try {
            const formData = new FormData();
            photos.forEach((photo, index) => {
                formData.append(`photo${index + 1}`, photo);
            })
            await axios.post('http://localhost:3000/uploadphotos',formData )
            console.log('Снимки успешно отправлены')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="App">
            <div className={styles.header}>
                <div className={styles.navigateOne}>
                    <div className={styles.centr}>
                        <img src={leftIcon} alt="left icon"/>
                        <Link to={"/"} className={styles.left}>Назад</Link>
                    </div>
                </div>
                <div className={styles.navigateTwo}>
                    <div className={styles.centr}>
                        <Link to={"/photo"} className={styles.right}>Готово</Link>
                    </div>
                </div>
            </div>
            <div className="camera-container">
                <Camera ref={camera} numberOfCamerasCallback={setNumberOfCameras} aspectRatio={4 / 3}/>
            </div>
            <div className={styles.button}>
                <button
                    onClick={() => {
                        const photo = camera.current.takePhoto();
                        setPhotos(prevPhotos => [...prevPhotos, photo]); // Сохраняем снимок в массив
                    }}
                >
                    Сфотографируйте этикетку
                </button>
            </div>
            <div className={styles.button}>
                <button onClick={sendPhoto}>
                    Отправьте свое личико нам на сервер
                </button>
            </div>
            <button
                hidden={numberOfCameras <= 1}
                onClick={() => {
                    camera.current.switchCamera();
                }}
            >
                Сменить камеру
            </button>
        </div>
    )
}


export default App
