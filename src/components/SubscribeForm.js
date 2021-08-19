import React, { useState } from 'react';
import styled from 'styled-components';
import addToMailchimp from 'gatsby-plugin-mailchimp';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  text-transform: uppercase;

  button {
    padding: 0.5em 1em;
    border: 3px solid var(--color-white);
    color: var(--color-white);
    background-color: var(--color-red);
    font-size: 20px;
    border-radius: 36px;
    text-transform: uppercase;
    cursor: pointer;
    min-width: 150px;

    &:disabled {
      background-color: rgba(19, 1, 1, 0.3);
      border: 3px solid rgba(195, 195, 195, 0.3);
      color: rgba(255, 255, 255, 0.3);
    }
  }
`;

const InputField = styled.input`
  padding: 0.5em 1em;
  line-height: 1;
  border-radius: 36px;
  width: 30%;
  border: 3px solid var(--color-white);
  color: var(--color-white);
  background-color: var(--color-red);
  font-size: 20px;

  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #ddd;
    opacity: 1; /* Firefox */
  }
`;

export default function SubscribeForm() {
  const [saving, setSaving] = useState(false);
  const [state, setState] = useState({
    email: '',
    errorMessage: '',
    successMessage: '',
  });

  function handleInputChange(event) {
    const {
      target: { value, name },
    } = event;
    setState({
      ...state,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const result = await addToMailchimp(state.email);
    setSaving(false);
    if (result.result === 'success') {
      setState({
        ...state,
        successMessage: result.msg,
        email: '',
        errorMessage: '',
      });
    } else {
      setState({ ...state, errorMessage: result.msg });
      setTimeout(() => setState({ ...state, errorMessage: '' }), 6000);
    }
  }

  function resetForm() {
    setState({
      ...state,
      email: '',
      successMessage: '',
      errorMessage: '',
    });
  }

  return (
    <>
      {state.successMessage ? (
        <>
          <div
            style={{
              backgroundColor: '#16a085',
              color: 'var(--color-white)',
              padding: 10,
              marginBottom: '1.5rem',
              borderRadius: 4,
              fontSize: 16,
            }}
            dangerouslySetInnerHTML={{ __html: state.successMessage }}
          />
          <a href='#0' onClick={resetForm} style={{ color: '#fff' }}>
            add more?
          </a>
        </>
      ) : (
        <>
          {state.errorMessage && (
            <div
              style={{
                backgroundColor: 'var(--color-white)',
                color: 'var(--color-red)',
                padding: 10,
                marginBottom: '1.5rem',
                width: 300,
                borderRadius: 4,
                fontSize: 16,
              }}
              dangerouslySetInnerHTML={{ __html: state.errorMessage }}
            />
          )}
          <form
            name='subscribeForm'
            method='POST'
            id='subscribe-form'
            onSubmit={handleSubmit}
          >
            <Wrapper>
              <p>Newsletter</p>
              <InputField
                disabled={saving}
                type='email'
                name='email'
                placeholder='Email...'
                value={state.email}
                onChange={handleInputChange}
              />

              <button type='submit' disabled={saving}>
                {saving ? `Saving...` : `Subscribe`}
              </button>
            </Wrapper>
          </form>
        </>
      )}
    </>
  );
}
