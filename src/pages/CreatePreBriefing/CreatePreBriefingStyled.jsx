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

  transition: all.8s;

  &.esconde {
    transform: translate(-110%) scale(0.1);
    height: 1px;
  }
`;

export const TelaCarregamento = styled.section`
  display: none;
  &.active {
    display: inherit;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    transform: translateY(-100px);
    & > h3 {
      margin: 0 auto;
      /* margin-top: 60px; */
      /* position: relative;
      top: 130px; */
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      background-color: #eee;
      color: #151515;
      padding: 10px;
      border-radius: 10px;
      display: flex;
      align-items: center;
    }
    #light {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100px;
      height: 100px;
      background: #151515;
      border-radius: 50%;
      box-shadow: 0 0 180px 90px var(--main);
      transform: translate(-50%, -50%);
      pointer-events: none;
      transition: all 0.1s ease;
      animation: light 4s infinite;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: var(--font);
    }
    @keyframes light {
      50% {
        box-shadow: 0 0 40px 20px var(--main);
      }
    }

    .guarda-response {
      max-width: 1200px;
      margin: 30px auto;
      background-color: var(--dark);
      padding: 30px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      gap: 50px;
    }
  }
`;
