import React, { useState } from 'react';
import styled from 'styled-components';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import { QUERIES } from '../constants';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
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

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--color-red-hover);
      }
    }

    @media ${QUERIES.mobileAndDown} {
      border-radius: 16px;
    }
  }

  @media ${QUERIES.mobileAndDown} {
    flex-direction: column;
    align-items: revert;
    gap: 1rem;
    text-align: center;
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

  @media ${QUERIES.mobileAndDown} {
    width: 100%;
    border-radius: 16px;
  }
`;

const FeedbackBox = styled.div`
  border: 4px dashed var(--color-red-hover);
  padding: 2rem;
  background-color: var(--color-red-light);
  color: var(--color-black);
  border-radius: 28px;
  position: fixed;
  bottom: 2rem;
  left: 1rem;
  right: 1rem;
  transform: ${(p) =>
    p.feedback ? 'translateY(0%)' : 'translateY(calc(100% + 2rem))'};
  transition: 0.35s ease-out;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;

  @media ${QUERIES.mobileAndDown} {
    text-align: center;
  }
`;

const FeedbackButton = styled.button`
  border: none;
  font-size: 18px;
  padding: 12px 24px;
  background-color: var(--color-red);
  border-radius: 12px;
  color: var(--color-white);
  cursor: pointer;
  margin-top: 2rem;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: var(--color-red-hover);
    }
  }
`;

export default function SubscribeForm() {
  const [saving, setSaving] = useState(false);
  const [state, setState] = useState({
    email: '',
    errorMessage: '',
    successMessage: '',
  });
  const isFeedback = state.errorMessage || state.successMessage;

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
    resetForm();
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
      <FeedbackBox feedback={isFeedback}>
        <div
          dangerouslySetInnerHTML={{
            __html: state.errorMessage || state.successMessage,
          }}
        />
        <FeedbackButton onClick={resetForm}>OK</FeedbackButton>
      </FeedbackBox>
    </>
  );
}
