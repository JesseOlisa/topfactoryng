import React, { PropsWithChildren } from 'react';

import { motion } from 'framer-motion';

const Transition = ({ children }: PropsWithChildren) => (
	<motion.div
		initial={{ y: 10, opacity: 0.5 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: -10, opacity: 0 }}
		transition={{
			duration: 0.23,
		}}
		className='hide-scrollbar overflow-hidden'
	>
		{children}
	</motion.div>
);

export default Transition;
