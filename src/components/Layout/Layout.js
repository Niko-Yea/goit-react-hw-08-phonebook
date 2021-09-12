import styles from './styles.module.scss'
const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>{children}</div>
  );
}
export default Layout
