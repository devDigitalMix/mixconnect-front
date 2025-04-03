/* eslint-disable no-unused-vars */
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ClientApprovalBody,
  ClientApprovalContainer,
  ClientApprovalHeader,
  CreateApprovalModal,
  FileContainer,
} from "./ClientApprovalStyled";
import { useEffect, useState } from "react";
import { getClientById } from "../../services/clientService";
import { Input } from "../../components/Input/Input";
import {
  createApprovalService,
  getApprovalByClient,
} from "../../services/approvalService";

export function ClientApproval() {
  const { id } = useParams();
  const [client, setClient] = useState({});
  const [clientApproval, setClientApproval] = useState({});
  const [createApproval, setCreateApproval] = useState(false);
  const [files, setFiles] = useState([{ id: Date.now(), preview: null }]);
  const navigate = useNavigate();

  async function getApproval() {
    const response = await getApprovalByClient(id);
    setClientApproval(response.data.results);
  }

  async function handleCreateApproval(event) {
    event.preventDefault();

    const formdata = new FormData();

    files
      .filter((fileObj) => fileObj.file) // Filtra apenas os objetos que possuem arquivos reais
      .forEach((fileObj) => {
        formdata.append("items", fileObj.file); // Adiciona cada arquivo com a chave "items"
      });

    // Adiciona outros dados do formulário ao FormData
    formdata.append("name", event.target.name.value); // Nome da aprovação
    formdata.append("clientName", client.name); // Nome do cliente

    try {
      const response = await createApprovalService(id, formdata); // Envia o FormData diretamente
      if (response.status === 201) {
        getApproval(); // Atualiza a lista de approvals
        setCreateApproval(false); // Fecha o modal
        setFiles([{ id: Date.now(), preview: null }]); // Reseta os arquivos
      } else {
        alert("Erro ao criar aprovação.");
      }
    } catch (error) {
      console.error("Erro ao criar aprovação:", error);
      alert("Erro ao criar aprovação. Tente novamente.");
    }
  }

  function handleFileChange(event, fileId) {
    const file = event.target.files[0];
    if (!file) return;

    const type = file.type;
    const formats = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!formats.includes(type)) {
      alert("Esse formato não é permitido!");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onloadend = function () {
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === fileId ? { ...f, preview: fileReader.result, file } : f
        )
      );
    };
    fileReader.readAsDataURL(file);
  }

  function addFileInput() {
    setFiles((prevFiles) => [...prevFiles, { id: Date.now(), preview: null }]);
  }

  function removeFileInput(fileId) {
    setFiles((prevFiles) => prevFiles.filter((f) => f.id !== fileId));
  }

  useEffect(() => {
    getApproval();
    async function fetchData() {
      const response = await getClientById(id);
      setClient(response.data);
    }
    fetchData();
  }, []);

  return (
    <ClientApprovalContainer>
      <ClientApprovalHeader>
        <img
          src="/voltar.svg"
          alt="voltar"
          title="Voltar"
          className="img-effect"
          id="voltar"
          onClick={() => navigate(-1)}
        />
        <h1>{client.name}</h1>
        <img
          src="/mais.svg"
          className="img-effect"
          onClick={() => setCreateApproval(!createApproval)}
          alt="adicionar"
          title="Adicionar Aprovação"
        />
      </ClientApprovalHeader>
      <CreateApprovalModal
        onSubmit={handleCreateApproval}
        encType="multipart/form-data"
        className={createApproval ? "active" : ""}
      >
        <label htmlFor="name">Nome:</label>
        <Input type="text" name="name" required />
        <FileContainer>
          {files.map((file) => (
            <div key={file.id} style={{ position: "relative" }}>
              <label
                htmlFor={`file-${file.id}`}
                style={{
                  background: `url(${file.preview}) no-repeat center center / cover`,
                }}
                className="image-label"
              >
                <div id="drop-file">
                  <p>Selecione um arquivo ou solte aqui.</p>
                </div>
                <input
                  type="file"
                  id={`file-${file.id}`}
                  name={`file-${file.id}`}
                  required
                  onChange={(e) => handleFileChange(e, file.id)}
                />
              </label>
              <button
                type="button"
                onClick={() => removeFileInput(file.id)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                }}
              >
                <img src="/cancel.svg" alt="" />
              </button>
            </div>
          ))}
        </FileContainer>
        <button type="button" onClick={addFileInput}>
          <img
            src="/mais.svg"
            alt="Adicionar Arquivo"
            title="Adicionar Arquivo"
          />
        </button>
        <button type="submit" className="btn">
          Enviar
        </button>
      </CreateApprovalModal>
      <ClientApprovalBody>
        {clientApproval.length > 0 ? (
          clientApproval.map((approval, index) => (
            <Link
              key={index}
              to={"/home/approval/" + approval.id}
              className={
                approval.approved ? "approved" : approval.denied ? "denied" : ""
              }
            >
              <div>
                <img src={approval.item[0]} alt={approval.name} />
              </div>
            </Link>
          ))
        ) : (
          <p>Nenhuma aprovação encontrada.</p>
        )}
      </ClientApprovalBody>
    </ClientApprovalContainer>
  );
}
