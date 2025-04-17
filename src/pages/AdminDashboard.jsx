import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FilePlus2, Clock, ClipboardList } from "lucide-react";
import { Modal, Button, Form } from "react-bootstrap";

const AdminDashboard = () => {
  const [clinicas, setClinicas] = useState([]); // Lista de clínicas
  const [showModal, setShowModal] = useState(false); // Controle do modal
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    tipo: "Clinica",
    senha: "clinica123",
    primeiroAcesso: true,
  });
  const [editClinica, setEditClinica] = useState(null); // Clínica em edição
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClinicas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/clinicas");
        setClinicas(response.data); // Carrega as clínicas
      } catch (error) {
        console.error("Erro ao carregar clínicas:", error);
      }
    };

    fetchClinicas();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClinica = async () => {
    try {
      await axios.post("http://localhost:3000/clinicas", formData);
      setClinicas([...clinicas, formData]); // Atualiza a lista local
      setShowModal(false); // Fecha o modal
    } catch (error) {
      console.error("Erro ao salvar clínica:", error);
    }
  };

  const handleEditClinica = (clinica) => {
    setEditClinica({ ...clinica, senha: "clinica123", primeiroAcesso: true }); // Redefine a senha
    setShowModal(true);
  };

  const handleSaveEditClinica = async () => {
    try {
      await axios.put(`http://localhost:3000/clinicas/${editClinica.id}`, editClinica);
      setClinicas(
        clinicas.map((clinica) =>
          clinica.id === editClinica.id ? editClinica : clinica
        )
      ); // Atualiza a lista local
      setShowModal(false); // Fecha o modal
      setEditClinica(null); // Limpa o estado de edição
    } catch (error) {
      console.error("Erro ao editar clínica:", error);
    }
  };

  return (
    <div className="container mt-5 bg-light p-4 rounded shadow">
      <h2 className="mb-4">Painel Administrativo</h2>
      <div className="row">
        {/* Botão para emitir receitas */}
        <div className="col-md-4 mb-4">
          <div
            className="card text-center shadow-sm card-hover"
            style={{ cursor: "pointer" }}
            onClick={() => {
              console.log("Redirecionando para /receita-exames...");
              navigate("/receita-exames");
            }}
          >
            <div className="card-body">
              <FilePlus2 className="icon" size={48} />
              <h5 className="card-title">Emitir Receitas</h5>
              <p className="card-text">
                Clique aqui para emitir receitas para os pacientes.
              </p>
            </div>
          </div>
        </div>

        {/* Botão para histórico de receitas */}
        <div className="col-md-4 mb-4">
          <div
            className="card text-center shadow-sm card-hover"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/historico")}
          >
            <div className="card-body">
              <Clock className="icon" size={48} />
              <h5 className="card-title">Histórico de Receitas</h5>
              <p className="card-text">
                Clique aqui para visualizar todas as receitas emitidas.
              </p>
            </div>
          </div>
        </div>

        {/* Botão para relatórios administrativos */}
        <div className="col-md-4 mb-4">
          <div
            className="card text-center shadow-sm card-hover"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin-panel")}
          >
            <div className="card-body">
              <ClipboardList className="icon" size={48} />
              <h5 className="card-title">Emitir Relatórios</h5>
              <p className="card-text">
                Clique aqui para gerar relatórios administrativos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de clínicas cadastradas */}
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h3>Clínicas Cadastradas</h3>
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          Cadastrar Clínica
        </button>
      </div>
      <ul className="list-group">
        {clinicas.map((clinica) => (
          <li key={clinica.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              {clinica.nome} - {clinica.email}{" "}
              {clinica.primeiroAcesso && (
                <span className="badge bg-warning text-dark">Primeiro Acesso</span>
              )}
            </span>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => handleEditClinica(clinica)}
            >
              Editar
            </button>
          </li>
        ))}
      </ul>

      {/* Modal para cadastro ou edição de clínica */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editClinica ? "Editar Clínica" : "Cadastrar Clínica"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome da Clínica</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={editClinica ? editClinica.nome : formData.nome}
                onChange={(e) =>
                  editClinica
                    ? setEditClinica({ ...editClinica, nome: e.target.value })
                    : handleInputChange(e)
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editClinica ? editClinica.email : formData.email}
                onChange={(e) =>
                  editClinica
                    ? setEditClinica({ ...editClinica, email: e.target.value })
                    : handleInputChange(e)
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo</Form.Label>
              <Form.Select
                name="tipo"
                value={editClinica ? editClinica.tipo : formData.tipo}
                onChange={(e) =>
                  editClinica
                    ? setEditClinica({ ...editClinica, tipo: e.target.value })
                    : handleInputChange(e)
                }
              >
                <option value="Admin">Admin</option>
                <option value="Clinica">Clinica</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha Padrão</Form.Label>
              <Form.Control type="text" value="clinica123" disabled />
              <Form.Text className="text-muted">
                A senha será redefinida para "clinica123" e será obrigatório alterá-la no primeiro acesso.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={editClinica ? handleSaveEditClinica : handleSaveClinica}
          >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
