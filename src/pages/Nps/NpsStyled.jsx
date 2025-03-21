import styled from "styled-components";

export const NpsContainer = styled.section`
  background: var(--dark);
  padding: 30px;
  border-radius: 10px;
  border: 1px solid var(--main);
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  .img-effect {
    position: absolute;
    top: 10px;
    left: 10px;
  }
`;

export const NpsItem = styled.div`
  display: grid;
  gap: 15px;

  h2 {
    text-shadow: 0px 0px 8px var(--main), 0px 0px 8px var(--main);
    font-size: 1.7rem;
  }
  h5 {
    font-weight: 700;
    font-size: 1.2rem;
  }
  .nota {
    font-family: var(--font2);
  }
  div {
    p {
      font-family: var(--font2);
      font-size: 1.1rem;
    }
  }
`;
