/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPrebriefingService } from "../../services/preBriefingService";
import { marked } from "marked";
import {
  PreBriefingBody,
  PreBriefingContainer,
  PreBriefingHeader,
  PreBriefingRaw,
} from "./PreBriefingStyled";

export function PreBriefing() {
  const { id } = useParams();
  const [preBriefing, setPrebriefing] = useState();
  const [received, setReceived] = useState(false);
  const [rawData, setRawData] = useState(false);
  const navigate = useNavigate();

  async function getPrebriefing() {
    setReceived(false);
    const response = await getPrebriefingService(id);
    console.log(response.data.textoIA);
    setPrebriefing(response.data);
    setReceived(true);
  }

  useEffect(() => {
    getPrebriefing();
  }, []);

  return (
    received && (
      <PreBriefingContainer>
        <PreBriefingHeader>
          <button onClick={() => navigate(-1)}>
            <img
              src="/voltar.svg"
              alt="Voltar"
              title="Voltar"
              className="img-effect"
            />
          </button>
          <button className="btn" onClick={() => setRawData(!rawData)}>
            Trocar Visualização
          </button>
        </PreBriefingHeader>
        <PreBriefingBody className={!rawData ? "" : "esconde"}>
          <div
            dangerouslySetInnerHTML={{ __html: marked(preBriefing.textoIA) }}
          ></div>
          <div
            dangerouslySetInnerHTML={{ __html: marked(preBriefing.listaIA) }}
          ></div>
        </PreBriefingBody>
        <PreBriefingRaw className={rawData ? "active" : ""}>
          {preBriefing.empresa && (
            <div>
              <h3>Empresa</h3>
              <p>{preBriefing.empresa}</p>
            </div>
          )}
          {preBriefing.whatsapp && (
            <div>
              <h3>Whatsapp</h3>
              <p>{preBriefing.whatsapp}</p>
            </div>
          )}
          {preBriefing.plan && (
            <div>
              <h3>Plano</h3>
              <p>{preBriefing.plan}</p>
            </div>
          )}
          {preBriefing.empresa && (
            <div>
              <h3>Empresa</h3>
              <p>{preBriefing.empresa}</p>
            </div>
          )}
          {preBriefing.consultor && (
            <div>
              <h3>Consultor</h3>
              <p>{preBriefing.consultor}</p>
            </div>
          )}
          {preBriefing.respComercial && (
            <div>
              <h3>Responsável Comercial</h3>
              <p>{preBriefing.respComercial}</p>
            </div>
          )}
          {preBriefing.respOnboarding && (
            <div>
              <h3>Responsável Onboarding</h3>
              <p>{preBriefing.respOnboarding}</p>
            </div>
          )}
          {preBriefing.google > 0 && (
            <div>
              <h3>Teto Google ADS</h3>
              <p>R$ {preBriefing.google}</p>
            </div>
          )}
          {preBriefing.googleSugestion > 0 && (
            <div>
              <h3>Sugestão de Google</h3>
              <p>R$ {preBriefing.googleSugestion}</p>
            </div>
          )}
          {preBriefing.meta && (
            <div>
              <h3>Teto Meta ADS</h3>
              <p>R$ {preBriefing.meta}</p>
            </div>
          )}
          {preBriefing.metaSugestion && (
            <div>
              <h3>Sugestão de Meta</h3>
              <p>R$ {preBriefing.metaSugestion}</p>
            </div>
          )}
          {preBriefing.tikTok && (
            <div>
              <h3>Teto Tik Tok ADS</h3>
              <p>R$ {preBriefing.tikTok}</p>
            </div>
          )}
          {preBriefing.tikTokSugestion && (
            <div>
              <h3>Sugestão de Tik Tok</h3>
              <p>R$ {preBriefing.tikTokSugestion}</p>
            </div>
          )}
          {preBriefing.linkedin && (
            <div>
              <h3>Teto Linkedin Ads</h3>
              <p>R$ {preBriefing.linkedin}</p>
            </div>
          )}
          {preBriefing.linkedinSugestion && (
            <div>
              <h3>Sugestão de Linkedin</h3>
              <p>R$ {preBriefing.linkedinSugestion}</p>
            </div>
          )}
          {preBriefing.analise && (
            <div>
              <h3>Analise de Conta</h3>
              <p>Sim</p>
            </div>
          )}
          {preBriefing.analise && preBriefing.tecQueAvaliou && (
            <div>
              <h3>Técnico que avaliou</h3>
              <p>{preBriefing.tecQueAvaliou}</p>
            </div>
          )}
          {preBriefing.jaInveste && (
            <div>
              <h3>Cliente&nbsp;já&nbsp;Investe</h3>
              <p>Sim</p>
            </div>
          )}
          {preBriefing.jaInveste && preBriefing.investeValorePlataforma && (
            <div>
              <h3>Valor e Plataforma</h3>
              <p>{preBriefing.investeValorePlataforma}</p>
            </div>
          )}
          {preBriefing.siteAtual && (
            <div>
              <h3>Site do Cliente</h3>
              <p>{preBriefing.siteAtual}</p>
            </div>
          )}
          {preBriefing.regiaoAnuncio && (
            <div>
              <h3>Região de Anúncio</h3>
              <p>{preBriefing.regiaoAnuncio}</p>
            </div>
          )}
          {preBriefing.experienciaCliente && (
            <div>
              <h3>Experiência do Cliente</h3>
              <p>{preBriefing.experienciaCliente}</p>
            </div>
          )}
          {preBriefing.publicoAlvoTrafego && (
            <div>
              <h3>Público Alvo (tráfego)</h3>
              <p>{preBriefing.publicoAlvoTrafego}</p>
            </div>
          )}
          {preBriefing.objetivoTrafego && (
            <div>
              <h3>Objetivo Tráfego</h3>
              <p>{preBriefing.objetivoTrafego}</p>
            </div>
          )}
          {preBriefing.infoTrafego && (
            <div>
              <h3>Outras Informações (Tráfego)</h3>
              <p>{preBriefing.infoTrafego}</p>
            </div>
          )}
          {preBriefing.site > 0 && (
            <div>
              <h3>Site Completo</h3>
              <p>{preBriefing.site}</p>
            </div>
          )}
          {preBriefing.dobrasSite > 0 && (
            <div>
              <h3>Dobras do site</h3>
              <p>{preBriefing.dobrasSite}</p>
            </div>
          )}
          {preBriefing.secoesSite > 0 && (
            <div>
              <h3>Seções do Site</h3>
              <p>{preBriefing.secoesSite}</p>
            </div>
          )}
          {preBriefing.mixtree > 0 && (
            <div>
              <h3>Mixtree</h3>
              <p>{preBriefing.mixtree}</p>
            </div>
          )}
          {preBriefing.catalogo > 0 && (
            <div>
              <h3>Catalogo</h3>
              <p>{preBriefing.catalogo}</p>
            </div>
          )}
          {preBriefing.dobrasCatalogo > 0 && (
            <div>
              <h3>Dobras do catálogo</h3>
              <p>{preBriefing.dobrasCatalogo}</p>
            </div>
          )}
          {preBriefing.smart > 0 && (
            <div>
              <h3>Smart</h3>
              <p>{preBriefing.smart}</p>
            </div>
          )}
          {preBriefing.secoesSmart > 0 && (
            <div>
              <h3>Seções do smart</h3>
              <p>{preBriefing.secoesSmart}</p>
            </div>
          )}
          {preBriefing.lp > 0 && (
            <div>
              <h3>LP</h3>
              <p>{preBriefing.lp}</p>
            </div>
          )}
          {preBriefing.secoesLp > 0 && (
            <div>
              <h3>Seções da LP</h3>
              <p>{preBriefing.secoesLp}</p>
            </div>
          )}
          {preBriefing.referenciaRedes && (
            <div>
              <h3>Redes Sociais de Referência</h3>
              <p>{preBriefing.referenciaRedes}</p>
            </div>
          )}
          {preBriefing.sitesReferencia && (
            <div>
              <h3>Sites de Referência</h3>
              <p>{preBriefing.sitesReferencia}</p>
            </div>
          )}
          {preBriefing.secoesDobrasDesejadas && (
            <div>
              <h3>Seções ou Dobras Desejadas</h3>
              <p>{preBriefing.secoesDobrasDesejadas}</p>
            </div>
          )}
          {preBriefing.sobreDominio && (
            <div>
              <h3>Informações sobre o Domínio</h3>
              <p>{preBriefing.sobreDominio}</p>
            </div>
          )}
          {preBriefing.publicoAlvoSite && (
            <div>
              <h3>Público Alvo do Site</h3>
              <p>{preBriefing.publicoAlvoSite}</p>
            </div>
          )}
          {preBriefing.infoSite && (
            <div>
              <h3>Outras Informações do Site</h3>
              <p>{preBriefing.infoSite}</p>
            </div>
          )}
          {preBriefing.referenciaLogotipo && (
            <div>
              <h3>Referências para Logo</h3>
              <p>{preBriefing.referenciaLogotipo}</p>
            </div>
          )}
          {preBriefing.papelaria && (
            <div>
              <h3>Papelaria</h3>
              <p>{preBriefing.papelaria}</p>
            </div>
          )}
          {preBriefing.publicoAlvoLogo && (
            <div>
              <h3>Público Alvo Logo</h3>
              <p>{preBriefing.publicoAlvoLogo}</p>
            </div>
          )}
          {preBriefing.infoLogotipo && (
            <div>
              <h3>Outras Informações da Logo</h3>
              <p>{preBriefing.infoLogotipo}</p>
            </div>
          )}
          {preBriefing.sobreEmpresa && (
            <div>
              <h3>Sobre a Empresa</h3>
              <p>{preBriefing.sobreEmpresa}</p>
            </div>
          )}
          {preBriefing.gmb > 0 && (
            <div>
              <h3>Perfil(s) GMB</h3>
              <p>{preBriefing.gmb}</p>
            </div>
          )}
          {preBriefing.possuiGmb && (
            <div>
              <h3>Possui Gmb</h3>
              <p>Sim</p>
            </div>
          )}
          {preBriefing.linkGmb && (
            <div>
              <h3>Link do Gmb</h3>
              <p>{preBriefing.linkGmb}</p>
            </div>
          )}
          {preBriefing.infoGmb && (
            <div>
              <h3>Outras Informações do GMB</h3>
              <p>{preBriefing.infoGmb}</p>
            </div>
          )}
          {preBriefing.posts > 0 && (
            <div>
              <h3>Quantidade&nbsp;de&nbsp;Criativos</h3>
              <p>{preBriefing.posts}</p>
            </div>
          )}
          {preBriefing.posts > 0 && preBriefing.redesPosts && (
            <div>
              <h3>Redes que serão publicadas</h3>
              <p>{preBriefing.redesPosts}</p>
            </div>
          )}
          {preBriefing.linkRede && (
            <div>
              <h3>Link do Perfil</h3>
              <p>{preBriefing.linkRede}</p>
            </div>
          )}
          {preBriefing.publicoAlvoRedes && (
            <div>
              <h3>Publico Alvo das Redes</h3>
              <p>{preBriefing.publicoAlvoRedes}</p>
            </div>
          )}
          {preBriefing.objetivoRedes && (
            <div>
              <h3>Objetivo das Redes</h3>
              <p>{preBriefing.objetivoRedes}</p>
            </div>
          )}
          {preBriefing.infoRedes && (
            <div>
              <h3>Outras Informações das redes</h3>
              <p>{preBriefing.infoRedes}</p>
            </div>
          )}
          {preBriefing.nVisitas > 0 && (
            <div>
              <h3>Visitas ao Mês</h3>
              <p>{preBriefing.nVisitas}</p>
            </div>
          )}
          {preBriefing.tempoCap && (
            <div>
              <h3>Tempo de Captação</h3>
              <p>{preBriefing.tempoCap}</p>
            </div>
          )}
          {preBriefing.localCaptacao && (
            <div>
              <h3>Local da Captação</h3>
              <p>{preBriefing.localCaptacao}</p>
            </div>
          )}
          {preBriefing.publicoAlvoAeV && (
            <div>
              <h3>Publico Alvo A&V</h3>
              <p>{preBriefing.publicoAlvoAeV}</p>
            </div>
          )}
          {preBriefing.objetivoAeV && (
            <div>
              <h3>Objetivo A&V</h3>
              <p>{preBriefing.objetivoAeV}</p>
            </div>
          )}
          {preBriefing.infoAeV && (
            <div>
              <h3>Info A&V</h3>
              <p>{preBriefing.infoAeV}</p>
            </div>
          )}
          {preBriefing.outrasInfos && (
            <div>
              <h3>Informações Adicionais</h3>
              <p>{preBriefing.outrasInfos}</p>
            </div>
          )}
        </PreBriefingRaw>
      </PreBriefingContainer>
    )
  );
}
