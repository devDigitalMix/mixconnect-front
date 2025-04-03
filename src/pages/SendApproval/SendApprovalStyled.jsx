import styled from "styled-components";

export const SendApprovalStyled = styled.section`
  width: 100%;
  max-width: 1200px;
  display: grid;
  justify-items: center;
  gap: 40px;
  margin: 50px 0;
  background-color: #00000036;
  padding: 30px;
  border: 1px solid var(--main);
  border-radius: 10px;
  .images {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    align-items: start;
    img {
      max-width: 350px;
    }
  }
`;

export const SendApprovalHeader = styled.header`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  justify-items: center;
  h2 {
    font-size: 1.4rem;
    font-family: var(--font2);
    font-weight: 600;
  }
`;

export const ApprovalForm = styled.form`
  max-width: 500px;
  width: 100%;
  display: grid;
  gap: 10px;
  textarea {
    background-color: var(--dark);
    border: 1px solid var(--main);
    height: 100px;
    resize: vertical;
    padding: 5px;
    padding-left: 8px;
    border-radius: 6px;
  }
  .approvalBtns {
    display: flex;
  }
`;

export const ApprovalRespondido = styled.div`
  #respondido {
    background-color: var(--dark);
    border: 2px solid var(--main);
    padding: 20px;
    right: 50%;
    top: 50%;
    border-radius: 10px;
    text-align: center;
    position: fixed;
    transform: translate(50%, -50%);
  }
`;
