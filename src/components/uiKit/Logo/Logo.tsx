import React from 'react';

import Image from 'next/image';

import portalLogo from "../../../../public/logo.png";
import css from "./Logo.module.sass";

const Logo = React.forwardRef<HTMLDivElement>((props, ref) => {
	return (
		<div className={css.logo} ref={ref}>
			<Image src={portalLogo} alt={"3D"} width={40} height={40}/>
			<div className={css.logoTextWrapper}>
				<span className={css.logoText}>{"portal"}</span>
			</div>
		</div>
	);
})

Logo.displayName = "3Dportal Logo"

export default Logo;