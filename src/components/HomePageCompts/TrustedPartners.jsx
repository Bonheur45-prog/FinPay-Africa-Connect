import React from 'react'
import styles from './TrustedPartners.module.css'

export function TrustedPartners() {

    const partners = [
        {   name: 'Equity Bank',
            logo: 'https://www.nsi-monetique.com/wp-content/uploads/2020/08/equity-logo.png',
        },
        {
            name: 'Ecobank',
            logo: 'https://www.nsi-monetique.com/wp-content/uploads/2020/08/Ecobank_Logo.png',
        },
        {
            name: 'Urwego Bank',
            logo: 'https://www.nsi-monetique.com/wp-content/uploads/2020/08/logo-nbr.jpeg',
        },
        {
            name: 'Bank of Kigali',
            logo: 'https://www.nsi-monetique.com/wp-content/uploads/2019/05/client_NSI_2.jpg',
        },
        {
            name: 'Access Bank',
            logo: 'https://www.nsi-monetique.com/wp-content/uploads/2020/08/Access_Bank_DRCLogo.png',
        },
        {
            name: 'Bank Of Africa',
            logo: 'https://www.nsi-monetique.com/wp-content/uploads/2020/08/Bank_of_africa-logo.png',
        },
        {
            name: 'Zigama CSS',
            logo: 'https://www.nsi-monetique.com/wp-content/uploads/2020/08/logo-zigama.png',
        },
        {
            name: 'Cogebanque',
            logo: 'https://www.nsi-monetique.com/wp-content/uploads/2020/08/Logo-cogebank.png',
        },
        {
            name: 'Goshen Microfinance',
            logo: 'https://www.nsi-monetique.com/wp-content/uploads/2020/08/goshen-logo.png',
        },
        {
            name: 'Copedu PLC',
            logo: 'https://www.nsi-monetique.com/wp-content/uploads/2020/08/logo-plc.png',
        }
    ];
  return (
    <div className={styles['trusted-partners']}>
        <div className={styles['trusted-header']}>
            <h2> Our Platform Trusted by Leading Financial Institutions
            </h2>
            <p className={styles['trusted-welcomen-paragraph']}>Join the ranks of top-tier financial institutions that rely on our platform for secure and efficient payment processing.</p>
        </div>
        <div className={styles['trusted-companies']}>
            {partners.map((partner, index) => (
               <div className={styles["trusted-companies-logo"]}
               key={index}>
                <img src={partner.logo} alt="Partner 1" />
            </div> 
            ))}
        </div>
        
    </div>
  )
}