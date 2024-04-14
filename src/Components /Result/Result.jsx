import {useEffect, useState} from 'react';
import styles from './Result.module.css';
import leftIcon from "../../assets/Left.png";
import {Link} from "react-router-dom";
import positive from '../../assets/positive.png';
import negative from '../../assets/negative.png';
import norm from '../../assets/norm.png';
import nenorm from '../../assets/nenorm.png';


const Result = () => {
    const [data, setData] = useState([]);
    const [rule, setRule] = useState([])

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('serverResponse'));
        console.log(storedData);
        if (storedData) {
            setData(storedData.product);
            setRule(storedData)
        }
    }, []);


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
                        <Link to={"/photo"} className={styles.right}>Готово</Link>
                    </div>
                </div>
            </div>
            <div className={styles.markerContainer}>
                <div className={styles.marker}>Продукт рекомендован детям к употреблению</div>
                <div className={styles.markirovka}>
                    <div className={styles.nazvanie}>Маркировка</div>
                    <div className={styles.borderNazvanie}>1 - 3 года</div>
                </div>
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <tbody className={styles.tablebody}>
                    <tr className={styles.grey}>
                        <td className={styles.naming} >Сахар</td>
                        <td>{data && data.HasSugar ? data.HasSugar : '-'}</td>
                        <td>{data.HasSugar ? (<img src={nenorm} alt="norm"/>) : (<img src={norm} alt="nenorm"/>)}</td>
                    </tr>
                    <tr>
                        <td className={styles.naming}>Соль</td>
                        <td>{data && data.HasSodium ? data.HasSodium : '-'}</td>
                        <td>{data.HasSodium ? (<img src={nenorm} alt="norm"/>) : (<img src={norm} alt="nenorm"/>)}</td>
                    </tr>
                    <tr>
                        <td className={styles.naming}>Натрий</td>
                        <td>{data && data.HasSubSugar ? data.HasSubSugar : '-'}</td>
                        <td>{data.HasSubSugar ? (<img src={nenorm} alt="norm"/>) : (<img src={norm} alt="nenorm"/>)}</td>
                    </tr>
                    <tr>
                        <td className={styles.naming}>Белки</td>
                        <td>{data && data.proteins ? data.proteins : '-'}</td>
                        <td>{data.proteins ? (<img src={norm} alt="norm"/>) : (<img src={nenorm} alt="nenorm"/>)}</td>
                    </tr>
                    <tr>
                        <td className={styles.naming}>Жиры</td>
                        <td>{data && data.fats ? data.fats : '-'}</td>
                        <td>{data.Hasfats ? (<img src={nenorm} alt="norm"/>) : (<img src={norm} alt="nenorm"/>)}</td>
                    </tr>
                    <tr>
                        <td className={styles.naming}>Углеводы</td>
                        <td>{data && data.carbohydrates ? data.carbohydrates : '-'}</td>
                        <td>{data.carbohydrates ? (<img src={norm} alt="norm"/>) : (<img src={nenorm} alt="nenorm"/>)}</td>
                    </tr>
                    <tr>
                        <td className={styles.naming}>ГМО</td>
                        <td>{data && data.HasGMO ? data.HasGMO : '-'}</td>
                        <td>{data.HasGMO ? (<img src={nenorm} alt="norm"/>) : (<img src={norm} alt="nenorm"/>)}</td>
                    </tr>
                    <tr>
                        <td className={styles.naming}>Энергетическая ценность</td>
                        <td>{data && data.energy ? data.energy : '-'}</td>
                        <td>{data.energy ? (<img src={norm} alt="norm"/>) : (<img src={nenorm} alt="nenorm"/>)}</td>
                    </tr>
                    </tbody>
                </table>
                <div className={styles.marketing}>
                    <div>Маркетинговые подписи</div>
                    {data.hasMarketingLabels ? (
                        <img src={positive} alt="Positive Image" />
                    ) : (
                        <img src={negative} alt="Negative Image" />
                    )}
                </div>
                <div className={styles.sostav}>
                    <div>Полный состав: </div>
                    <div className={styles.scrollableBox}>
                        {data && data.composition ? data.composition : 'Здесь вы можете увидеть полный состав продукта'}
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.button}>Выгрузить отчет</button>
                </div>
            </div>
        </div>
    )
}

export default Result;