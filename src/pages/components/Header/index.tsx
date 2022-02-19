import React from 'react'
import SignButton from '../SignButton';
import styles from './styles.module.scss';

export default function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img alt="ig.news" src="/images/logo.svg"  />
                <nav>
                    <a className={styles.active}>Home</a>
                    <a>Posts</a>
                </nav>
                <SignButton />
            </div>
        </header>
    )
}
