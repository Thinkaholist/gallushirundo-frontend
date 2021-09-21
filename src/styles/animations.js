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

export const rotateInfinite = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

export const bimbam = keyframes`
	from {
		transform: rotate(-10deg)
	}
	
	to {
		transform: rotate(10deg)
	}
`;
