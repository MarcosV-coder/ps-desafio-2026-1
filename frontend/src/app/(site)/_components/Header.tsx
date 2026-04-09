import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.css';
import ThemeToggle from "./ThemeToggle";
export default function Header (){
    return (
        <header className={styles.header}> 
                <div className={styles.container}>
                    <Image
                    src = "/assets/images/logo.png"
                    alt = "logo"
                    width = {100}
                    height = {100} 
                    />
                <div className={styles.searchWrapper}>
                    <input type="text" placeholder="Buscar..." className={styles.fakeSearch} disabled />
                </div> 
                <div className={styles.headerLinks}>
                    <Link href = "/" className = {styles.headerLink}> Home</Link>
                    <Link href = "/promotions"  className ={styles.headerLink}> Promoções</Link>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.utilities}>
                    <ThemeToggle />
                    <Link href="/admin" className={styles.adminButton}><i className="fa-solid fa-gear"></i></Link>
                </div>
            </div>
        </header>
    )
}