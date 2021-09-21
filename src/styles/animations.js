import { keyframes } from 'styled-components';

export const arrowBounceLeft = keyframes`
	from {
		transform: translateX(0);
	}

	50% {
		transform: translateX(-30%);

	}

	to {
		transform: translateX(0);
	}
`;

export const arrowBounceRight = keyframes`
	from {
		transform: translateX(0);
	}

	50% {
		transform: translateX(30%);

	}

	to {
		transform: translateX(0);
	}
`;
