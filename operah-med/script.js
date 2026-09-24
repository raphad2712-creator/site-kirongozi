const form = document.querySelector("#contact-form");
const celular = document.querySelector("#celular");
const botao = form.querySelector("button");
const statusFormulario = document.querySelector("#form-status");

celular.addEventListener("input", () => {
  let numero = celular.value.replace(/\D/g, "").slice(0, 11);

  if (numero.length > 6) {
    numero = numero.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
  } else if (numero.length > 2) {
    numero = numero.replace(/^(\d{2})(\d+)/, "($1) $2");
  } else if (numero.length) {
    numero = numero.replace(/^(\d{0,2})/, "($1");
  }

  celular.value = numero;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  botao.disabled = true;
  botao.textContent = "Enviando...";
  statusFormulario.textContent = "";
  statusFormulario.className = "form-status";

  const dados = Object.fromEntries(new FormData(form).entries());

  try {
    const resposta = await fetch("https://formsubmit.co/ajax/nicolas@lunico.com.br", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(dados)
    });

    if (!resposta.ok) throw new Error("Falha no envio");
    form.reset();
    statusFormulario.textContent = "Enviado com sucesso!";
    statusFormulario.className = "form-status visible";
  } catch {
    statusFormulario.textContent = "Não foi possível enviar. Tente novamente.";
    statusFormulario.className = "form-status visible error";
  } finally {
    botao.disabled = false;
    botao.textContent = "Enviar";
  }
});
