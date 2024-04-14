import { useState, useRef } from 'react';
import styles from './Upload.module.css';
import leftIcon from '/src/assets/Left.png';
import rightIcon from '/src/assets/Right.png';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";


const Upload = () => {
    const [files, setFiles] = useState({
        front: null,
        back: null
    });
    const [base64Images, setBase64Images] = useState({
        front_side: null,
        back_side: null
    });
    const fileInputRefs = {
        front: useRef(null),
        back: useRef(null)
    };

    const navigate = useNavigate();
    const uploadImagesToServer = async (base64Images) => {
        try {
            const response = await axios.post('https://188.124.37.121.sslip.io/api/v1/ml/recognize', base64Images);
            console.log('Response from server:', response.data);
            localStorage.setItem('serverResponse', JSON.stringify(response.data));
            navigate('/result');
            return response.data;
            // Если сервер отправляет какие-либо данные в ответ, вы можете вернуть их здесь
        } catch (error) {
            console.error('Error uploading images:', error);
            throw error; // Можно обработать ошибку здесь или передать ее вызывающей функции для обработки
        }
    };

    const handleFileSelect = (event, type) => {
        const selectedFile = event.target.files[0];
        setFiles(prevFiles => ({
            ...prevFiles,
            [type]: selectedFile
        }));

        const reader = new FileReader();
        reader.onload = () => {
            const base64WithoutHeader = reader.result.split(',')[1];
            setBase64Images(prevImages => ({
                ...prevImages,
                [type + '_side']: base64WithoutHeader
            }));
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleUpload = (type) => {
        fileInputRefs[type].current.click();
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.navigateOne}>
                    <div className={styles.centr}>
                        <img src={leftIcon} alt="left icon"/>
                        <Link to={"/"} className={styles.left}>Назад</Link>
                    </div>
                </div>
                <div className={styles.navigateTwo}>
                    <div className={styles.centr}>
                        <Link to={"/photo"} className={styles.right}>Далее</Link>
                        <img src={rightIcon} alt="right icon"/>
                    </div>
                </div>
            </div>
            <div className={styles.title}>Загрузите фотографии</div>
            <div className={styles.description}>Загрузите фотографии лицевой стороны и стороны с составом в формате jpg,
                png
            </div>
            <div className={styles.uploadFace}>
                <div className={styles.textUpload}>Лицевая сторона</div>
                <div>
                    {files.front ? (
                        <p className={styles.nameFile}>{files.front.name} <p className={styles.name}>Успешно загружен</p></p>
                    ) : (
                        <form onClick={() => handleUpload('front')}>
                            <input
                                ref={fileInputRefs.front}
                                className="inputField"
                                type="file"
                                accept="image/*"
                                onChange={(event) => handleFileSelect(event, 'front')}
                                hidden
                            />
                            <p> + Добавить файл</p>
                        </form>
                    )}
                </div>
            </div>
            <div className={styles.uploadBack}>
                <div className={styles.textUpload}>Состав</div>
                <div>
                    {files.back ? (
                        <p className={styles.nameFile}>{files.back.name} <p className={styles.name}>Успешно загружен</p></p>
                    ) : (
                        <form onClick={() => handleUpload('back')}>
                            <input
                                ref={fileInputRefs.back}
                                className="inputField"
                                type="file"
                                accept="image/*"
                                onChange={(event) => handleFileSelect(event, 'back')}
                                hidden
                            />
                            <p> + Добавить файл</p>
                        </form>
                    )}
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => uploadImagesToServer(base64Images)}>Отправить на сервер</button>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button}>Ввести вручную</button>
            </div>
        </div>
    );
};

export default Upload;

