import styles from "./navigation.module.scss";
import Logo from "../assets/img/logo.svg";
import Avatar from "../assets/img/avatar.png";

// Libraries
import { NavLink } from "react-router-dom";
import { MdViewList, MdLocalMovies, MdLiveTv, MdBookmark } from "react-icons/md";

const Navigation: React.FC = () => {
	return (
		<nav className={styles.navigation}>
			<div>
				<img src={Logo} alt="" className={styles.logo} />
			</div>
			<ul className={styles.list}>
				<li>
					<NavLink to="/" end className={({ isActive }) => (isActive ? ` ${styles.active} ` : `${styles.inactive}`)}>
						<MdViewList className={styles.icon} />
					</NavLink>
				</li>
				<li>
					<NavLink to="/media/movies" end className={({ isActive }) => (isActive ? ` ${styles.active}  active` : `${styles.inactive}`)}>
						<MdLocalMovies className={styles.icon} />
					</NavLink>
				</li>
				<li>
					<NavLink to="/media/series" end className={({ isActive }) => (isActive ? ` ${styles.active}  active` : `${styles.inactive}`)}>
						<MdLiveTv className={styles.icon} />
					</NavLink>
				</li>
				<li>
					<NavLink to="/media/bookmarked" end className={({ isActive }) => (isActive ? ` ${styles.active}  active` : `${styles.inactive}`)}>
						<MdBookmark className={styles.icon} />
					</NavLink>
				</li>
			</ul>
			<div className={styles.avatar_container}>
				<img src={Avatar} alt="user avatar" className={styles.avatar} />
			</div>
		</nav>
	);
};

export default Navigation;
