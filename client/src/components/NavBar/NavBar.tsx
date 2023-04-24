import styles from './NavBar.module.scss'

const NavBar = () => {
  return (
    <>
    <div className={styles.main}>
        <h1>Bookler</h1>
        <p className={styles.icon}>Hamburger</p>
    </div>
    <div className={styles.line}></div>
    </>
  )
}

export default NavBar