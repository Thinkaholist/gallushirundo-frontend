import React, { useState } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';

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
              width: 300,
              borderRadius: 4,
              fontSize: 16,
            }}
            dangerouslySetInnerHTML={{ __html: state.successMessage }}
          />
          <a href='#0' onClick={resetForm}>
            add more?
          </a>
        </>
      ) : (
        <>
          {state.errorMessage && (
            <div
              style={{
                backgroundColor: 'rgba(211,84,0, 0.8)',
                color: 'var(--color-white)',
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
            <div>
              <label>
                <span>Newsletter: </span>
                <input
                  disabled={saving}
                  type='email'
                  name='email'
                  placeholder='Email...'
                  value={state.email}
                  onChange={handleInputChange}
                  style={{
                    padding: '0.5em',
                    lineHeight: 1,
                    borderRadius: 3,
                    width: '30%',
                    border: '0 solid #cad1dc',
                    backgroundColor: '#f1f3f6',
                    borderWidth: 1,
                    fontSize: 18,
                  }}
                />
              </label>
            </div>
            <button className='button' type='submit' disabled={saving}>
              {saving ? `Saving...` : `Subscribe`}
            </button>
          </form>
        </>
      )}
    </>
  );
}
