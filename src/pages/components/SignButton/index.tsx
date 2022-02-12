import React from 'react'
import styles from './styles.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export default function SignButton() {
    const isUserLoggedIn = true;

    return isUserLoggedIn ? (
        <button
        type='button'
        className={styles.signButton}>
        <FaGithub  color='#04d361' />
        Júlio César
        <FiX color='#737380' className={styles.closeIcon}/>
    </button>
    ) : (
        <button
        type='button'
        className={styles.signButton}>
        <FaGithub  color='#eba417' />
        Sign in wuth Github
    </button>
    )
}
