/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import {
  createClientService,
  findClients,
  getAllClients,
  getClientsByName,
} from "../../services/clientService";
import {
  AClient,
  AddClientModal,
  ClientBody,
  ClientContent,
  ClientHead,
  ClientHeader,
  ClientsStyled,
  FiltroModal,
} from "./ClientsStyled";
import { Input } from "../../components/Input/Input";
import { Label } from "../../components/Label/Label";
import Cookies from "js-cookie";
import { getPlanById, getPlansService } from "../../services/planService";
import { getAllEmployees, userLogged } from "../../services/employeeService";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema } from "../../schemas/searchSchema";
import { InputNav } from "../../components/Navbar/NavbarStyled";
import { UserContext } from "../../Context/UserContent";

export function Clients() {
  const { user, setUser } = useContext(UserContext);
  const [clients, setClients] = useState([]);
  const [plans, setPlans] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [addClientModal, setAddClientModal] = useState(false);
  const [filtro, setFiltro] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formValues, setFormValues] = useState({
    adsValue: "",
    posts: "",
  });
  const [search, setSearch] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchSchema),
  });

  async function getClients() {
    const response = await getAllClients();
    const plansResponse = await getPlansService();
    const plansMap = plansResponse.data.results.reduce((map, plan) => {
      map[plan.id] = plan.name;
      return map;
    }, {});

    const clientList = response.data.results.map((client) => {
      return {
        ...client,
        plan: plansMap[client.plan] || "Plano desconhecido",
      };
    });

    setSearch(false);
    setClients(clientList);
  }

  async function getEmployees() {
    const response = await getAllEmployees();
    const listaEmployees = response.data.results.filter(
      (employee) =>
        employee.role === "Gestor de Tráfego" || employee.role === "CS"
    );
    setEmployees(listaEmployees);
  }

  async function getPlans() {
    const response = await getPlansService();
    setPlans(response.data.results);
  }

  async function handleFilter(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.value = data.value ? 0 : 1;
    data.plano = data.plano == "Plano" ? null : data.plano;
    data.gestor = data.gestor == "Gestor" ? null : data.gestor;
    data.cs = data.cs == "CS" ? null : data.cs;
    const response = await findClients(data);
    const plansResponse = await getPlansService();
    const plansMap = plansResponse.data.results.reduce((map, plan) => {
      map[plan.id] = plan.name;
      return map;
    }, {});

    if (response.data.results) {
      const clientList = response.data.results.map((client) => {
        return {
          ...client,
          plan: plansMap[client.plan] || "Plano desconhecido",
        };
      });
      setClients(clientList);
      setFiltro(false);
      setSearch(true);
    } else {
      alert("Nenhum cliente se encaixa no filtro");
      setFiltro(false);
      setSearch(false);
    }
  }

  async function onSearch(data) {
    const { name } = data;
    const response = await getClientsByName(name);
    const plansResponse = await getPlansService();
    const plansMap = plansResponse.data.results.reduce((map, plan) => {
      map[plan.id] = plan.name;
      return map;
    }, {});

    const clientList = response.data.results.map((client) => {
      return {
        ...client,
        plan: plansMap[client.plan] || "Plano desconhecido",
      };
    });
    setClients(clientList);
    setSearch(true);
    reset();
  }

  async function createClient(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    if (
      !data.name ||
      !data.adsValue ||
      !data.value ||
      !data.plan ||
      !data.gestor ||
      !data.cs ||
      !data.cnpj ||
      !data.posts ||
      !data.whatsapp ||
      user.email == "camila.silva@digitalmix.tech"
    ) {
      alert("Preencha os campos necessários");
    } else {
      await createClientService(data);
      setAddClientModal(false);
      getClients();
    }
  }

  async function findUserLogged() {
    try {
      const response = await userLogged();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function clickAddClient() {
    setAddClientModal(!addClientModal);
    getPlans();
    getEmployees();
  }

  useEffect(() => {
    getClients();
    if (Cookies.get("token")) findUserLogged();
  }, []);

  useEffect(() => {
    if (selectedPlan) {
      const plan = plans.find((p) => p.id === selectedPlan);
      if (plan) {
        setFormValues({
          adsValue: plan.adsValue,
          posts: plan.posts,
        });
      }
    }
  }, [selectedPlan, plans]);

  return (
    <ClientsStyled>
      {filtro && (
        <FiltroModal onSubmit={handleFilter}>
          <div className="value">
            <input type="checkbox" name="value" id="value" />
            <span className="checkbox">
              <img src="/valor.svg" alt="" />
            </span>
            <label htmlFor="value">value</label>
          </div>
          <div>
            <label htmlFor="plan">Plano</label>
            <select name="plan">
              <option value="">Plano</option>
              {plans.map((plan, index) => (
                <option key={index} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="gestor">Gestor</label>
            <select name="gestor">
              <option value="">Gestor</option>
              {employees
                .filter((employee) => employee.role === "Gestor de Tráfego")
                .map((employee, index) => (
                  <option key={index} value={employee.name}>
                    {employee.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="cs">CS</label>
            <select name="cs">
              <option value="">CS</option>
              {employees
                .filter((employee) => employee.role === "CS")
                .map((employee, index) => (
                  <option key={index} value={employee.name}>
                    {employee.name}
                  </option>
                ))}
            </select>
          </div>

          <button type="submit" className="btn">
            Pesquisar
          </button>
        </FiltroModal>
      )}
      <ClientHeader>
        {(user.level == "Líder" || user.level == "adm") && (
          <img
            src="/mais.svg"
            className="img-effect"
            alt="novo cliente"
            title="Novo Cliente"
            onClick={clickAddClient}
          />
        )}
        <form onSubmit={handleSubmit(onSearch)}>
          {search && (
            <img
              src="/no-filter.svg"
              alt="desfazer filtro"
              title="Desfazer Filtro"
              className="img-effect"
              onClick={getClients}
            />
          )}
          <InputNav className="input-search-space">
            <button type="submit">
              <i className="bi bi-search"></i>
            </button>
            <input
              {...register("name")}
              type="text"
              placeholder="Procurar Cliente"
            />
          </InputNav>
          <img
            src="/filters.svg"
            alt="mais opções"
            title="Mais Opções"
            className="img-effect"
            onClick={() => [setFiltro(!filtro), getPlans(), getEmployees()]}
          />
        </form>
      </ClientHeader>
      <ClientBody>
        {addClientModal && (
          <AddClientModal onSubmit={createClient}>
            <input type="text" name="name" defaultValue="Novo Cliente" />
            <div className="clientInfo">
              <div>
                <label htmlFor="value">VALOR:</label>
                <Input name="value" type="number" />
              </div>
              <div>
                <label htmlFor="plan">PLANO:</label>
                <select
                  name="plan"
                  onChange={(e) => setSelectedPlan(e.target.value)}
                >
                  <option value="">Selecione um plano</option>
                  {plans.map((plan, index) => (
                    <option value={plan.id} key={index}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="gestor">GESTOR:</label>
                <select name="gestor">
                  {employees.map(
                    (employee, index) =>
                      employee.role === "Gestor de Tráfego" && (
                        <option value={employee.name} key={index}>
                          {employee.name}
                        </option>
                      )
                  )}
                </select>
              </div>
              <div>
                <label htmlFor="cs">CS:</label>
                <select name="cs">
                  {employees.map(
                    (employee, index) =>
                      employee.role === "CS" && (
                        <option value={employee.name} key={index}>
                          {employee.name}
                        </option>
                      )
                  )}
                </select>
              </div>
              <div>
                <label htmlFor="adsValue">VALOR ADS:</label>
                <Input
                  name="adsValue"
                  type="number"
                  value={formValues.adsValue}
                  onChange={(e) =>
                    setFormValues({ ...formValues, adsValue: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="posts">Nº CRIATIVOS:</label>
                <Input
                  name="posts"
                  type="number"
                  value={formValues.posts}
                  onChange={(e) =>
                    setFormValues({ ...formValues, posts: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="cnpj">CNPJ:</label>
                <Input name="cnpj" />
              </div>
              <div>
                <label htmlFor="whatsapp">WHATSAPP:</label>
                <Input name="whatsapp" />
              </div>
            </div>
            <button type="submit" className="btn">
              Enviar
            </button>
          </AddClientModal>
        )}

        {clients &&
          clients.map((client, index) => (
            <Link to={"/home/client/" + client.id} key={index}>
              <AClient>
                <ClientContent>
                  <ClientHead>
                    {!client.logo ? (
                      <img
                        src="/avatar-default.png"
                        className="clientLogo"
                        alt="logo"
                      />
                    ) : (
                      <img
                        src={client.logo}
                        className="clientLogo"
                        alt="logo"
                      />
                    )}
                    <div>
                      <h2>{client.name}</h2>
                      <p>{client.plan}</p>
                    </div>
                  </ClientHead>
                  <p>Gestor: {client.gestor}</p>
                  <p>CS: {client.cs}</p>
                  <p>Valor Contrato: R$ {client.value}</p>
                </ClientContent>
              </AClient>
            </Link>
          ))}
      </ClientBody>
    </ClientsStyled>
  );
}
