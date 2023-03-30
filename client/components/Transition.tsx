import React, { PropsWithChildren } from 'react';

import { motion } from 'framer-motion';

const Transition = ({ children }: PropsWithChildren) => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0, x: -200 }}
		transition={{
			ease: [0.45, 0.25, 0.6, 0.95],
			duration: 0.26,
		}}
	>
		{children}
	</motion.div>
);

export default Transition;
