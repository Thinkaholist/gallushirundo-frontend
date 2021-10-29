import React, { useEffect } from 'react';
import { ContainerStyles } from '../styles/ContainerStyles';
import { navigate } from 'gatsby';

export default function QrCodePage() {
  useEffect(() => {
    navigate('/post/bohemian-betyars-release');
  }, []);

  return (
    <>
      <ContainerStyles>
        <p>Redirecting...</p>
      </ContainerStyles>
    </>
  );
}
