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
    console.log(result);
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
      {state.successMessage ? (
        <>
          <div dangerouslySetInnerHTML={{ __html: state.successMessage }} />
          <a href='#0' onClick={resetForm}>
            add more?
          </a>
        </>
      ) : (
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
              />
            </label>
          </div>
          <button className='button' type='submit' disabled={saving}>
            {saving ? `Saving...` : `Subscribe`}
          </button>
        </form>
      )}
      {state.errorMessage && (
        <div dangerouslySetInnerHTML={{ __html: state.errorMessage }} />
      )}
    </>
  );
}