import { useEffect, useState } from "react";
import {
  createPlanService,
  excludePlanService,
  getPlanById,
  getPlansService,
  updatePlanService,
} from "../../services/planService";
// import { Card } from "../../components/Card/Card";
import {
  CreatePlanModal,
  ExcludeModal,
  Pages,
  PlanBody,
  PlanHeader,
  PlanItem,
  PlanModal,
  PlanStyled,
} from "./PlanStyled";
import { Input } from "../../components/Input/Input";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [planModal, setPlanModal] = useState(false);
  const [createPlanModal, setCreatePlanModal] = useState(false);
  const [excludeModal, setExcludeModal] = useState(false);
  const [plan, setPlan] = useState({});
  const [page, setPage] = useState([]);

  async function getPlans() {
    const response = await getPlansService();
    setPlans(response.data.results);
  }

  async function excludePlan() {
    await excludePlanService(plan._id);
    setPlanModal(false);
    setExcludeModal(false);
    getPlans();
  }

  async function clickPlanModal(id) {
    if (!planModal) {
      const response = await getPlanById(id);
      setPlan(response.data);
      setPage(response.data.pages || []);
      setPlanModal(true);
      if (!PlanModal) {
        setExcludeModal(false);
      }
    }
  }

  async function updatePlan(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.pages = page.filter((item) => item.trim() !== "");
    await updatePlanService(plan._id, data);
    setPlanModal(false);
    getPlans();
  }

  const handleAddPage = () => {
    setPage([...page, ""]);
  };

  const handlePageChange = (index, event) => {
    const newPage = [...page];
    newPage[index] = event.target.value;
    setPage(newPage);
  };

  function addPlanClick() {
    setCreatePlanModal(!createPlanModal);
  }
  async function createPlan(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    if (data.name.trim() === "") {
      alert("Preencha os campos necessários");
    } else {
      await createPlanService(data);
    }
    setCreatePlanModal(false);
    getPlans();
  }

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <PlanStyled>
      {createPlanModal && (
        <CreatePlanModal onSubmit={createPlan}>
          <div>
            <label htmlFor="name">Nome:</label>
            <Input type="text" defaultValue="Plano" name="name" />
          </div>
          <div>
            <label htmlFor="adsValue">Valor ADS:</label>
            <Input type="text" defaultValue="100" name="adsValue" />
          </div>
          <div>
            <label htmlFor="report">Relatório:</label>
            <Input type="text" defaultValue="Mensal" name="report" />
          </div>
          <div>
            <label htmlFor="posts">Nº Criativos:</label>
            <Input type="text" defaultValue="15" name="posts" />
          </div>
          <button type="submit" className="btn">
            Enviar
          </button>
        </CreatePlanModal>
      )}
      {excludeModal && (
        <ExcludeModal>
          <h2>Tem Certeza?</h2>
          <div>
            <button className="btn danger" onClick={excludePlan}>
              excluir
            </button>
            <button className="btn" onClick={() => setExcludeModal(false)}>
              voltar
            </button>
          </div>
        </ExcludeModal>
      )}
      {planModal && (
        <PlanModal onSubmit={updatePlan}>
          <span
            id="close"
            onClick={() => (setPlanModal(false), setExcludeModal(false))}
          >
            <img
              src="/cancel.svg"
              alt="Voltar"
              title="Voltar"
              className="img-effect"
              style={{ maxWidth: 25 + "px" }}
            />
          </span>
          <span id="exclude" onClick={() => setExcludeModal(true)}>
            <img
              src="/exclude.svg"
              alt="Excluir"
              title="Excluir"
              className="img-effect"
              style={{ maxWidth: 25 + "px" }}
            />
          </span>
          <input type="text" name="name" defaultValue={plan.name} />
          <div>
            <label htmlFor="adsValue">Valor ADS:</label>
            <input type="text" name="adsValue" defaultValue={plan.adsValue} />
          </div>
          <div>
            <label htmlFor="report">Relatório:</label>
            <input type="text" name="report" defaultValue={plan.report} />
          </div>
          <div>
            <label htmlFor="posts">Nº Criativos:</label>
            <input type="text" name="posts" defaultValue={plan.posts} />
          </div>

          <Pages>
            <label htmlFor="pages">
              <h4>Páginas</h4>
            </label>
            {page.map((item, index) => (
              <div key={index}>
                <input
                  type="text"
                  name={`pages-${index}`}
                  defaultValue={item}
                  onChange={(e) => handlePageChange(index, e)}
                />
              </div>
            ))}
            <button type="button" className="addInput" onClick={handleAddPage}>
              <img
                src="/mais.svg"
                alt="Nova página"
                title="Nova página"
                className="img-effect"
              />
            </button>
          </Pages>

          <button type="submit" className="btn" style={{ marginTop: "20px" }}>
            Enviar
          </button>
        </PlanModal>
      )}
      <PlanHeader>
        <button onClick={addPlanClick}>
          <img
            src="/mais.svg"
            alt="Nova página"
            title="Nova página"
            className="img-effect"
          />
        </button>
      </PlanHeader>
      <PlanBody>
        {plans &&
          plans.map((plan) => (
            <PlanItem key={plan.id} onClick={() => clickPlanModal(plan.id)}>
              <div>
                <h2>{plan.name}</h2>
              </div>
            </PlanItem>
          ))}
      </PlanBody>
    </PlanStyled>
  );
}
