//importando o css modular dando nome global para as classes (styles)
//depois acessa as classes usando styles.nomeDaClasse

import styles from './Header.module.css';
import igniteLogo from '../assets/ignite-logo.svg'; //criei uma variavel que representa o recurso

export function Header() {
    return (
        <header className={styles.header}>
            <img src={igniteLogo} alt="logotipo do ignite"/>
            <strong>Ignite Feed</strong>
        </header>

    )
}