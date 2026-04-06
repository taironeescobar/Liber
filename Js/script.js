function toggleTheme() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
}

const paginas = document.getElementById("paginas");

paginas.addEventListener("input", () => {
  let resultado = paginas.value.replace(/\D/g, "");
  paginas.value = resultado
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
  telefone.value = resultado
});