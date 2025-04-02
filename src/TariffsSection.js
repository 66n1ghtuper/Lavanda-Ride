import React from 'react';
import { useTranslation } from 'react-i18next'; 
import './TariffsSection.css'; 
import icon from './dd.png'; 
import iconS from './ssssss.png'; 

const TariffsSection = () => {
    const { t } = useTranslation(); 

    return (
        <section className="tariffs-section">
            <div className="curved-background">
                <h2>{t('Tariffs.tariffs')}</h2> 
                <div className="isl">
                   
                    <div className="icon-circle">
                        <img src={icon} alt="Иконка" className="icon" />
                    </div>
                    
                    <div className="icon-circle-second">
                        <img src={iconS} alt="Иконка" className="icon" />
                    </div>
                    <p>
                        {t('Tariffs.description')} 
                    </p>
                </div>
            </div>
        </section>
    );
};

export default TariffsSection;
