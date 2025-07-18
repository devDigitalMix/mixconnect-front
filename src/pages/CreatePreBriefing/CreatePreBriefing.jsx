/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import { Input } from "../../components/Input/Input";
import { marked } from "marked";
import {
  createPropostaService,
  findPropostaById,
  updatePropostaService,
} from "../../services/propostaService";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { getPlansService } from "../../services/planService";
import { userLogged } from "../../services/employeeService";
import { UserContext } from "../../Context/UserContent";
import { PropostaContainer } from "../PropostaCreate/PropostaCreateStyled";
import { createClientService } from "../../services/clientService";
import {
  PreBriefingContainer,
  TelaCarregamento,
} from "./CreatePreBriefingStyled";
import {
  preBriefingIA,
  savePrebriefing,
} from "../../services/preBriefingService";

export function CreatePreBriefing() {
  const [received, setReceived] = useState(false);
  const [proposta, setProposta] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [analise, setAnalise] = useState(false);
  const [jaInveste, setJaInveste] = useState(false);
  const [telaCarregamento, setTelaCarregamento] = useState(false);
  const [response, setResponse] = useState("");
  const [response2, setResponse2] = useState("");
  const [dados, setDados] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const lightRef = useRef(null);
  const orbRef = useRef(null);

  async function handleCreatePreBriefing(event) {
    setTelaCarregamento(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.clientId = proposta.clientId;
    setDados(data);
    const response = await preBriefingIA(data);
    setResponse(marked(response.data[0]));
    setResponse2(marked(response.data[1]));
  }

  async function retry() {
    setTelaCarregamento(true);
    setResponse("");
    setResponse2("");
    const response = await preBriefingIA(dados);
    setResponse(marked(response.data[0]));
    setResponse2(marked(response.data[1]));
  }

  async function createPreBriefingService() {
    const info = dados;
    info.textoIA = response;
    info.listaIA = response2;
    await savePrebriefing(info);
    navigate(`/home/client/${proposta.clientId}`);
  }

  async function getProposta() {
    const response = await findPropostaById(id);

    setProposta(response.data);
    setReceived(true);
  }

  const handleAnaliseChange = (e) => {
    const valor = e.target.value === "true"; // converte string para boolean
    setAnalise(valor);
  };
  const handleJaInvesteChange = (e) => {
    const valor = e.target.value === "true"; // converte string para boolean
    setJaInveste(valor);
  };

  useEffect(() => {
    getProposta();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // Orb segue o mouse
      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${x - 10}px, ${y - 10}px)`;
      }

      // Luz é deslocada em relação ao centro
      if (lightRef.current) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const offsetX = (x - centerX) * 0.6;
        const offsetY = (y - centerY) * 0.6;
        lightRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.2)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return received ? (
    <>
      <PreBriefingContainer
        onSubmit={handleCreatePreBriefing}
        className={!telaCarregamento ? "" : "esconde"}
      >
        <div className="section">
          <div className="campo">
            <label htmlFor="name">Empresa</label>
            <Input type="text" name="name" value={proposta.name} readOnly />
          </div>
          <div className="campo">
            <label htmlFor="whatsapp">Whatsapp</label>
            <Input
              type="text"
              name="whatsapp"
              value={proposta.whatsapp}
              readOnly
            />
          </div>
          <div className="campo">
            <label htmlFor="plan">Plano</label>
            <Input type="text" name="plan" value={proposta.plan} readOnly />
          </div>
          <div className="campo">
            <label htmlFor="consultor">Consultor</label>
            <Input
              type="text"
              name="consultor"
              value={proposta.consultor}
              readOnly
            />
          </div>
          <div className="campo">
            <label htmlFor="respComercial">Responsável Comercial</label>
            <Input
              type="text"
              name="respComercial"
              defaultValue={proposta.respComercial}
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="respOnboarding">Responsável Onboarding</label>
            <Input
              type="text"
              name="respOnboarding"
              placeholder="Responsável Onboarding"
            />
          </div>
        </div>
        {(proposta.google > 0 ||
          proposta.meta > 0 ||
          proposta.tikTok > 0 ||
          proposta.linkedin > 0) && (
          <div className="section">
            {proposta.google > 0 && (
              <div className="ligados">
                <div className="campo">
                  <label htmlFor="google">Google ADS</label>
                  <Input
                    type="text"
                    name="google"
                    value={proposta.google}
                    readOnly
                  />
                </div>
                <img src="/ligadoimg.svg" />
                <Input
                  type="text"
                  name="googleSugestion"
                  placeholder="Valor sugerido"
                />
              </div>
            )}
            {proposta.meta > 0 && (
              <div className="ligados">
                <div className="campo">
                  <label htmlFor="meta">Meta ADS</label>
                  <Input
                    type="text"
                    name="meta"
                    value={proposta.meta}
                    readOnly
                  />
                </div>
                <img src="/ligadoimg.svg" />
                <Input
                  type="text"
                  name="metaSugestion"
                  placeholder="Valor sugerido"
                />
              </div>
            )}
            {proposta.tikTok > 0 && (
              <div className="ligados">
                <div className="campo">
                  <label htmlFor="tikTok">Tik Tok ADS</label>
                  <Input
                    type="text"
                    name="tikTok"
                    value={proposta.tikTok}
                    readOnly
                  />
                </div>
                <img src="/ligadoimg.svg" />
                <Input
                  type="text"
                  name="tikTokSugestion"
                  placeholder="Valor sugerido"
                />
              </div>
            )}
            {proposta.linkedin > 0 && (
              <div className="ligados">
                <div className="campo">
                  <label htmlFor="linkedin">Linkedin ADS</label>
                  <Input
                    type="text"
                    name="linkedin"
                    value={proposta.linkedin}
                    readOnly
                  />
                </div>
                <img src="/ligadoimg.svg" />
                <Input
                  type="text"
                  name="linkedinSugestion"
                  placeholder="Valor sugerido"
                />
              </div>
            )}

            <div className={analise ? "ligados active" : "ligados"}>
              <div className="campo">
                <label htmlFor="analise">Análise&nbsp;de&nbsp;Conta</label>
                <select name="analise" onChange={handleAnaliseChange}>
                  <option value={false}>Não</option>
                  <option value={true}>Sim</option>
                </select>
              </div>
              {analise && (
                <>
                  <img src="/ligadoimg.svg" />
                  <Input
                    type="text"
                    name="tecQueAvaliou"
                    placeholder="Técnico que avaliou"
                  />
                </>
              )}
            </div>

            <div className={jaInveste ? "ligados active" : "ligados"}>
              <div className="campo">
                <label htmlFor="jaInveste">Cliente&nbsp;já&nbsp;Investe</label>
                <select name="jaInveste" onChange={handleJaInvesteChange}>
                  <option value={false}>Não</option>
                  <option value={true}>Sim</option>
                </select>
              </div>
              {/* {jaInveste && <img src="/ligadoimg.svg" />} */}
              {jaInveste && (
                <>
                  <img src="/ligadoimg.svg" />
                  <Input
                    type="text"
                    name="investeValorePlataforma"
                    placeholder="Valor e Plataforma"
                  />
                </>
              )}
            </div>
            <div className="campo">
              <label htmlFor="siteAtual">Site do Cliente</label>
              <Input
                type="text"
                name="siteAtual"
                style={{ width: 327 }}
                placeholder="https://"
              />
            </div>
            <div className="infos">
              <div className="campo">
                <label htmlFor="regiaoAnuncio">Região de Anúncio</label>
                <textarea
                  name="regiaoAnuncio"
                  placeholder="Insira mais informações"
                />
              </div>
              <div className="campo">
                <label htmlFor="experienciaCliente">
                  Experiência do Cliente
                </label>
                <textarea
                  name="experienciaCliente"
                  placeholder="Insira mais informações"
                />
              </div>
              <div className="campo">
                <label htmlFor="publicoAlvoTrafego">Público Alvo</label>
                <textarea
                  name="publicoAlvoTrafego"
                  placeholder="Insira mais informações"
                />
              </div>
              <div className="campo">
                <label htmlFor="objetivoTrafego">Objetivo</label>
                <textarea
                  name="objetivoTrafego"
                  placeholder="Insira mais informações"
                />
              </div>
              <div className="campo">
                <label htmlFor="infoTrafego">Outras Informações</label>
                <textarea
                  name="infoTrafego"
                  placeholder="Insira mais informações"
                />
              </div>
            </div>
          </div>
        )}

        {(proposta.site > 0 ||
          proposta.mixtree > 0 ||
          proposta.smart > 0 ||
          proposta.catalogo > 0 ||
          proposta.lp > 0) && (
          <div className="section">
            {proposta.site > 0 && (
              <div className="campo">
                <label htmlFor="site">Site Completo</label>
                <Input type="text" name="site" value={proposta.site} readOnly />
              </div>
            )}
            {proposta.dobrasSite > 0 && (
              <div className="campo">
                <label htmlFor="dobrasSite">Dobras</label>
                <Input
                  type="text"
                  name="dobrasSite"
                  value={proposta.dobrasSite}
                  readOnly
                />
              </div>
            )}
            {proposta.secoesSite > 0 && (
              <div className="campo">
                <label htmlFor="secoesSite">Seções</label>
                <Input
                  type="text"
                  name="secoesSite"
                  value={proposta.secoesSite}
                  readOnly
                />
              </div>
            )}
            {proposta.mixtree > 0 && (
              <div className="campo">
                <label htmlFor="mixtree">Mixtree</label>
                <Input
                  type="text"
                  name="mixtree"
                  value={proposta.mixtree}
                  readOnly
                />
              </div>
            )}

            {proposta.catalogo > 0 && (
              <div className="campo">
                <label htmlFor="catalogo">Catálogo</label>
                <Input
                  type="text"
                  name="catalogo"
                  value={proposta.catalogo}
                  readOnly
                />
              </div>
            )}
            {proposta.dobrasCatalogo > 0 && (
              <div className="campo">
                <label htmlFor="dobrasCatalogo">Dobras</label>
                <Input
                  type="text"
                  name="dobrasCatalogo"
                  value={proposta.dobrasCatalogo}
                  readOnly
                />
              </div>
            )}
            {proposta.smart > 0 && (
              <div className="campo">
                <label htmlFor="smart">Page Smart</label>
                <Input
                  type="text"
                  name="smart"
                  value={proposta.smart}
                  readOnly
                />
              </div>
            )}
            {proposta.secoesSmart > 0 && (
              <div className="campo">
                <label htmlFor="secoesSmart">Seções</label>
                <Input
                  type="text"
                  name="secoesSmart"
                  value={proposta.secoesSmart}
                  readOnly
                />
              </div>
            )}
            {proposta.lp > 0 && (
              <div className="campo">
                <label htmlFor="lp">LP</label>
                <Input type="text" name="lp" value={proposta.lp} readOnly />
              </div>
            )}
            {proposta.secoesLp > 0 && (
              <div className="campo">
                <label htmlFor="secoesLp">Seções</label>
                <Input
                  type="text"
                  name="secoesLp"
                  value={proposta.secoesLp}
                  readOnly
                />
              </div>
            )}

            <div className="campo">
              <label>Site do Cliente</label>
              <Input
                type="text"
                style={{ width: 327 }}
                placeholder="https://"
              />
            </div>
            <div className="campo">
              <label htmlFor="referenciaRedes">
                Redes Sociais de Referência
              </label>
              <Input
                type="text"
                name="referenciaRedes"
                style={{ width: 327 }}
                placeholder="Redes Sociais de Referência"
              />
            </div>
            <div className="campo">
              <label htmlFor="sitesReferencia">Sites de Referência</label>
              <Input
                type="text"
                name="sitesReferencia"
                style={{ width: 327 }}
                placeholder="Sites de Referência"
              />
            </div>
            <div className="infos">
              <div className="campo">
                <label htmlFor="secoesDobrasDesejadas">
                  Seções ou Dobras Desejadas
                </label>
                <textarea
                  name="secoesDobrasDesejadas"
                  placeholder="Insira mais informações"
                />
              </div>
              <div className="campo">
                <label htmlFor="sobreDominio">
                  Informações sobre o Domínio
                </label>
                <textarea
                  name="sobreDominio"
                  placeholder="Insira mais informações"
                />
              </div>
              <div className="campo">
                <label htmlFor="publicoAlvoSite">Público Alvo</label>
                <textarea
                  name="publicoAlvoSite"
                  placeholder="Insira mais informações"
                />
              </div>
              <div className="campo">
                <label htmlFor="infoSite">Outras Informações</label>
                <textarea
                  name="infoSite"
                  placeholder="Insira mais informações"
                />
              </div>
            </div>
          </div>
        )}

        <div className="section">
          <div className="campo">
            <label htmlFor="referenciaLogotipo">Referências</label>
            <Input
              type="text"
              name="referenciaLogotipo"
              placeholder="Referencia logo"
            />
          </div>
          <div className="infos">
            <div className="campo">
              <label htmlFor="papelaria">Papelaria</label>
              <textarea
                name="papelaria"
                placeholder="Insira mais informações"
              />
            </div>
            <div className="campo">
              <label htmlFor="publicoAlvoLogo">Público Alvo</label>
              <textarea
                name="publicoAlvoLogo"
                placeholder="Insira mais informações"
              />
            </div>
            <div className="campo">
              <label htmlFor="infoLogotipo">Outras Informações</label>
              <textarea
                name="infoLogotipo"
                placeholder="Insira mais informações"
              />
            </div>
            <div className="campo">
              <label htmlFor="sobreEmpresa">Sobre a Empresa</label>
              <textarea
                name="sobreEmpresa"
                placeholder="Insira mais informações"
              />
            </div>
          </div>
        </div>
        {proposta.gmb > 0 && (
          <div className="section">
            <div className="campo">
              <label htmlFor="gmb">Perfil(s)</label>
              <Input
                type="text"
                name="gmb"
                defaultValue={proposta.gmb}
                placeholder="Gmb"
              />
            </div>
            <div className="campo">
              <label htmlFor="possuiGmb">Já Possui Perfil?</label>
              <select name="possuiGmb">
                <option value={false}>Não</option>
                <option value={true}>Sim</option>
              </select>
            </div>
            <div className="campo">
              <label htmlFor="linkGmb">Link do Perfil</label>
              <Input
                type="text"
                name="linkGmb"
                style={{ width: 327 }}
                placeholder="https://"
              />
            </div>
            <div className="campo">
              <label htmlFor="infoGmb">Outras Informações</label>
              <textarea name="infoGmb" placeholder="Insira mais Informações" />
            </div>
          </div>
        )}
        {proposta.posts > 0 && (
          <div className="section">
            <div className="ligados active">
              <div className="campo">
                <label htmlFor="posts">Quantidade&nbsp;de&nbsp;Criativos</label>
                <Input type="text" name="posts" defaultValue={proposta.posts} />
              </div>
              <img src="/ligadoimg.svg" alt="" />
              <Input
                type="text"
                name="redesPosts"
                placeholder="Em quais redes serão publicadas"
              />
            </div>
            <div className="campo">
              <label htmlFor="linkRede">Link do Perfil</label>
              <Input type="text" name="linkRede" placeholder="https://" />
            </div>
            <div className="infos">
              <div className="campo">
                <label htmlFor="publicoAlvoRedes">Público Alvo</label>
                <textarea
                  name="publicoAlvoRedes"
                  placeholder="Insira mais informações"
                />
              </div>
              <div className="campo">
                <label htmlFor="objetivoRedes">Objetivo</label>
                <textarea
                  name="objetivoRedes"
                  placeholder="Insira mais informações"
                />
              </div>
              <div className="campo">
                <label htmlFor="infoRedes">Outras Informações</label>
                <textarea
                  name="infoRedes"
                  placeholder="Insira mais informações"
                />
              </div>
            </div>
          </div>
        )}
        {proposta.nVisitas > 0 && (
          <div className="section">
            <div className="campo">
              <label htmlFor="nVisitas">Visitas ao Mês</label>
              <Input
                type="text"
                name="nVisitas"
                value={proposta.nVisitas}
                readOnly
              />
            </div>
            <div className="campo">
              <label htmlFor="tempoCap">Tempo de Captação</label>
              <Input
                type="text"
                name="tempoCap"
                value={proposta.tempoCap + " horas"}
                readOnly
              />
            </div>
            <div className="campo">
              <label htmlFor="localCaptacao">Local da Captação</label>
              <Input
                type="text"
                name="localCaptacao"
                placeholder="Onde ocorrerão as captações"
              />
            </div>
            <div className="infos">
              <div className="campo">
                <label htmlFor="publicoAlvoAeV">Público Alvo</label>
                <textarea
                  name="publicoAlvoAeV"
                  placeholder="Insira mais Informações"
                />
              </div>
              <div className="campo">
                <label htmlFor="objetivoAeV">Objetivo</label>
                <textarea
                  name="objetivoAeV"
                  placeholder="Insira mais Informações"
                />
              </div>
              <div className="campo">
                <label htmlFor="infoAeV">Outras Informações</label>
                <textarea
                  name="infoAeV"
                  placeholder="Insira mais Informações"
                />
              </div>
            </div>
          </div>
        )}
        <div className="campo">
          <label htmlFor="outrasInfos">Informações Adicionais</label>
          <textarea name="outrasInfos" placeholder="Insira mais Informações" />
        </div>

        <button className="btn">Enviar</button>
      </PreBriefingContainer>
      <TelaCarregamento className={telaCarregamento ? "active" : ""}>
        {response !== "" && response2 !== "" ? (
          <div className="guarda-response">
            <div
              className="chat"
              dangerouslySetInnerHTML={{ __html: response }}
            />
            <div
              className="chat"
              dangerouslySetInnerHTML={{ __html: response2 }}
            />
            <div>
              <button onClick={retry} className="btn">
                Retry
              </button>
              <button onClick={createPreBriefingService}>Salvar</button>
            </div>
          </div>
        ) : (
          <>
            <h3>Isso pode demorar um pouco.</h3>
            <span id="light" ref={lightRef}>
              Gerando...
            </span>
          </>
        )}
      </TelaCarregamento>
    </>
  ) : null;
}
