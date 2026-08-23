import React from "react";
import styled from "styled-components";

const Input = ({
  id,
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <StyledWrapper>
      <div className="input-container">
        <input
          id={id}
          type="text"
          name={id}
          className="text-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        <label htmlFor={id}>{label}</label>

        <button type="button" className="edit-button">
          <span className="material-symbols-outlined">
            edit
          </span>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;

  .input-container {
    width: min(100%, 25rem);
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;
  }

  .input-container label {
    color: var(--warna-text);
    position: relative;
    top: 0.125rem;
    border: solid var(--warna-border);
    border-top: none;
    border-right: none;
    border-left: none;
    width: fit-content;
    transition: transform 0.2s;

    margin: 0 0 0 clamp(0.5rem, 1vw, 0.75rem);
    padding: 0 clamp(0.2rem, 0.5vw, 0.25rem);

    font-size: clamp(0.8rem, 1.5vw, 1.25rem);
    font-family: var(--font-body);
  }

  .input-container input {
    width: 100%;

    border: clamp(0.0625rem, 0.15vw, 0.125rem) solid
      var(--warna-border);

    border-radius: clamp(0.35rem, 1vw, 0.5rem);

    padding: clamp(0.5rem, 1.5vw, 0.75rem)
      clamp(2.5rem, 6vw, 2.8rem)
      clamp(0.5rem, 1.5vw, 0.75rem)
      clamp(0.65rem, 1.5vw, 0.75rem);

    background-color: #22282A;
    color: var(--warna-text);
    box-sizing: border-box;

    font-size: clamp(0.8rem, 1.5vw, 1rem);
    font-family: var(--font-body);
  }

  /* Chrome autofill */
  .input-container input:-webkit-autofill,
  .input-container input:-webkit-autofill:hover,
  .input-container input:-webkit-autofill:focus {
    -webkit-text-fill-color: var(--warna-text);
    -webkit-box-shadow: 0 0 0 1000px #22282A inset;
    box-shadow: 0 0 0 1000px #22282A inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  .input-container input:focus {
    outline: none;
    border-color: var(--warna-main);
  }

  .input-container input:focus + label {
    color: var(--warna-text);
    transform: translateX(clamp(0.25rem, 1vw, 0.5rem));
  }

  .edit-button {
    position: absolute;
    right: clamp(0.5rem, 1.5vw, 0.75rem);
    bottom: clamp(0.5rem, 1.5vw, 0.7rem);

    border: none;
    background: transparent;
    color: var(--warna-text);

    padding: clamp(0.1rem, 0.5vw, 0.2rem);
    cursor: pointer;
  }

  .edit-button:hover {
    color: var(--warna-main);
  }

  .edit-button .material-symbols-outlined {
    font-size: clamp(1rem, 2vw, 1.25rem);
  }
`;

export default Input;