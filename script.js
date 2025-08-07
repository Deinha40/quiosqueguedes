function enviarPedidoWhatsApp(produto) {
  const telefone = "5583999481825"; // Seu número com DDI + DDD + número
  const mensagem = `Olá! Gostaria de fazer um pedido: ${produto}`;
  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}

// Adiciona evento aos botões "Pedir no WhatsApp"
document.addEventListener("DOMContentLoaded", () => {
  const botoes = document.querySelectorAll(".btn-whatsapp");
  botoes.forEach(botao => {
    botao.addEventListener("click", () => {
      const produto = botao.getAttribute("data-produto");
      enviarPedidoWhatsApp(produto);
    });
  });
});

