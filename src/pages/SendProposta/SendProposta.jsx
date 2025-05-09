/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Input } from "../../components/Input/Input";
import {
  answerProposta,
  createPropostaService,
  findPropostaById,
} from "../../services/propostaService";
import {
  Depoimentos,
  Entregaveis,
  Lista,
  Marketing,
  PropostaCards,
  PropostaDetails,
  SendPropostaContainer,
  SendPropostaHeader,
  Vantagens,
} from "./SendPropostaStyled";
import { useParams } from "react-router-dom";
import { createClientService } from "../../services/clientService";

export function SendProposta() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [received, setReceived] = useState(false);
  const [temSite, setTemSite] = useState(false);
  const [temTrafego, setTemTrafego] = useState(false);
  const [gmb, setGmb] = useState(false);
  const [grupoPremium, setGrupoPremium] = useState(false);
  const [criativos, setCriativos] = useState(false);
  const [captacao, setCaptacao] = useState(false);
  const [validaAte, setValidaAte] = useState();
  const [proposta, setProposta] = useState({});

  async function getPropostaById() {
    const response = await findPropostaById(id);
    const dataVencimento = new Date(response.data.createdAt);
    setValidaAte([
      dataVencimento.getDate() +
        10 +
        "/" +
        (dataVencimento.getMonth() + 1 < 10
          ? "0" + (dataVencimento.getMonth() + 1)
          : dataVencimento.getMonth() + 1),
      dataVencimento.getFullYear(),
    ]);

    if (
      response.data.site > 0 ||
      response.data.mixtree > 0 ||
      response.data.lp > 0 ||
      response.data.catalogo > 0 ||
      response.data.smart > 0
    ) {
      setTemSite(true);
    }
    if (
      response.data.tikTok > 0 ||
      response.data.google > 0 ||
      response.data.linkedin > 0 ||
      response.data.meta > 0
    ) {
      setTemTrafego(true);
    }
    if (response.data.gmb > 0) {
      setGmb(true);
    }
    if (response.data.posts > 0) {
      setCriativos(true);
    }
    if (response.data.gpPremium) {
      setGrupoPremium(true);
    }
    if (
      response.data.tempoCap > 0 ||
      response.data.nVideos > 0 ||
      response.data.nVisitas > 0
    ) {
      setCaptacao(true);
    }

    setProposta(response.data);
    setReceived(true);
  }

  async function answer(op) {
    const answer = { answer: op };
    const propostaAtt = await answerProposta(id, answer);
    // if (op) {
    //   const data = {};
    //   data.name = proposta.name;
    // data.status = "Start";
    // data.plan = proposta.plan;
    // data.posts = proposta.posts;
    // data.value = 1000;
    // data.startValue = 1000;
    // vencimento,
    // formaPagamento,
    // proposta,
    // plataformasTrafego,
    // tempoContrato,
    // nVideos,
    // nVisitas,
    // tempoCap,

    //   // const response = await createClientService(proposta);
    //   console.log(response.data);
    // }
  }

  useEffect(() => {
    getPropostaById();
  }, []);

  return (
    received && (
      <SendPropostaContainer>
        <SendPropostaHeader>
          <img src="/digitalmix.svg" alt="Digitalmix" />
          <div className="headerInfo">
            <h2>
              Cliente <span>{proposta.name}</span>
            </h2>
            <h1>Proposta Comercial</h1>
            <h2>
              para <span>Plano {proposta.plan}</span>
            </h2>
          </div>
        </SendPropostaHeader>
        <PropostaCards>
          <div className="card">
            <div className="cardContent">
              <p className="red">Proposta válida até dia_</p>
              <h3>{validaAte[0]}</h3>
            </div>
            <p>{validaAte[1]}</p>
          </div>
          <div className="card">
            <div className="cardContent">
              <p>Investimento_</p>
              <h3>
                <sup>R$</sup> {proposta.value},<sup>00</sup>
                <span>/mês</span>
              </h3>
            </div>
            <p>plano pré-pago</p>
          </div>
        </PropostaCards>
        <PropostaDetails>
          <li>
            <div>
              <img src="/prazo.png" />{" "}
              <h2>Prazo máximo de execução do serviço após onboarding:</h2>
            </div>{" "}
            <h3>30 dias</h3>
          </li>
          <li>
            <div>
              <img src="/forma-pagamento.png" /> <h2>Formas de Pagamento:</h2>
            </div>{" "}
            <h3>Boleto, Pix ou Cartão</h3>
          </li>
          <li>
            <div>
              <img src="/contrato.png" /> <h2>Contrato:</h2>
            </div>{" "}
            <h3>6 meses</h3>
          </li>
        </PropostaDetails>
        <Entregaveis>
          <span className="roxo"></span>
          <span className="roxo roxo2"></span>
          <span className="roxo roxo3"></span>
          <span className="roxo roxo4"></span>
          <span className="roxo roxo5"></span>
          <div className="entregaveisHeader">
            <h4>
              Proposta Comercial <span>para</span> <i>Plano {proposta.plan}</i>
            </h4>
            <h3>Entregáveis</h3>
          </div>
          <ul>
            {(() => {
              let c = 1;
              return (
                <>
                  <li>
                    <img src="/onboarding.png" /> <h3>{c++}.</h3>{" "}
                    <div>
                      <h4>ONBOARDING</h4>{" "}
                      <p>
                        Reunião de Onboarding com equipe técnica para
                        alinhamento de pontos fundamentais do projeto.
                      </p>
                    </div>
                  </li>
                  {temSite && (
                    <li>
                      <img src="/paginas.png" /> <h3>{c++}.</h3>{" "}
                      <div>
                        <h4>PÁGINAS</h4>{" "}
                        <p>
                          {proposta.site > 0 && proposta.site + " Site(s), "}{" "}
                          {proposta.mixtree > 0 &&
                            proposta.mixtree + " Mixtree(s), "}{" "}
                          {proposta.lp > 0 &&
                            proposta.lp + " Landing Page(s), "}{" "}
                          {proposta.catalogo > 0 &&
                            proposta.catalogo + " Catálogo(s), "}{" "}
                          para captação de leads e/ou apresentação de produto,
                          serviço ou marca.
                        </p>
                      </div>
                    </li>
                  )}
                  {temTrafego && (
                    <li>
                      <img src="/trafegopago.png" /> <h3>{c++}.</h3>{" "}
                      <div>
                        <h4>TRÁFEGO PAGO</h4>{" "}
                        <p>
                          Gestão e otimização de campanhas no{" "}
                          {proposta.google > 0 &&
                            "Google de até R$ " + proposta.google + ", "}
                          {proposta.meta > 0 &&
                            "Meta (Instagram e Facebook) de até R$ " +
                              proposta.meta +
                              ", "}
                          {proposta.tikTok > 0 &&
                            "TikTok de até R$ " + proposta.tikTok + ", "}
                          {proposta.linkedin > 0 &&
                            "Linkedin de até R$ " + proposta.linkedin}
                        </p>
                      </div>
                    </li>
                  )}
                  {gmb && (
                    <li>
                      <img src="/gmb.png" /> <h3>{c++}.</h3>{" "}
                      <div>
                        <h4>GOOGLE MEU NEGÓCIO</h4>{" "}
                        <p>
                          Gestão e otimização de {proposta.gmb}x página(s)
                          local(is) da empresa no Google meu Negócio.
                        </p>
                      </div>
                    </li>
                  )}
                  <li>
                    <img src="/dashboard.png" /> <h3>{c++}.</h3>{" "}
                    <div>
                      <h4>DASHBOARD</h4>{" "}
                      <p>Dashboard de resultados com as principais métricas.</p>
                    </div>
                  </li>
                  <li>
                    <img src="/reunioes.png" /> <h3>{c++}.</h3>{" "}
                    <div>
                      <h4>REUNIÕES</h4>{" "}
                      <p>
                        Reuniões {proposta.report} presenciais (sede da
                        Digital_Mix) ou via meet.
                      </p>
                    </div>
                  </li>
                  {grupoPremium && (
                    <li>
                      <img src="/atendimento-premium.png" /> <h3>{c++}.</h3>{" "}
                      <div>
                        <h4>ATENDIMENTO PREMIUM</h4>{" "}
                        <p>
                          Acesso a grupo de trabalhos com gestor de tráfego, CS
                          e/ou envolvidos no projeto.
                        </p>
                      </div>
                    </li>
                  )}
                  {criativos && (
                    <li>
                      <img src="/criativos.png" /> <h3>{c++}.</h3>{" "}
                      <div>
                        <h4>CRIATIVOS REDES ({proposta.posts})</h4>{" "}
                        <p>
                          Confecção de {proposta.posts} criativos para as redes
                          sociais, sendo 2 criativos no formato carrossel e 4
                          criativos básicos.
                        </p>
                      </div>
                    </li>
                  )}
                  {captacao && (
                    <li>
                      <img src="/captacao.png" /> <h3>{c++}.</h3>{" "}
                      <div>
                        <h4>CAPTAÇÃO ÁUDIO & VIDEO E EDIÇÃO</h4>{" "}
                        <p>
                          {proposta.nVisitas} Visita(s) por mês /{" "}
                          {proposta.tempoCap} h (atendimento exclusivo para
                          Joinville)
                        </p>
                      </div>
                    </li>
                  )}
                  <li>
                    <img src="/ferramentas.png" /> <h3>{c++}.</h3>{" "}
                    <div>
                      <h4>FERRAMENTAS</h4>{" "}
                      <p>
                        Acesso ao Leadster (Qualificador de Leads) - até 2000
                        acessos. Até 3 chaves de um CRM (Agendor ou Moskit).
                      </p>
                    </div>
                  </li>
                  <li>
                    <img src="/material-offline.png" /> <h3>{c++}.</h3>{" "}
                    <div>
                      <h4>MATERIAL OFFLINE</h4>{" "}
                      <p>
                        Confecção de até 2 criativos para material offline mês
                        (cartão de visitas, folder, outdoor e etc.)
                      </p>
                    </div>
                  </li>
                </>
              );
            })()}
          </ul>
        </Entregaveis>

        <Vantagens>
          <img src="/alvo.png" />
          <div className="entregaveisHeader">
            <h4>
              Proposta Comercial <span>para</span> <i>Plano {proposta.plan}</i>
            </h4>
            <h3>Vantagens de Fechar Conosco</h3>
          </div>
          <Lista>
            <li>
              <img src="/check.svg" /> Especializados em negócio local;
            </li>
            <li>
              <img src="/check.svg" /> Utilização de IA em gestão de Google Meu
              Negócio;
            </li>
            <li>
              <img src="/check.svg" /> Páginas construídas em HTML, CSS e JS;
            </li>
            <li>
              <img src="/check.svg" /> Processos em melhoria constante;
            </li>
            <li>
              <img src="/check.svg" /> Mais de 200 negócios que tiveram aumento
              em seus resultados;
            </li>
            <li>
              <img src="/check.svg" /> Google Partner{" "}
              <img src="/google-partner.png" />
            </li>
            <li>
              <img src="/check.svg" /> Mais de 10 Ferramentas Parceiras.
            </li>
          </Lista>
        </Vantagens>
        <Marketing>
          <img src="/foguete.png" />
          <span className="roxo"></span>
          <div className="entregaveisHeader">
            <h4>
              Proposta Comercial <span>para</span> <i>Plano {proposta.plan}</i>
            </h4>
            <h3>Um Time de Marketing Atuando Pela sua Empresa</h3>
            <p>
              Conte com nosso dedicado time de marketing para Impulsionar a sua
              Empresa. Com estratégias inovadoras, promovemos sua marca,
              atraímos clientes e aumentamos seu impacto no mercado.
            </p>
          </div>
          <Lista>
            <li>
              <img src="/check.svg" /> Gestor de Tráfego;
            </li>
            <li>
              <img src="/check.svg" /> UI/UX Design;
            </li>
            <li>
              <img src="/check.svg" /> Desenvolvimento WEB;
            </li>
            <li>
              <img src="/check.svg" /> Gestor de Projetos;
            </li>
            <li>
              <img src="/check.svg" /> Customer Sucess;
            </li>
            <li>
              <img src="/check.svg" /> Video Maker & Editor;
            </li>
            <li>
              <img src="/check.svg" /> Copywriter;
            </li>
          </Lista>
        </Marketing>

        <Depoimentos>
          <img src="/depoimentos.png" alt="" />
          <div className="entregaveisHeader">
            <h4>
              Proposta Comercial <span>para</span> <i>Plano {proposta.plan}</i>
            </h4>
            <h3>O que dizem da Gente</h3>
          </div>

          <div className="depoimentosContainer">
            <img src="/depoimento-1.png" alt="depoimento" />
            <img src="/depoimento-2.png" alt="depoimento" />
            <img src="/depoimento-3.png" alt="depoimento" />
          </div>

          <div className="aceitarProposta">
            <p>
              Assim que você aceitar a proposta o consultor responsável entrará
              em contato para seguir com o seu projeto
            </p>
            <button className="btn">
              <strong>ACEITAR</strong> PROPOSTA
            </button>
            <a target="_blank" href="https://digitalmix.tech/">
              www.digitalmix.tech
            </a>
          </div>
        </Depoimentos>
      </SendPropostaContainer>
    )
  );
}
