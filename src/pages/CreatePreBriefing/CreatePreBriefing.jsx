/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
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
import { PreBriefingContainer } from "./CreatePreBriefingStyled";

export function CreatePreBriefing() {
  const [received, setReceived] = useState(false);
  const [proposta, setProposta] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [analise, setAnalise] = useState(false);
  const [response, setResponse] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleCreatePreBriefing(event) {}

  async function getProposta() {
    const response = await findPropostaById(id);

    setProposta(response.data);
    setReceived(true);
  }

  const handleAnaliseChange = (e) => {
    const valor = e.target.value === "true"; // converte string para boolean
    setAnalise(valor);
  };

  async function testeIA(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const labels = {
      name: "Nome da Empresa",
      whatsapp: "Whatsapp do cliente",
      plan: "Plano Contratado",
      consultor: "Consultor comercial",
      respComercial: "Responsável comercial",
      respOnboarding: "Responsável pelo onboarding",
      google: "Valor de Teto para Google ADS",
      googleSugestion: "Valor Sugerido para Google ADS",
      meta: "Valor de Teto para Meta ADS",
      metaSugestion: "Valor Sugerido para Meta ADS",
      tikTok: "Valor de Teto para TikTok ADS",
      tikTokSugestion: "Valor Sugerido para TikTok ADS",
      linkedin: "Valor de Teto para Linkedin ADS",
      linkedinSugestion: "Valor Sugerido para Linkedin ADS",
      analise: "Foi feita Análise de Conta ads",
      jaInveste: "Cliente Já investe em alguma plataforma",
      investeValorePlataforma: "Valor e Plataforma que investe",
      siteAtual: "Link do site atual do cliente",
      regiaoAnuncio: "Região que será feito o tráfego",
      experienciaCliente: "Experiencia do cliente com tráfego",
      publicoAlvoTrafego: "Público alvo para tráfego",
      objetivoTrafego: "Objetivo da campanha",
      infoTrafego: "Mais informações sobre o tráfego",
      site: "Quantos sites serão feitos",
      dobrasSite: "Número de dobras que terá o site",
      secoesSite: "Número de seções que terá o site",
      tecQueAvaliou: "Técnico que avaliou a conta",
      referenciaRedes: "Redes Sociais de Referência",
      sitesReferencia: "Sites de Referência",
      secoesDobrasDesejadas: "Seções e dobras desejadas",
      sobreDominio: "Informações sobre o domínio",
      publicoAlvoSite: "Público alvo orgânico do site",
      infoSite: "Outras informações sobre o site",
      referenciaLogotipo: "Referência para criação de logotipo",
      papelaria: "Alguma sugestão de papelaria",
      publicoAlvoLogo: "Público alvo da logotipo",
      infoLogotipo: "Outras informações sobre a logotipo",
      sobreEmpresa: "Outras informações sobre a empresa",
      gmb: "Número de perfis GMB que cliente terá",
      possuiGmb: "Cliente já possui GMB",
      linkGmb: "Link do perfil GMB atual",
      infoGmb: "Outras informações sobre o GMB",
      posts: "Número de criativos para redes sociais",
      redesPosts: "Em quais redes serão publicadas",
      linkRede: "Link da rede social do cliente",
      publicoAlvoRedes: "Público alvo das redes sociais",
      objetivoRedes: "Objetivo das redes sociais",
      infoRedes: "Outras informações sobre as redes sociais",
      nVisitas: "Número de visitas para captação",
      tempoCap: "Duração das captações",
      localCaptacao: "Onde ocorrerão as captações",
      publicoAlvoAeV: "Público alvo dos Vídeos",
      objetivoAeV: "Objetivo dos vídeos",
      outrasInfos: "Outras informações gerais sobre o projeto",
    };

    const infoFormatada = Object.entries(data)
      .filter(([_, value]) => {
        if (typeof value === "boolean") return true;
        return value && value.toString().trim() !== "";
      })
      .map(([key, value]) => {
        const label = labels[key] || key;

        // Formatação booleana (sim/não)
        if (typeof value === "boolean") {
          return `${label}: ${value ? "Sim" : "Não"}`;
        }

        // Tratamento especial para links
        if (
          typeof value === "string" &&
          (value.startsWith("http://") || value.startsWith("https://"))
        ) {
          return `${label}: ${value}`; // não usa markdown, não coloca parênteses
        }

        return `${label}: ${value}`;
      })
      .join("\n");

    const meuPrompt = `Você é um redator que deve gerar um **pré-briefing** para uma agência de marketing digital com base nas informações fornecidas abaixo.

Sua tarefa é montar um **texto corrido** explicando a situação do cliente, seus objetivos, e qualquer outra informação relevante. **Não crie listas com campos e respostas**, exceto para os seguintes itens (caso existam):

- **Nome do cliente**
- **Contato**
- **Link do site** sempre exibir com "https://"

Cuidado pois esse conteúdo que voce escrever passará por um markdown de html, por isso a forma como voce escrever os links pode desorganizar o texto, entao evite parentesis

Se uma categoria (por exemplo, tráfego pago ou redes sociais) **não for mencionada nas informações ou tenha todos os campos zerados ou vazios**, ignore completamente esse assunto — isso significa que o cliente **não deseja esse tipo de serviço**.

Elabore um parágrafo fluido com base nos dados.

Aqui estão as informações:
${infoFormatada}
`;

    const API_KEY =
      "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";
    setThinking(true);
    fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          {
            role: "user",
            content: meuPrompt,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Resposta:", data.choices[0].message.content);
        setThinking(false);
        setResponse(marked(data.choices[0].message.content));
      })
      .catch((err) => {
        console.error("Erro:", err);
        setThinking(false);
      });
  }

  useEffect(() => {
    getProposta();
  }, []);

  return received ? (
    <PreBriefingContainer onSubmit={testeIA}>
      <div className="campo">
        <label htmlFor="name">Empresa</label>
        <Input type="text" name="name" value={proposta.name} />
      </div>
      <div className="campo">
        <label htmlFor="whatsapp">Whatsapp</label>
        <Input type="text" name="whatsapp" value={proposta.whatsapp} />
      </div>
      <div className="campo">
        <label htmlFor="plan">Plano</label>
        <Input type="text" name="plan" value={proposta.plan} />
      </div>
      <div className="campo">
        <label htmlFor="consultor">Consultor</label>
        <Input type="text" name="consultor" value={proposta.consultor} />
      </div>
      <div className="campo">
        <label htmlFor="respComercial">Responsável Comercial</label>
        <Input
          type="text"
          name="respComercial"
          defaultValue={proposta.respComercial}
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
      {proposta.google > 0 && (
        <div className="ligados">
          <div className="campo">
            <label htmlFor="google">Google ADS</label>
            <Input type="text" name="google" value={proposta.google} />
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
        <div
          className="ligado
        s"
        >
          <div className="campo">
            <label htmlFor="meta">Meta ADS</label>
            <Input type="text" name="meta" value={proposta.meta} />
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
            <Input type="text" name="tikTok" value={proposta.tikTok} />
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
            <Input type="text" name="linkedin" value={proposta.linkedin} />
          </div>
          <img src="/ligadoimg.svg" />
          <Input
            type="text"
            name="linkedinSugestion"
            placeholder="Valor sugerido"
          />
        </div>
      )}

      <div className="ligados">
        <div className="campo">
          <label htmlFor="analise">Análise de Conta</label>
          <select name="analise" onChange={handleAnaliseChange}>
            <option value={false}>Não</option>
            <option value={true}>Sim</option>
          </select>
        </div>
        <img src="/ligadoimg.svg" />
        {analise && (
          <Input
            type="text"
            name="tecQueAvaliou"
            placeholder="Técnico que avaliou"
          />
        )}
      </div>

      <div className="campo">
        <label htmlFor="jaInveste">Cliente já Investe</label>
        <select name="jaInveste">
          <option value={false}>Não</option>
          <option value={true}>Sim</option>
        </select>
      </div>
      <Input
        type="text"
        name="investeValorePlataforma"
        placeholder="Valor e Plataforma"
      />
      <div className="campo">
        <label htmlFor="siteAtual">Site do Cliente</label>
        <Input type="text" name="siteAtual" placeholder="https://" />
      </div>
      <div className="campo">
        <label htmlFor="regiaoAnuncio">Região de Anúncio</label>
        <textarea name="regiaoAnuncio" placeholder="Insira mais informações" />
      </div>
      <div className="campo">
        <label htmlFor="experienciaCliente">Experiência do Cliente</label>
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
        <textarea name="infoTrafego" placeholder="Insira mais informações" />
      </div>
      <div className="campo">
        <label htmlFor="site">Site Completo</label>
        <Input type="text" name="site" value={proposta.site} />
      </div>
      <Input type="text" name="dobrasSite" value={proposta.dobrasSite} />
      <Input type="text" name="secoesSite" value={proposta.secoesSite} />
      <div className="campo">
        <label>Site do Cliente</label>
        <Input type="text" placeholder="https://" />
      </div>
      <div className="campo">
        <label htmlFor="referenciaRedes">Redes Sociais de Referência</label>
        <Input
          type="text"
          name="referenciaRedes"
          placeholder="Redes Sociais de Referência"
        />
      </div>
      <div className="campo">
        <label htmlFor="sitesReferencia">Sites de Referência</label>
        <Input
          type="text"
          name="sitesReferencia"
          placeholder="Sites de Referência"
        />
      </div>
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
        <label htmlFor="sobreDominio">Informações sobre o Domínio</label>
        <textarea name="sobreDominio" placeholder="Insira mais informações" />
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
        <textarea name="infoSite" placeholder="Insira mais informações" />
      </div>
      <div className="campo">
        <label htmlFor="referenciaLogotipo">Referências</label>
        <Input
          type="text"
          name="referenciaLogotipo"
          placeholder="Referencia logo"
        />
      </div>
      <div className="campo">
        <label htmlFor="papelaria">Papelaria</label>
        <textarea name="papelaria" placeholder="Insira mais informações" />
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
        <textarea name="infoLogotipo" placeholder="Insira mais informações" />
      </div>
      <div className="campo">
        <label htmlFor="sobreEmpresa">Sobre a Empresa</label>
        <textarea name="sobreEmpresa" placeholder="Insira mais informações" />
      </div>
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
        <Input type="text" name="linkGmb" placeholder="https://" />
      </div>
      <div className="campo">
        <label htmlFor="infoGmb">Outras Informações</label>
        <textarea name="infoGmb" placeholder="Insira mais Informações" />
      </div>
      <div className="campo">
        <label htmlFor="posts">Quantidade de Criativos</label>
        <Input type="text" name="posts" defaultValue={proposta.posts} />
      </div>
      <Input
        type="text"
        name="redesPosts"
        placeholder="Em quais redes serão publicadas"
      />
      <div className="campo">
        <label htmlFor="linkRede">Link do Perfil</label>
        <Input type="text" name="linkRede" placeholder="https://" />
      </div>
      <div className="campo">
        <label htmlFor="publicoAlvoRedes">Público Alvo</label>
        <textarea
          name="publicoAlvoRedes"
          placeholder="Insira mais informações"
        />
      </div>
      <div className="campo">
        <label htmlFor="objetivoRedes">Objetivo</label>
        <textarea name="objetivoRedes" placeholder="Insira mais informações" />
      </div>
      <div className="campo">
        <label htmlFor="infoRedes">Outras Informações</label>
        <textarea name="infoRedes" placeholder="Insira mais informações" />
      </div>
      <div className="campo">
        <label htmlFor="nVisitas">Visitas ao Mês</label>
        <Input type="text" name="nVisitas" placeholder="Visitas" />
      </div>
      <Input type="text" name="tempoCap" placeholder="Tempo de Captação" />
      <div className="campo">
        <label htmlFor="localCaptacao">Local da Captação</label>
        <Input
          type="text"
          name="localCaptacao"
          placeholder="Onde ocorrerão as captações"
        />
      </div>
      <div className="campo">
        <label htmlFor="publicoAlvoAeV">Público Alvo</label>
        <textarea name="publicoAlvoAeV" placeholder="Insira mais Informações" />
      </div>
      <div className="campo">
        <label htmlFor="objetivoAeV">Objetivo</label>
        <textarea name="objetivoAeV" placeholder="Insira mais Informações" />
      </div>
      <div className="campo">
        <label htmlFor="infoAeV">Outras Informações</label>
        <textarea name="infoAeV" placeholder="Insira mais Informações" />
      </div>
      <div className="campo">
        <label htmlFor="outrasInfos">Informações Adicionais</label>
        <textarea name="outrasInfos" placeholder="Insira mais Informações" />
      </div>

      <button className="btn">Enviar</button>
      {thinking && <div className="custom-loader"></div>}
      {response !== "" && (
        <div className="chat" dangerouslySetInnerHTML={{ __html: response }} />
      )}
    </PreBriefingContainer>
  ) : null;
}
