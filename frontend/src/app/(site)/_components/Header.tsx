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
                <div className={styles.headerLinks}>
                    <Link href = "/" className = {styles.headerLink}> Produtos</Link>
                    <Link href = "/"  className ={styles.headerLink}> Categorias</Link>
                </div>
                <ThemeToggle>
                </ThemeToggle>
            </div>
        </header>
    )
}