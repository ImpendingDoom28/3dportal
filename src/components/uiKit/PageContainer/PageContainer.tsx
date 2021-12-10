import React from 'react';

import css from './PageContainer.module.sass';

const PageContainer: React.FC = ({ children }) => {
	return (
		<div className={css.container}>
			{children}
		</div>
	);
}

export default PageContainer;