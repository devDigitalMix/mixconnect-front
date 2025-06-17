import styled from "styled-components";

export const PreBriefingContainer = styled.form`
  display: flex;
  align-items: end;
  padding: 20px 10px 50px;
  justify-content: start;
  flex-wrap: wrap;
  max-width: 1200px;
  width: 100%;
  gap: 15px;
  .ligados {
    display: flex;
    gap: 0;
    align-items: end;
    position: relative;
  }
  .campo {
    display: grid;
    gap: 2px;
    max-width: 327px;
    width: 100%;
    input {
      max-width: 327px;
      width: 100%;
    }
    textarea {
      max-width: 452px;
      width: 100%;
      background-color: #f9f8fe;
      border: none;
      border-radius: 5px;
      padding: 10px;
    }
    select {
      background-color: #f9f8fe !important;
      border-radius: 5px;
      font-style: italic;
      color: var(--dark);
      padding: 8px 10px;
      max-width: 300px;
      resize: vertical;
      outline: none;
      border: none;
      height: 40px;
      width: 100%;
    }
    option {
      font-style: normal;
    }
    input,
    textarea,
    option {
      font-family: var(--font2);
    }
  }
  .chat {
    margin-top: 10px;
    background-color: #292929;
    padding: 20px;
    border-radius: 10px;
    display: grid;
    gap: 10px;
    a {
      display: inline;
    }
  }
`;
