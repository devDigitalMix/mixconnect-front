import styled from "styled-components";

export const PreBriefingContainer = styled.form`
  display: grid;
  padding: 20px 10px 50px;
  justify-items: start;
  flex-wrap: wrap;
  max-width: 1200px;
  width: 100%;
  gap: 35px;
  .ligados {
    display: flex;
    gap: 0;
    align-items: end;
    position: relative;
    &.active {
      max-width: 470px;
      width: 100%;
    }
  }
  .campo {
    display: grid;
    gap: 2px;
    label {
    }
    input {
      max-width: 327px;
      width: 100%;
    }
    textarea {
      min-width: 452px;
      min-height: 98px;
      background-color: #f9f8fe;
      border: none;
      border-radius: 5px;
      padding: 10px;
      color: var(--dark);
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

  .section {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    .infos {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      gap: 27px;
      .campo:nth-child(odd):last-child {
        max-width: 935px;
        width: 100%;
        & textarea {
          max-width: 935px;
          width: 100%;
        }
      }
    }
  }
`;
