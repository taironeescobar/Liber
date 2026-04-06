(function () {
  //Key que faz a conexão com a conta do emailJs meio que é o que faz a ponte
  emailjs.init("RkiySoyXMQNKIYi4P");
})();

document.querySelector(".form-container").addEventListener("submit", function (event) {
  event.preventDefault();

  const serviceID = "service_vd4mgfv"; // Key do tipo de serviço aqui voce escolhe qual email que vai ser enviado outlook gmail...
  const templateID = "template_k7et9ig"; // Key do modelo do email, cria um esqueleto do email para ser realizado o email

  // Captura múltiplos valores de checkbox e os transforma em uma lista de texto
  const extras = [];
  document.querySelectorAll('input[name="extras"]:checked').forEach((checkbox) => {
    extras.push(checkbox.parentNode.textContent.trim());
  });

  // Captura o valor do rádio selecionado ou define um padrão caso nenhum esteja marcado
  const formatoSelecionado = document.querySelector('input[name="formato"]:checked')?.value || "Não selecionado";
  //CAPTURA O RESTANTE DOS CAMPOS DO FORMULARIO
  const params = {
    name: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
    paginas: document.getElementById("paginas").value,
    imagens: document.getElementById("imagens").value,
    tabelas: document.getElementById("tabelas").value,
    tipo_conteudo: document.getElementById("tipo").value,
    capa: document.getElementById("capa").value,
    formato: formatoSelecionado,
    servicos_extras: extras.join(", "),
    title: "Novo Orçamento - Liber",
  };

  emailjs
    .send(serviceID, templateID, params) // AQUI E ENVIADO O EMAIL PASSANDO OS PARAMETROS DE SERVIÇP TEMPLATE E PARAMS
    .then((res) => {
      alert("Solicitação de orçamento enviada com sucesso!"); //Quando enviado o formulario aqui realizamos uma tentativa de envio caso de certo ele envia um alert
      event.target.reset();
    })
    .catch((err) => {
      console.error("Erro EmailJS:", err); // caso der errado ele envia o erro via console e emite um alert
      alert("Erro ao enviar. Verifique o console (F12).");
    });
});

function toggleTheme() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
}

const paginas = document.getElementById("paginas");

paginas.addEventListener("input", () => {
  let resultado = paginas.value.replace(/\D/g, "");
  paginas.value = resultado;
});

const telefone = document.getElementById("telefone");

telefone.addEventListener("input", () => {
  let resultado = telefone.value.replace(/\D/g, "");
  if (resultado.length > 10) {
    resultado = "(" + resultado.slice(0, 2) + ") " + resultado.slice(2, 7) + "-" + resultado.slice(7, 11);
  } else if (resultado.length > 6) {
    resultado = "(" + resultado.slice(0, 2) + ") " + resultado.slice(2, 6) + "-" + resultado.slice(6);
  } else if (resultado.length > 2) {
    resultado = "(" + resultado.slice(0, 2) + ") " + resultado.slice(2);
  }
  telefone.value = resultado;
});
