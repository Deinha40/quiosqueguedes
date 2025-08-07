// Dados dos produtos — para facilitar preço e nome
const produtos = {
  "X-Burguer": 10.00,
  "X-Frango com Bacon": 12.00,
  "X-Tudo": 18.00,
  "X-Frango": 12.00,
  "Cachorro-Quente Simples": 6.00,
  "Cachorro-Quente Completo": 10.00,
  "Suco de Laranja": 6.00,
  "Suco de Maracujá": 6.00,
  "Skol Lata": 5.00,
  "Original Long Neck": 7.00,
  "Caldo de Kenga": 10.00,
  "Sopas": 10.00
};

// Carrinho armazenado em objeto: produto -> quantidade
let carrinho = {};

// Atualiza o HTML do carrinho
function atualizarCarrinho() {
  const lista = document.getElementById("carrinho");
  lista.innerHTML = "";

  let total = 0;

  for (const produto in carrinho) {
    const quantidade = carrinho[produto];
    const preco = produtos[produto];
    const subtotal = preco * quantidade;
    total += subtotal;

    const li = document.createElement("li");
    li.textContent = `${produto} x${quantidade} — R$ ${subtotal.toFixed(2)}`;

    // Botão para remover 1 unidade
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "❌";
    btnRemover.title = "Remover 1 unidade";
    btnRemover.onclick = () => {
      if (carrinho[produto] > 1) {
        carrinho[produto]--;
      } else {
        delete carrinho[produto];
      }
      atualizarCarrinho();
    };

    li.appendChild(btnRemover);
    lista.appendChild(li);
  }

  document.getElementById("resumo-total").textContent = `Total: R$ ${total.toFixed(2)}`;

  // Ativa ou desativa botão finalizar pedido
  document.getElementById("finalizar-pedido").disabled = total === 0;
}

// Adiciona produto no carrinho
function adicionarProduto(produto) {
  if (carrinho[produto]) {
    carrinho[produto]++;
  } else {
    carrinho[produto] = 1;
  }
  atualizarCarrinho();
}

// Envia pedido completo para WhatsApp
function finalizarPedidoWhatsApp() {
  if (Object.keys(carrinho).length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "Olá! Gostaria de fazer o pedido:\n\n";

  let total = 0;

  for (const produto in carrinho) {
    const qtd = carrinho[produto];
    const preco = produtos[produto];
    const subtotal = preco * qtd;
    total += subtotal;
    mensagem += `- ${produto} x${qtd} = R$ ${subtotal.toFixed(2)}\n`;
  }

  mensagem += `\nTotal: R$ ${total.toFixed(2)}\n\nObrigado!`;

  const telefone = "5583999481825";
  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}

// Quando o DOM carregar
document.addEventListener("DOMContentLoaded", () => {
  // Botões "Pedir no WhatsApp" agora adicionam ao carrinho
  document.querySelectorAll(".btn-whatsapp").forEach(botao => {
    botao.addEventListener("click", () => {
      const produto = botao.getAttribute("data-produto");
      adicionarProduto(produto);
      alert(`${produto} adicionado ao carrinho!`);
    });
  });

  // Botão finalizar pedido
  document.getElementById("finalizar-pedido").addEventListener("click", finalizarPedidoWhatsApp);

  atualizarCarrinho();
});
